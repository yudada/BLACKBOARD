<template>
  <div class="addTeacher_main">
    <Breadcrumb :navData="navData" />

    <div class="addTeacher_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <el-form ref="teacherFormRef" :model="teacherForm" :rules="teacherFormRules" label-position="top">
              <el-form-item label="学校">
                <el-input style="width: 50%" disabled v-model="teacherForm.schoolName"></el-input>
              </el-form-item>
                <el-form-item label="班级" prop="class_id">
                <el-select clearable v-model="teacherForm.class_id" placeholder="请选择班级">
                  <el-option
                    v-for="item in classList"
                    :key="item.class_id"
                    :label="item.className"
                    :value="item.class_id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职称" prop="teaPositionId">
                <el-select clearable v-model="teacherForm.teaPositionId" placeholder="请选择老师职称">
                  <el-option
                    v-for="item in teaPositionList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="角色权限" prop="role_id">
                <el-select clearable v-model="teacherForm.role_id" placeholder="请选择角色">
                  <el-option
                    v-for="item in roleList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="科目" prop="teaSubject">
                <el-select clearable v-model="teacherForm.teaSubject" placeholder="请选择老师职称">
                  <el-option
                    v-for="item in subjectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名" prop="teaName">
                <el-input style="width: 50%" clearable placeholder="请输入姓名" v-model="teacherForm.teaName"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="userMobile">
                <el-input style="width: 50%" clearable placeholder="例：13866668888" v-model="teacherForm.userMobile"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input style="width: 50%" placeholder="例：airoom@app.com" clearable v-model="teacherForm.email"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                  <el-select v-model="teacherForm.sex" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
              <el-form-item class="footer_form">
                <div class="footer_btn">
                  <el-button @click="onSubmit" class="cn_btn">{{btnText}}</el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { teacherBasics, teacherInfo, editTeacher, addTeacher } from '@/api/Apps/account.js'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
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
      navData: {
        childTitle: '添加老师',
        goTo: '返回列表'
      },
      teacherForm: {
        schoolName: '',
        sex: '',
        class_id: '',
        teaPositionId: '',
        teaSubject: '',
        teaName: '',
        userMobile: '',
        email: '',
        role_id: ''
      },
      classList: [],
      teaPositionList:[],
      subjectList: [],
      roleList: [],
      teacherFormRules: {
        class_id: [
          { required: true, message: '请选择班级', trigger: 'blur' }
        ],
        teaPositionId: [
          { required: true, message: '请选择职称', trigger: 'blur' }
        ],
        teaSubject: [
          { required: true, message: '请选择科目', trigger: 'blur' }
        ],
        teaName: [
          { required: true, message: '请输入名字', trigger: 'blur' }
        ],
        userMobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        role_id: [
          { required: true, message: '请输入选择角色', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTeacherInfo();
    if(this.$route.query.id) {
      this.navData.childTitle = '编辑信息'
      this.getTeacherInfoById();
    }
  },
  computed:{
    tId:function () {
      return this.$route.query.id
    },
    btnText: function() {
      return this.$route.query.id ? '保存编辑' : '立即添加'
    }
  },
  methods: {
    // 编辑信息基础
    getTeacherInfoById() {
      teacherInfo(this.tId).then(res => {
        const {data} = res
        const {info} = res.data;
        this.teacherForm.schoolName = data.schoolName;
        this.teacherForm.teaName = info.teaName;
        this.teacherForm.teaPositionId = info.teaPositionId;
        this.teacherForm.teaSubject = info.teaSubject;
        this.teacherForm.class_id = info.class_id;
        this.teacherForm.role_id = info.role_id;
        this.teacherForm.userMobile = parseInt(info.mobile)
      })
    },
    // 教师基础信息
    async getTeacherInfo() {
      teacherBasics().then(res=>{
        const { schoolName, classArr = [], subjectArr = [],positionArr = [], roleArr = [] } = res.data;
        this.teacherForm.schoolName = schoolName;
        this.classList = classArr;
        this.teaPositionList = positionArr;
        this.subjectList = subjectArr;
        this.roleList = roleArr;
      })
    },
    // 添加老师
    onSubmit() {
      this.$refs.teacherFormRef.validate(valid => {
        if(!valid) return this.$message.error('请填写必填项！')
        this.teacherForm.userMobile = this.teacherForm.userMobile.toString()
        console.log(this.teacherForm);
        if(!this.tId) {
          addTeacher(this.teacherForm).then(res => {
            this.$message.success(res.msg)
            this.resetFrom();
          })
        } else {  
          editTeacher(this.tId, this.teacherForm).then(res => {
            this.$message.success(res.msg)
          })
        }
      })
    },
    resetFrom() {
      this.$refs.teacherFormRef.resetFields()
    }
  },
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 50%;
}
</style>

<style lang="scss">
.addTeacher_concent{
  .el-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item {
      width: 45%;
      margin: 20px 0;
    }
  }
}
.footer_form{
  display: flex;
  align-items: flex-end;
  .el-form-item__content {
    width: 100%;
  }
  .footer_btn {
    width: 100%;
    display: flex;
  }
}

</style>
