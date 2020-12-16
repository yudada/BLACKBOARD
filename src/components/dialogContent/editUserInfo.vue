<template>
  <div class="content_edit">
    <div v-if="uesrInfoForm">
      <el-form
        :model="editUserInfo"
        status-icon
        :rules="editUserInfoRules"
        ref="editUserInfoRef"
        label-width="100px"
      >
        <div class="avater_up">
          <el-form-item prop="photo">
            <el-upload
              :action="uploadURL"
              :headers="headerObj"
              :show-file-list="false"
              :on-success="handleSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="editUserInfo.photo"
                :src="editUserInfo.photo"
                :onerror="defaultPic"
              />
              <img v-else src="@/assets/def_avater.jpg" />
              <i class="el-icon-setting"></i>
            </el-upload>
          </el-form-item>
        </div>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="editUserInfo.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="editUserInfo.sex" placeholder="请选择">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="教学科目" prop="teaSubject">
          <el-select v-model="editUserInfo.teaSubject" placeholder="请选择">
            <el-option
              v-for="item in subjectArr"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editUserInfo.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" class="cn_btn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { changeUserInfo, teacherSubject } from '@/api/index'
export default {
  props: ['uesrInfoForm'],
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
    return {
      editUserInfoRules: {
        userNickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        realName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        photo: [{ required: true, message: '请选择头像', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        teaSubject: [
          { required: true, message: '请选择教学科目', trigger: 'blur' },
        ],
      },
      uploadURL: 'api/api/common/uploadImg',
      headerObj: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      defaultPic: 'this.src="' + require('@/assets/def_avater.jpg') + '"',
      subjectArr: [],
    }
  },
  computed: {
    editUserInfo: function () {
      return this.uesrInfoForm
    },
  },
  created() {
    this.getSubjectArr()
  },
  methods: {
    getSubjectArr() {
      teacherSubject().then((res) => {
        const { data } = res
        const { subjectArr = [] } = data.data
        this.subjectArr = subjectArr
        console.log(subjectArr)
      })
    },
    // 监听图片上传成功的事件
    handleSuccess(response, file) {
      this.editUserInfo.photo = response.data.path
      console.log(this.editUserInfo.photo)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    submitForm() {
      console.log(this.editUserInfo)
      changeUserInfo(this.editUserInfo).then((res) => {
        const { data } = res
        if (data.statusCode !== 200) return this.$message.error(data.msg)
        this.$message.success(data.msg)
        this.$emit('closeDialog', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.cn_btn {
  width: 80% !important;
}
</style>

<style lang="scss">
.content_edit {
  input[type='file'] {
    display: none;
  }
  .avater_up {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form-item__content {
      margin: 0 !important;
    }
  }
  .el-upload {
    width: 100px;
    height: 100px;
    margin: 20px 0;
    position: relative;
    img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
    }
    i {
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 20px;
      color: #fff;
      background: #07a4f3;
      border-radius: 5px;
      padding: 1px;
    }
  }
}
</style>