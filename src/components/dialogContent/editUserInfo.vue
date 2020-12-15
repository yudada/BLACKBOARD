<template>
  <div>
    <div>
      <el-form
        :model="uesrInfoForm"
        status-icon
        :rules="uesrInfoFormRules"
        ref="uesrInfoFormRef"
        label-width="100px"
      >
        <el-form-item label="昵称" prop="userNickName">
          <el-input v-model.number="uesrInfoForm.userNickName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model.number="uesrInfoForm.realName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" class="cn_btn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userInfo'],
  data() {
    return {
      uesrInfoForm: {
        userNickName: '',
        realName: '',
      },
      uesrInfoFormRules: {
        userNickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        realName: [{ required: true, message: '请选择姓名', trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm() {}
  },
}
</script>

<style lang="scss" scoped>
  .cn_btn {
    width: 80% !important;
  }
</style>