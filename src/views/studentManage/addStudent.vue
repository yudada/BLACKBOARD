<template>
  <div class="editprofile_main">
    <div class="main_header">
      <h4>学生资料</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">学生管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>添加新同学</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="editprofile_concent">
      <el-row :gutter="20" class="mobile_card">
        <el-col :span="5" class="iapd_w">
          <!-- 快速创建区域 -->
          <el-card class="box-card" :body-style="{ padding: 0 }">
            <div slot="header" class="clearfix">
              <span>账号信息</span>
            </div>
            <div class="introduction_form">
              <el-form :model="ruleIntroductionForm" :rules="introductionRules" ref="ruleIntroductionFormRef" label-position="top" class="demo-ruleForm">
                <el-form-item label="学校">
                  <el-input clearable :placeholder="classInfo.schoolName" disabled></el-input>
                </el-form-item>
                <el-form-item label="班级">
                  <el-input clearable :placeholder="classInfo.className" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="stuName">
                  <el-input clearable v-model="ruleIntroductionForm.stuName"></el-input>
                </el-form-item>
                <el-form-item label="学号" prop="stuNum">
                  <el-input clearable v-model="ruleIntroductionForm.stuNum"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-select v-model="ruleIntroductionForm.sex" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="form_btn fast">
                  <el-button class="cn_btn"  @click="submitIntroductionForm()">快速添加</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>

        <el-col :span="19">
          <el-card>
            <div slot="header" class="clearfix">
              <span>基础信息</span>
            </div>
            <div class="detail_form">
              <!-- 添加账号区域 -->
              <el-form :model="ruleDetailForm" :rules="detailFormRules" ref="ruleDetailFormRef" class="detail_ruleForm">
                <el-form-item>
                  <!-- 头像上传区域 -->
                  <div class="ava_up">
                    <el-upload
                      ref="upload"
                      :class="{uoloadSty:showBtnImg,disUoloadSty:noneBtnImg}"
                      :action="uploadURL"
                      list-type="picture-card"
                      :headers="headerObj"
                      :on-remove="handleRemove"
                      :on-success="handleSuccess"
                      :on-change="handleChange"
                      :limit="1"
                      :auto-upload="false">
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                </el-form-item>
                <el-form-item label="登录账号" prop="userName" class="form_half">
                  <el-input clearable v-model="ruleDetailForm.userName" placeholder="例：test256 请不要输入中文和空格"></el-input>
                </el-form-item>
                <el-form-item label="登录密码(默认123456)" prop="userPassword" class="form_half">
                  <el-input clearable type="password" v-model="ruleDetailForm.userPassword" placeholder="长度在 6 到 15 个字符"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="stuName" class="form_half">
                  <el-input clearable v-model="ruleDetailForm.stuName" placeholder="长度在 2 到 10 个字符"></el-input>
                </el-form-item>
                <el-form-item label="学号" prop="stuNum" class="form_half">
                  <el-input clearable v-model="ruleDetailForm.stuNum" placeholder="请输入30位以内的数字、字母组合"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                  <el-input clearable type="textarea" v-model="ruleDetailForm.address"></el-input>
                </el-form-item>
                <el-form-item class="form_half">
                  <h3>个人信息</h3>
                </el-form-item>
                <el-form-item class="form_half">
                  <h3>修改密码</h3>
                </el-form-item>
                <el-form-item label="国家" class="form_half">
                  <el-input clearable v-model="ruleDetailForm.country"></el-input>
                </el-form-item>
                <el-form-item label="验证密码" class="form_half">
                  <el-input clearable type="password" v-model="ruleDetailForm.nowpassword"></el-input>
                </el-form-item>
                <el-form-item label="生日" class="form_half birthdaySelect">
                  <el-date-picker value-format="yyyy-MM-dd"  v-model="ruleDetailForm.birthday" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="新密码" class="form_half">
                  <el-input clearable type="password" v-model="ruleDetailForm.newpassword"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" class="form_half">
                  <el-input clearable v-model="ruleDetailForm.userMobile"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" class="form_half">
                  <el-input clearable type="password" v-model="ruleDetailForm.cnnewpassword"></el-input>
                </el-form-item>
                <div class="form_btn">
                  <el-button @click="resetDetailForm()">重置信息</el-button>
                  <el-button class="cn_btn" @click="submitDetailForm()">创建</el-button>
                </div>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { newStudent } from '@/api/studentManage.js' 
