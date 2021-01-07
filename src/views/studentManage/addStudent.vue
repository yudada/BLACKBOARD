<template>
  <div class="editprofile_main">
    <Breadcrumb :navData="navData" />

    <div class="editprofile_concent">
      <el-row :gutter="20" class="mobile_card">
        <el-col :span="5" class="iapd_w">
          <!-- 快速创建区域 -->
          <el-card class="box-card" :body-style="{ padding: 0 }">
            <div slot="header" class="clearfix">
              <span>账号信息</span>
            </div>
            <div class="introduction_form">
              <el-form
                :model="ruleIntroductionForm"
                :rules="introductionRules"
                ref="ruleIntroductionFormRef"
                label-position="top"
                class="demo-ruleForm"
              >
                <el-form-item label="学校">
                  <el-input
                    clearable
                    v-model="ruleIntroductionForm.schoolName"
                    disabled
                  />
                </el-form-item>
                <el-form-item label="班级">
                  <el-input
                    clearable
                    v-model="ruleIntroductionForm.className"
                    disabled
                  />
                </el-form-item>
                <el-form-item label="姓名" prop="stuName">
                  <el-input clearable v-model="ruleIntroductionForm.stuName" />
                </el-form-item>
                <el-form-item label="学号" prop="stuNum">
                  <el-input clearable v-model="ruleIntroductionForm.stuNum" />
                </el-form-item>
                <el-form-item label="性别">
                  <el-select
                    v-model="ruleIntroductionForm.sex"
                    placeholder="请选择性别"
                  >
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                  </el-select>
                </el-form-item>
                <el-form-item class="form_btn fast">
                  <el-button class="cn_btn" @click="submitIntroductionForm()">
                    快速添加
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>

        <el-col :span="19">
          <el-card>
            <div slot="header" class="clearfix">
              <span>基础信息</span>
              <div class="header-up">
                <el-button type="text">
                  <a :href="upURL + 'api/test/export'" style="color: #ad5df3">
                    模板下载
                  </a>
                </el-button>
                <el-button type="text" @click="openDialog">学生导入</el-button>
              </div>
            </div>
            <Add-student-form />
          </el-card>
        </el-col>
      </el-row>
      <Up-student-info ref="son" />
    </div>
  </div>
</template>

<script>
import {
  newStudent,
  studentClass,
  addStudentFast,
  studentImport,
  studentExport,
} from '@/api/studentManage.js'
import AddStudentForm from './components/addStudentForm.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import UpStudentInfo from './components/upStudentInfo.vue'
export default {
  components: { AddStudentForm, Breadcrumb, UpStudentInfo },
  data() {
    return {
      navData: {
        title: '学生管理',
        childTitle: '添加新同学',
      },
      // 快速创建信息
      ruleIntroductionForm: {
        schoolName: '',
        className: '',
        stuName: '',
        stuNum: '',
        sex: '男',
      },
      // 快速创建验证规则
      introductionRules: {
        stuName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur',
          },
        ],
        stuNum: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    this.getClassInfo()
  },
  computed: {
    upURL: function () {
      const isDev = process.env.NODE_ENV === 'development'
      return isDev ? 'http://192.168.8.123/' : 'https://api.vrbook.vip/'
    },
  },
  methods: {
    // 获取班级信息
    async getClassInfo() {
      studentClass().then((res) => {
        const { className, schoolName } = res.data
        this.ruleIntroductionForm.className = className
        this.ruleIntroductionForm.schoolName = schoolName
      })
    },
    // 快速创建
    submitIntroductionForm() {
      this.$refs.ruleIntroductionFormRef.validate(async (valid) => {
        if (!valid) return
        addStudentFast(this.ruleIntroductionForm).then((res) => {
          this.$message.success(res.msg)
          this.resetIntroductionForm()
        })
      })
    },
    // 重置快速创建
    resetIntroductionForm() {
      this.$refs.ruleIntroductionFormRef.resetFields()
    },
    openDialog() {
      this.$refs.son.dialogVisible = true
    }
  },
}
</script>

<style lang="scss" scoped>
.introduction_form {
  padding: 1rem;
}
.form_btn {
  width: 100%;
  display: flex;
}
.header-up {
  float: right;
  display: flex;
}
.clearfix{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
@media (max-width: 1280px) {
  .iapd_w {
    width: 100% !important;
    margin-bottom: 1rem;
  }
  .mobile_card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
@media (max-width: 768px) {
  .iapd_w {
    width: 100% !important;
    margin-bottom: 1rem;
  }
  .mobile_card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 375px) {
  .iapd_w {
    width: 100% !important;
  }
}
</style>

<style lang="scss">
.fast {
  width: 100%;
  .el-form-item__content {
    width: 100%;
    .el-button {
      width: 100%;
    }
  }
}
</style>