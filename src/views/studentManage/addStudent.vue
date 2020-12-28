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
                    :placeholder="classInfo.schoolName"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="班级">
                  <el-input
                    clearable
                    :placeholder="classInfo.className"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="stuName">
                  <el-input
                    clearable
                    v-model="ruleIntroductionForm.stuName"
                  ></el-input>
                </el-form-item>
                <el-form-item label="学号" prop="stuNum">
                  <el-input
                    clearable
                    v-model="ruleIntroductionForm.stuNum"
                  ></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-select
                    v-model="ruleIntroductionForm.sex"
                    placeholder="请选择性别"
                  >
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="form_btn fast">
                  <el-button class="cn_btn" @click="submitIntroductionForm()"
                    >快速添加</el-button
                  >
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
            <add-student-form :classInfo="classInfo" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { newStudent } from '@/api/studentManage.js'
import addStudentForm from './components/addStudentForm.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { addStudentForm, Breadcrumb },
  data() {
    return {
      navData: {
        title: '学生管理',
        childTitle: '添加新同学'
      },
      // 快速创建信息
      ruleIntroductionForm: {
        schoolName: '',
        className: '',
        stuName: '',
        stuNum: '',
        sex: '男',
      },
      // 班级信息
      classInfo: {},
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
  methods: {
    // 获取班级信息
    async getClassInfo() {
      const { data: res } = await this.$http.post(`api/student/create`)
      if (res.statusCode !== 200)
        return this.$message.error('获取班级信息失败！')
      this.classInfo = res.data
    },
    // 快速创建
    submitIntroductionForm() {
      this.$refs.ruleIntroductionFormRef.validate(async (valid) => {
        if (!valid) return
        this.ruleIntroductionForm.schoolName = this.classInfo.schoolName
        this.ruleIntroductionForm.className = this.classInfo.className

        const { data: res } = await this.$http.post(
          `api/student/store`,
          this.ruleIntroductionForm
        )
        if (res.statusCode !== 200) {
          return this.$message.error(res.msg)
        }
        this.$message.success(res.msg)

        this.resetIntroductionForm()
      })
    },
    // 重置快速创建
    resetIntroductionForm() {
      this.$refs.ruleIntroductionFormRef.resetFields()
    },
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