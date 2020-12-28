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
            <el-input v-model="editStudentInfo.userName" />
          </el-form-item>
          <el-form-item label="密码">
            <div v-if="editStudentInfo.userName">
              <el-button size="mini" @click="resetPassWord">{{buttonText}}</el-button>
            </div>
            <div v-else>
              <el-input v-model="editStudentInfo.userPassword" placeholder="默认123456" disabled />
            </div>
          </el-form-item>
          <el-form-item label="手机号码" prop="userMobile">
            <el-input v-model="editStudentInfo.userMobile" />
          </el-form-item>
          <el-form-item label="姓名" prop="stuName">
            <el-input v-model="editStudentInfo.stuName" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="editStudentInfo.sex" placeholder="请选择">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editStudentInfo.email" />
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="editStudentInfo.qq" />
          </el-form-item>
          <el-form-item label="爱好">
            <el-input v-model="editStudentInfo.hobby" />
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="editStudentInfo.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="editStudentInfo.address" />
          </el-form-item>
        </div>
        <el-form-item label="家长" class="parentsInfo_form" prop="parentsInfo">
          <el-select v-model="editStudentInfo.parentsInfo[0].relation" placeholder="请选择关系">
            <el-option v-for="item2 in parentsInfoRelation" :key="item2.id" :label="item2.relation" :value="item2.relation" />
          </el-select>
          <el-input
            placeholder="姓名(选择其他关系时请填写关系)"
            v-model="editStudentInfo.parentsInfo[0].realName"
          />
          <el-input
            placeholder="手机号码"
            v-model="editStudentInfo.parentsInfo[0].mobile"
          />
        </el-form-item>
        <el-form-item
          class="parentsInfo_form"
          label="家长"
          v-for="(item, index) in editStudentInfo.parentsInfo"
          :key="index"
          v-show="index !== 0"
        >
          <el-select v-model="item.relation" placeholder="请选择关系">
            <el-option v-for="item2 in parentsInfoRelation" :key="item2.id" :label="item2.relation" :value="item2.relation" />
          </el-select>
          <el-input placeholder="姓名(选择其他关系时请填写关系)" v-model="item.realName" />
          <el-input placeholder="手机号码" v-model="item.mobile" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" class="cn_btn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { saveEditStudent } from '@/api/studentManage'
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
        userName: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
        userMobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
        parentsInfo: [
          {
            required: true,
            message: '请至少填写一位家长信息',
            trigger: 'blur',
          },
        ],
      },
      headerObj: {
        ContentType: 'multipart/form-data',
        Authorization: window.sessionStorage.getItem('token'),
      },
      defaultPic: 'this.src="' + require('@/assets/def_avater.jpg') + '"',
      subjectArr: [],
      parentsInfoRelation: [
        { id: 1, relation: '爸爸'},
        { id: 2, relation: '妈妈'},
        { id: 3, relation: '爷爷'},
        { id: 4, relation: '奶奶'},
        { id: 5, relation: '外公'},
        { id: 6, relation: '外婆'},
        { id: 7, relation: '其他'},
      ],
      resetPW: false
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
    buttonText: function() {
      return this.resetPW ? '已重置' : '重置密码'
    },
    sid: function() {
      return this.$route.query.sid
    }
  },
  mounted() {
    if(!this.editStudentInfo.userName) {
      this.editStudentInfo.userPassword = '123456'
    }
    console.log(this.editStudentInfo);
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
    async resetPassWord() {
      const confirmResult = await this.$confirm(
        "是否重置密码为“123456” ?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmResult !== "confirm") {
        return 
      }
      this.resetPW = true;
      this.editStudentInfo.userPassword = '123456'
    },
    submitForm() {
      console.log(this.sid,this.editStudentInfo);

      saveEditStudent(this.sid,this.editStudentInfo).then(res => {
        console.log(res);
        if (res.statusCode !== 200) return this.$message.error(res.msg)
        this.$message.success(res.msg)
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
  .content_form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 50%;
    }
    .el-select {
      width: 100% !important;
    }
    .el-date-editor {
      width: 100%;
    }
    .el-button {
      border-radius: 15px;
      color: #fff;
      background: linear-gradient(to bottom right, #9853af, #623AA2) !important;
    }
  }
  .parentsInfo_form {
    .el-input {
      width: 30%;
      margin-right: 1em;
    }
    .el-select {
      width: 30%;
      margin-right: 1em;
      .el-input {
        width: 100%;
      }
    }
  }
}
</style>