<template>
  <div>
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="旧密码" prop="userPassword">
          <el-input
            type="password"
            autocomplete="off"
            v-model="ruleForm.userPassword"
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            type="password"
            v-model="ruleForm.newPassword"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" class="cn_btn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { changePassWord } from '@/api/index'
export default {
  data() {
    var checkOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入的新密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        newPassword: '',
        checkPass: '',
        userPassword: '',
      },
      rules: {
        newPassword: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
        userPassword: [
          { required: true, validator: checkOldPass, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return
        changePassWord(this.ruleForm).then((res) => {
          this.$message.success(res.msg)
          this.$emit('closeDialog', false)
          this.resetForm()
        })
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.cn_btn {
  width: 80% !important;
}
</style>