export default {
  data() {
    var checkUserName = (rule, value, callback) =>{

      if (value) {
        if (/[^\w\.\/]/ig.test(value)) {
          callback(new Error('请不要输入中文和空格！'));
        } else {
          callback();
        }
      }
    callback();
    }
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    
    return {
      // 快速创建信息
      ruleIntroductionForm: {
        schoolName: '',
        className: '',
        stuName: '',
        stuNum: '',
        sex: '男'
      },
      // 班级信息
      classInfo: {},
      // 快速创建验证规则
      introductionRules: {
        stuName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        stuNum: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      uploadURL: 'api/api/common/uploadImg',
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      // 详细信息
      ruleDetailForm: {
        userName: '',
        userPassword: '123456',
        stuName: '',
        stuNum: '',
        address: '',
        country: '中国',
        userMobile: '',
        birthday: '',        
        nowpassword: '',
        newpassword: '',
        cnnewpassword: '',
        photo: ''
        },
        // 详细信息验证规则
        detailFormRules: {
          userName: [
            { required: true, message: '请输入登录账号', trigger: 'blur' },
            { validator: checkUserName, trigger: 'blur' }
          ],
          userPassword: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          stuName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          stuNum: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { validator: checkUserName, trigger: 'blur' },
            { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
          ]
        },
        showBtnImg: true,
        noneBtnImg: false
    };
  },
  created() {
    this.getClassInfo();
  },
  methods: {
    // 获取班级信息
    async getClassInfo() {
      const { data: res } = await this.$http.post(`api/student/create`)
      if (res.statusCode !== 200) return this.$message.error('获取班级信息失败！')
      this.classInfo = res.data
    },
    // 快速创建
    submitIntroductionForm() {
      this.$refs.ruleIntroductionFormRef.validate(async valid => {
        if (!valid) return
        this.ruleIntroductionForm.schoolName = this.classInfo.schoolName;
        this.ruleIntroductionForm.className = this.classInfo.className;

        const { data: res } = await this.$http.post(`api/student/store`, this.ruleIntroductionForm)
        if(res.statusCode !==200 ) {
          return this.$message.error(res.msg)
        }
        this.$message.success(res.msg)

        this.resetIntroductionForm();
      });
    },
    // 重置快速创建
    resetIntroductionForm() {
      this.$refs.ruleIntroductionFormRef.resetFields();
    },
    // 信息保存
    async submitDetailForm() {
      this.$refs.upload.submit();
      this.ruleDetailForm.userMobile = parseInt(this.ruleDetailForm.userMobile)
      this.$refs.ruleDetailFormRef.validate(async valid => {
        if (!valid) return console.log(this.ruleDetailForm,1);
        const questionInfo = this.ruleDetailForm;
        for ( var key in questionInfo ){
          if ( questionInfo[key] === '' ){
            delete questionInfo[key]
          }
        }
        console.log(questionInfo);
        await newStudent(questionInfo).then(res => {
          const {data} = res;
          console.log(data);
          if(data.statusCode !== 200) return this.$message.error(data.msg);
          this.$message.success(data.msg);
        })
        this.resetDetailForm();
      });
    },
    // 重置信息表单
    resetDetailForm() {
      this.$refs.ruleDetailFormRef.resetFields();
    },
    // 处理移除图片的操作
    handleRemove(file) {
      this.noneBtnImg = false;
      this.showBtnImg = true;
    },
    // 监听图片上传成功的事件
    handleSuccess(response) {
      this.ruleDetailForm.photo = response.data.path;
    },
    handleChange(file) {
      this.noneBtnImg = true
      this.showBtnImg = false
    }
  },
};
</script>

<style lang="scss" scoped>
.introduction_form {
  padding: 1rem;
}
.form_btn{
  width: 100%;
  display: flex;
}
.detail_ruleForm{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .form_half{
    width: 48% !important;
  }
  .el-form-item {
    width: 100%;
  }
  .form_btn{
    display: flex;
    justify-content: flex-end;
  }
}
@media (max-width: 1280px) {
  .iapd_w{
    width: 100% !important;
    margin-bottom: 1rem;
  }
  .mobile_card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
@media (max-width: 768px) {
  .iapd_w{
    width: 100% !important;
    margin-bottom: 1rem;
  }
  .mobile_card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 375px) {
  .iapd_w{
  width: 100% !important;
  }
}
</style>

<style lang="scss">
  .fast {
  width: 100%;
  .el-form-item__content{
    width: 100%;
    .el-button {
      width: 100%;
    }
  }
}
.birthdaySelect{
  display: flex;
  flex-direction: column;
  .el-form-item__label{
    display: flex;
  }
  .el-form-item__content{
    .el-date-editor {
      width: 100%;
    }
  }
}
.detail_form {
  .uoloadSty {
    .el-upload--picture-card{
    width: 148px;
    height: 148px;
    line-height: 146px
    }
  }
  .disUoloadSty {
    .el-upload--picture-card{
  	display:none;
    }
  }
}
</style>