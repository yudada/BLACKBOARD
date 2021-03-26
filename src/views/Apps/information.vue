<template>
  <div class="information_main">
    <Breadcrumb :navData="navData" />

    <div class="information_concent">
      <el-row>
        <el-col :span="24">
          <el-card class="box-card" v-if="schoolRuleForm">
            <div slot="header" class="clearfix">
              <span>编辑资料</span>
            </div>
            <el-form
              :model="schoolRuleForm"
              :rules="schoolRuleFormRules"
              ref="schoolRuleFormRef"
            >
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
              >
                <img
                  v-if="this.schoolRuleForm.schoolLogo"
                  :src="this.schoolRuleForm.schoolLogo"
                  class="avatar"
                />
                <el-button v-else size="small" type="text">点击上传</el-button>
              </el-upload>
              <el-form-item label="学校名称" prop="schoolName">
                <el-input v-model="schoolRuleForm.schoolName"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="schoolAddress">
                <el-input v-model="schoolRuleForm.schoolAddress"></el-input>
              </el-form-item>
              <el-form-item label="学校介绍"></el-form-item>
              <!-- 富文本编辑器组件 -->
              <quill-editor :options="editorOption" v-model="schoolRuleForm.schoolIntroduce" />
              <div class="submit_btn">
                <el-button @click="submitForm">保存学校信息</el-button>
              </div>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@/assets/css/editor.scss'
import { quillEditor } from 'vue-quill-editor'
import { schoolDetail, editSchoolDetail } from '@/api/apps'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { Breadcrumb, quillEditor },
  data() {
    return {
      navData: {
        title: '系统设置',
        childTitle: '学校资料'
      },
      editorOption: {
        placeholder: '在此输入...'
      },
      // 学校信息
      schoolRuleForm: {
        schoolName: '',
        schoolAddress: '',
        schoolIntroduce: '',
        schoolLogo: '',
      },
      headerObj: {
        ContentType: 'multipart/form-data',
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
    uploadURL: function () {
      const isDev = process.env.NODE_ENV === 'development'
      return isDev
        ? 'api/api/common/uploadImg'
        : 'https://api.vrbook.vip/api/common/uploadImg'
    },
  },
  methods: {
    // 获取学校信息
    async getSchoolDetail() {
      schoolDetail().then((res) => {
        const {
          schoolAddress,
          schoolName,
          schoolIntroduce,
          schoolLogo,
        } = res.data
        this.schoolRuleForm.schoolName = schoolName
        this.schoolRuleForm.schoolAddress = schoolAddress
        this.schoolRuleForm.schoolIntroduce = schoolIntroduce
        this.schoolRuleForm.schoolLogo = schoolLogo
      })
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
      if (response.statusCode !== 200) return this.$message.error(response.msg)
      this.schoolRuleForm.schoolLogo = response.data.path
    },
    // 提交学校信息
    submitForm() {
      this.$refs.schoolRuleFormRef.validate(async (valid) => {
        if (!valid) return
        editSchoolDetail(this.schoolRuleForm).then((res) => {
          this.$message.success(res.msg)
          this.getSchoolDetail()
        })
      })
    },
  },
}
</script>

<style lang="scss">
.information_main {
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
    .avatar {
      width: 100%;
    }
  }
}
</style>
