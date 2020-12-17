<template>
  <div class="information_main">
    <div class="main_header">
      <h4>学校资料</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">系统设置</a></el-breadcrumb-item>
        <el-breadcrumb-item>学校资料</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="information_concent">
      <el-row>
        <el-col :span="24">
          <el-card class="box-card" v-if="schoolRuleForm">
            <div slot="header" class="clearfix">
              <span>信息内容</span>
            </div>
            <el-form
              :model="schoolRuleForm"
              :rules="schoolRuleFormRules"
              ref="schoolRuleFormRef"
            >
              <el-form-item label="学校名称(School Name)" prop="schoolName">
                <el-input v-model="schoolRuleForm.schoolName"></el-input>
              </el-form-item>
              <el-form-item label="地址(Address)" prop="schoolAddress">
                <el-input v-model="schoolRuleForm.schoolAddress"></el-input>
              </el-form-item>
              <el-form-item label="学校介绍"></el-form-item>
              <!-- 富文本编辑器组件 -->
              <quill-editor v-model="schoolRuleForm.schoolIntroduce" />
              <el-form-item label="学校logo"></el-form-item>
              <!-- logo上传 -->
              <el-upload
                :class="{ uoloadSty: showBtnImg, disUoloadSty: noneBtnImg }"
                ref="upload"
                :action="uploadURL"
                :on-remove="handleRemove"
                list-type="picture-card"
                :headers="headerObj"
                :on-success="handleSuccess"
                :on-change="handleChange"
                :auto-upload="false"
              >
                <img
                  v-if="this.schoolRuleForm.schoolLogo"
                  :src="this.schoolRuleForm.schoolLogo"
                  class="avatar"
                />
                <el-button v-else size="small" type="text">点击上传</el-button>
              </el-upload>
              <div class="submit_btn">
                <el-button @click="submitForm">提交学校信息</el-button>
              </div>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 学校信息
      schoolRuleForm: {},
      headerObj: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      // 学校信息验证规则
      schoolRuleFormRules: {
        name: [{ required: true, message: '请输入学校名称', trigger: 'blur' }],
        address: [
          { required: true, message: '请选择学校地址', trigger: 'change' },
        ],
      },
      showBtnImg: true,
      noneBtnImg: false,
    }
  },
  created() {
    this.getSchoolDetail()
  },
  computed: {
    uploadURL: function() {
      const isDev = process.env.NODE_ENV === 'development';
      return isDev ? 'api/api/common/uploadImg' : 'https://api.vrbook.vip/api/common/uploadImg'
    }
  },
  methods: {
    // 获取学校信息
    async getSchoolDetail() {
      const { data: res } = await this.$http.get(`api/school/detail`)
      if (res.statusCode !== 200) return this.$message.error(res.msg)
      this.schoolRuleForm = res.data
      console.log(this.schoolRuleForm)
    },
    handleChange(file) {
      this.noneBtnImg = true
      this.showBtnImg = false
    },
    handleRemove(file) {
      this.noneBtnImg = false
      this.showBtnImg = true
    },
    handleSuccess(response) {
      console.log(response)
      if (response.statusCode !== 200) return this.$message.error(response.msg)
      this.schoolRuleForm.schoolLogo = response.data.path
    },
    // 提交学校信息
    submitForm() {
      this.$refs.upload.submit()
      this.$refs.schoolRuleFormRef.validate(async (valid) => {
        if (!valid) return
        console.log(this.schoolRuleForm)
        const { data: res } = await this.$http.post(
          `api/school/update`,
          this.schoolRuleForm
        )
        if (res.statusCode !== 200) return this.$message.error(res.msg)
      })
    },
  },
}
</script>

<style lang="scss">
.information_main {
  .ql-editor {
    height: 200px !important;
  }
  .ql-snow .ql-tooltip {
    left: 0% !important;
    top: 0 !important;
  }
  .submit_btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
    .el-button {
      width: 180px;
      color: #fff;
      background: linear-gradient(to bottom right, #9853af, #623aa2);
    }
    .el-button:hover {
      color: #fff;
      opacity: 0.9;
    }
    .el-button:focus {
      color: #fff;
    }
  }
  .box-card {
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
    .avatar{
      width: 100%;
    }
  }
}
</style>
