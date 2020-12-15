<template>
  <div>
    <div>
      <el-form
        :model="mobileInfoForm"
        status-icon
        :rules="mobileInfoFormRules"
        ref="mobileInfoFormRef"
        label-width="100px"
      >
        <el-form-item label="手机号码" prop="userMobile">
          <el-input
            v-model.number="mobileInfoForm.userMobile"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机验证码" prop="mobileCode">
          <el-input v-model.number="mobileInfoForm.mobileCode" clearable>
            <el-button slot="append" @click="getMobileCode"
              >获取手机验证码</el-button
            >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" class="cn_btn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { sendCode } from '@/api/index'
export default {
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
      mobileInfoForm: {
        userMobile: '',
        mobileCode: '',
      },
      mobileInfoFormRules: {
        userMobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
        mobileCode: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    async getMobileCode() {
      await this.$refs.mobileInfoFormRef.validateField('userMobile', (err) => {
        return console.log(err)
      })
        console.log(1)
      sendCode(this.mobileInfoForm.userMobile).then((res) => {
        const { data } = res.data
        console.log(data)
      })
    },
    submitForm() {},
  },
}
</script>

<style lang="scss" scoped>
.cn_btn {
  width: 80% !important;
}
</style>