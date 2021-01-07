<template>
  <div class="detail_form">
    <!-- 添加账号区域 -->
    <el-form
      :model="ruleDetailForm"
      :rules="detailFormRules"
      ref="ruleDetailFormRef"
      class="detail_ruleForm"
    >
      <el-form-item>
        <!-- 头像上传区域 -->
        <div class="ava_up">
          <el-upload
            ref="upload"
            :class="{ uoloadSty: showBtnImg, disUoloadSty: noneBtnImg }"
            :action="uploadURL"
            list-type="picture-card"
            :headers="headerObj"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-change="handleChange"
            :limit="1"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="登录账号" prop="userName" class="form_half">
        <el-input
          clearable
          v-model="ruleDetailForm.userName"
          placeholder="优先填写手机号码，请不要输入中文和空格"
        />
      </el-form-item>
      <el-form-item
        label="登录密码(默认123456)"
        prop="userPassword"
        class="form_half"
      >
        <el-input
          clearable
          type="password"
          v-model="ruleDetailForm.userPassword"
          placeholder="长度在 6 到 15 个字符"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="stuName" class="form_half">
        <el-input
          clearable
          v-model="ruleDetailForm.stuName"
          placeholder="长度在 2 到 10 个字符"
        />
      </el-form-item>
      <el-form-item label="学号" class="form_half">
        <el-input
          clearable
          v-model="ruleDetailForm.stuNum"
          placeholder="请输入30位以内的数字、字母组合"
        />
      </el-form-item>
      <el-form-item label="地址">
        <el-input clearable type="textarea" v-model="ruleDetailForm.address" />
      </el-form-item>
      <el-form-item class="form_half">
        <h3>个人信息</h3>
      </el-form-item>
      <el-form-item class="form_half" />
      <el-form-item label="国家" class="form_half">
        <el-input clearable v-model="ruleDetailForm.country" />
      </el-form-item>
      <el-form-item label="兴趣爱好" class="form_half">
        <el-input clearable v-model="ruleDetailForm.hobby" />
      </el-form-item>
      <el-form-item label="生日" class="form_half birthdaySelect">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="ruleDetailForm.birthday"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="QQ" class="form_half">
        <el-input clearable v-model="ruleDetailForm.qq" />
      </el-form-item>
      <el-form-item label="电话号码" class="form_half">
        <el-input clearable v-model="ruleDetailForm.userMobile" />
      </el-form-item>
      <div class="form_btn">
        <el-button @click="resetDetailForm()">重置信息</el-button>
        <el-button class="cn_btn" @click="submitDetailForm()">创建</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { newStudent } from '@/api/studentManage'
export default {
  data() {
    var checkUserName = (rule, value, callback) => {
      if (value) {
        if (/[^\w\.\/]/gi.test(value)) {
          callback(new Error('请不要输入中文和空格！'))
        } else {
          callback()
        }
      }
      callback()
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
      headerObj: {
        ContentType: 'multipart/form-data',
        Authorization: window.sessionStorage.getItem('token'),
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
        hobby: '',
        qq: '',
        photo: '',
      },
      // 详细信息验证规则
      detailFormRules: {
        userName: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { validator: checkUserName, trigger: 'blur' },
        ],
        userPassword: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
        stuName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur',
          },
        ],
      },
      showBtnImg: true,
      noneBtnImg: false,
    }
  },
  computed: {
    uploadURL: function () {
      const isDev = process.env.NODE_ENV === 'development'
      return isDev
        ? 'api/api/common/uploadImg'
        : 'https://api.vrbook.vip/api/common/uploadImg'
    },
  },
  methods: {
    // 信息保存
    async submitDetailForm() {
      this.$refs.ruleDetailFormRef.validate(async (valid) => {
        if (!valid) return console.log(this.ruleDetailForm, 1)
        const questionInfo = this.ruleDetailForm
        for (var key in questionInfo) {
          if (questionInfo[key] === '') {
            delete questionInfo[key]
          }
        }
        console.log(questionInfo)
        await newStudent(questionInfo).then((res) => {
          console.log(res)
          if(res.statusCode !== 200) return this.$message.error(res.msg);
          this.$message.success(res.msg);
          this.resetDetailForm();
        })
      })
    },
    // 重置信息表单
    resetDetailForm() {
      this.$refs.ruleDetailFormRef.resetFields()
    },
    // 处理移除图片的操作
    handleRemove(file) {
      this.noneBtnImg = false
      this.showBtnImg = true
    },
    // 监听图片上传成功的事件
    handleSuccess(response) {
      this.ruleDetailForm.photo = response.data.path
    },
    handleChange(file) {
      this.noneBtnImg = true
      this.showBtnImg = false
    },
  },
}
</script>

<style lang="scss" scoped>
.form_btn {
  width: 100%;
  display: flex;
}
.detail_ruleForm {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .form_half {
    width: 48% !important;
  }
  .el-form-item {
    width: 100%;
  }
  .form_btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

<style lang="scss">
.birthdaySelect {
  display: flex;
  flex-direction: column;
  .el-form-item__label {
    display: flex;
  }
  .el-form-item__content {
    .el-date-editor {
      width: 100%;
    }
  }
}
.detail_form {
  .uoloadSty {
    .el-upload--picture-card {
      width: 148px;
      height: 148px;
      line-height: 146px;
    }
  }
  .disUoloadSty {
    .el-upload--picture-card {
      display: none;
    }
  }
}
</style>