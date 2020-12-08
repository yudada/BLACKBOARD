<template>
  <div class="login_container">
    <div class="login_content">
      <p>AI 教务管理系统</p>
      <el-card class="login_card">
        <p>欢迎登录</p>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          class="login_form"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              clearable
              placeholder="请输入用户名或手机号"
              v-model="loginForm.userName"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password" style="margin: 0">
            <el-input
              clearable
              placeholder="请输入登录密码"
              v-model="loginForm.userPassword"
              prefix-icon="el-icon-lock"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item class="forget_psw">
            <el-button type="text" @click="forgetPassword">忘记密码?</el-button>
          </el-form-item>
          <el-form-item prop="password">
            <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button class="cn_btn" type="primary" @click="login"
              >进入</el-button
            >
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
        checked: false,
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        userName: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        // 验证密码是否合法
        userPassword: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    if(window.document.cookie.length > 0) return this.loginForm.checked = true;
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('请填写必要项！')
        const { data: res } = await this.$http.post(
          `/api/auth/login`,
          this.loginForm
        )
        if (res.statusCode !== 200) return this.$message.error(res.msg)
        this.$message.success('登录成功!');

        window.sessionStorage.setItem('token', res.data.token);

        if (this.loginForm.checked === true) {
          this.setCookie(this.loginForm.userName,this.loginForm.userPassword,7)
        } else {
          this.clearCookie()
        }

        this.$router.push('/home')
      })
    },
    forgetPassword() {
      alert('忘记密码请联系您的管理员同事。')
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date() //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        'userName' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie =
        'userPassword' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString()
    },
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ') //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=') //再次切割
          //判断查找相对应的值
          if (arr2[0] == 'userName') {
            this.loginForm.userName = arr2[1] //保存到保存数据的地方
          } else if (arr2[0] == 'userPassword') {
            this.loginForm.userPassword = arr2[1]
          }
        }
      }
    },
    //清除cookie
    clearCookie: function () {
      this.setCookie('', '', -1) //修改2值都为空，天数为负1天就好了
    },
  },
}
</script>

<style lang="scss" scoped>
.login_container {
  height: 100%;
  background-image: url(../assets/images/bg-01.jpeg);
}
.login_content {
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
  .login_card {
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
