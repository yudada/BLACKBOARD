<template>
  <div>
    <div class="main_header">
      <h4>修改密码</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="main_concent">
        <el-card>
        <div slot="header">
          <span>用户信息</span>
        </div>
        <div>
          <el-col :span="8">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="旧密码" prop="userPassword">
                <el-input v-model.number="ruleForm.userPassword"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      var checkOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm.newPassword) {
          callback(new Error('两次输入的新密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          newPassword: '',
          checkPass: '',
          userPassword: ''
        },
        rules: {
          newPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          userPassword: [
            { validator: checkOldPass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
        this.$refs.ruleForm.validate(async (valid) => {
          if (!valid) return 
          const {data:res} = await this.$http.post(`api/user/modifyPassword`,this.ruleForm)
          if(res.statusCode !== 200) return this.$message.error(res.msg)
          this.$message.success(res.msg)
          this.resetForm();
        });
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
