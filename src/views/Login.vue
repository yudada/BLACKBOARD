<template>
  <div class="login_container">
    <div class="login_content">
      <p>AI 教务管理系统</p>
      <el-card class="login_card">
        <p>欢迎登录</p>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input clearable placeholder="请输入用户名或手机号" v-model="loginForm.userName" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" style="margin:0">
          <el-input clearable placeholder="请输入登录密码" v-model="loginForm.userPassword" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <el-form-item class="forget_psw">
          <el-button type="text" @click="forgetPassword">忘记密码?</el-button>
        </el-form-item>
        <el-form-item prop="password">
          <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button class="cn_btn" type="primary" @click="login">进入</el-button>
        </el-form-item>
        </el-form>
        <div class="apppp"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        userName: '',
        userPassword: '',
        checked: false
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        userName: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        userPassword: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写必要项！')
        const { data: res } = await this.$http.post('/api/auth/login', this.loginForm)
        if (res.statusCode !== 200) return this.$message.error(res.msg)
        this.$message.success('登录成功!')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      });
    },
    forgetPassword() {
      alert('忘记密码请联系您的管理员同事。')
    }
  }
}
</script>

<style lang="scss" scoped>
.login_container{
  height: 100%;
  background-image: url(../assets/images/bg-01.jpeg);
}
.login_content{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p { 
    color: #fff;
    font-size: xx-large;
    }
  .login_card{
    width: 350px;
    p {
      color: #636262;
      text-align: center;
      font-size: large;
    }
  }
}
.forget_psw {
  margin: 0;
  text-align: end;
}
.cn_btn {
  width: 100%;
}
</style>
