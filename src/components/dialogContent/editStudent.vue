<template>
  <div class="content_edit">
    <div v-if="studentInfo">
      <el-form
        :model="editStudentInfo"
        status-icon
        :rules="editStudentInfoRules"
        ref="editStudentInfoRef"
        label-width="80px"
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
                v-if="editStudentInfo.photo"
                :src="editStudentInfo.photo"
                :onerror="defaultPic"
              />
              <img v-else src="@/assets/def_avater.jpg" />
              <i class="el-icon-setting"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div class="content_form">
          <el-form-item label="账号" prop="userName">
            <el-input v-model="editStudentInfo.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="editStudentInfo.userPassword"
              placeholder="学生登录密码，请勿随意更改！"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="userMobile">
            <el-input v-model="editStudentInfo.userMobile"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="stuName">
            <el-input v-model="editStudentInfo.stuName"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="editStudentInfo.sex" placeholder="请选择">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editStudentInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="editStudentInfo.address"></el-input>
          </el-form-item>
          <el-form-item label="爱好">
            <el-input v-model="editStudentInfo.hobby"></el-input>
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="editStudentInfo.qq"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item label="家长" v-for="(item,index) in editStudentInfo.parents" :key="index">
            <el-input placeholder="关系" v-model="item.relation"></el-input>
            <el-input placeholder="姓名" v-model="item.realName"></el-input>
            <el-input placeholder="手机号码" v-model="item.mobile"></el-input>
          </el-form-item>
        </div>
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
  props: ['studentInfo'],
  data() {
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
      editStudentInfoRules: {
        userName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        userMobile: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
      headerObj: {
        ContentType: 'multipart/form-data',
        Authorization: window.sessionStorage.getItem('token'),
      },
      defaultPic: 'this.src="' + require('@/assets/def_avater.jpg') + '"',
      subjectArr: [],
    }
  },
  computed: {
    editStudentInfo: function () {
      return this.studentInfo
    },
    uploadURL: function () {
      const isDev = process.env.NODE_ENV === 'development'
      return isDev
        ? 'api/api/common/uploadImg'
        : 'https://api.vrbook.vip/api/common/uploadImg'
    },
  },
  methods: {
    // 监听图片上传成功的事件
    handleSuccess(response, file) {
      this.editStudentInfo.photo = response.data.path
      console.log(this.editStudentInfo.photo)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    submitForm() {
      console.log(this.editStudentInfo)
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
.content_form {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    width: 50%;
  }
}
</style>