<template>
  <div>
    <div>
      <el-form
        :model="mobileInfoForm"
        status-icon
        :rules="mobileInfoFormRules"
        ref="mobileInfoFormRef"
        label-width="120px"
      >
        <el-form-item label="手机号码" prop="userMobile">
          <el-input
            v-model.number="mobileInfoForm.userMobile"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机验证码" prop="mobileCode" class="edit_moblie">
          <div class="mobilecode">
            <el-input v-model.number="mobileInfoForm.mobileCode" clearable />
            <el-button
              @click="getMobileCode"
              :class="{ count_btn: this.timer }"
            >
              {{ btnText }}</el-button
            >
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" class="cn_btn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { sendCode, changeMobile } from '@/api/index'
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
      mobileCode: false,
      timer: null,
      count: '',
    }
  },
  computed: {
    btnText: function () {
      return this.timer ? this.count : '获取手机验证码'
    },
  },
  methods: {
    // 获取手机验证码
    async getMobileCode() {
      await this.$refs.mobileInfoFormRef.validateField('userMobile', (err) => {
        if (!err) this.mobileCode = true
        console.log(this.mobileInfoForm.userMobile)
      })
      if (this.mobileCode === true) {
        const userMobile = {
          userMobile: this.mobileInfoForm.userMobile,
        }
        sendCode(userMobile).then((res) => {
          const { data } = res
          console.log(data)
          if(data.statusCode !== 200) return this.$message.error(data.msg)
          this.$message.success(data.msg)
          if (!this.timer) {
            const TIME_COUNT = 60
            this.count = TIME_COUNT
            this.show = false
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.show = true
                clearInterval(this.timer) // 清除定时器
                this.timer = null
              }
            }, 1000)
          }
        })
      }
    },
    submitForm() {
      this.$refs.mobileInfoFormRef.validate(async valid=>{
        if(!valid) return
        changeMobile(this.mobileInfoForm).then(res => {
          const {data} = res;
          console.log(data);
          if(data.statusCode !== 200) return this.$message.error(data.msg)
          this.$message.success(data.msg)
          this.$emit('closeDialog', false);
        })
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
.edit_moblie {
  .mobilecode {
    display: flex;
    .el-button {
      width: 40%;
      color: #fff !important;
      background: linear-gradient(to bottom right, #9853af, #623aa2);
    }
    .el-button:hover {
      opacity: 0.8;
    }
    .count_btn {
      opacity: 0.8;
      border: #636262;
      background: linear-gradient(to bottom right, #aea9af, #817e85) !important;
    }
  }
  .el-input-group__append {
    padding: 0 !important;
  }
}
</style>