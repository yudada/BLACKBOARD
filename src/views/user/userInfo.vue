<template>
  <div>
    <div class="main_header">
      <h4>用户信息</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="main_concent">
      <el-row>
        <el-col :span="12">
          <el-card shadow="never">
            <div v-if="schoolInfo">
              <el-form :model="userInfo" label-width="80px">
                <el-form-item label="学校">
                  <span>{{ schoolInfo.schoolName }}</span>
                </el-form-item>
                <el-form-item label="职位">
                  <span>{{ userInfo.teaPosition }}</span>
                </el-form-item>
                <el-form-item label="姓名">
                  <span>{{ userInfo.realName }}</span>
                </el-form-item>
                <el-form-item label="手机号码">
                  <span>{{ userInfo.mobile }}</span>
                </el-form-item>
                <el-form-item label="地址">
                  <span>{{ userInfo.address }}</span>
                </el-form-item>
                <el-form-item class="btn_form">
                  <el-button class="cn_btn" @click="editUIDialogVisible = true"
                    >编辑信息</el-button
                  >
                  <el-button class="cn_btn" @click="editPWDialogVisible = true"
                    >修改密码</el-button
                  >
                  <el-button
                    class="cn_btn"
                    @click="editMobileDialogVisible = true"
                    >修改手机号码</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 编辑信息 -->
    <el-dialog
      title="编辑信息"
      :visible.sync="editUIDialogVisible"
      width="50%"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <edit-user-info userInfo="userInfo" />
    </el-dialog>

    <!-- 修改手机号码 -->
    <el-dialog
      title="编辑信息"
      :visible.sync="editMobileDialogVisible"
      width="50%"
      :append-to-body="true"
      :before-close="handleClose"
    >
    <edit-mobile />
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog
      title="更改密码"
      :visible.sync="editPWDialogVisible"
      width="50%"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <edit-pass-word @closeDialog="fromEdit" />
    </el-dialog>
  </div>
</template>

<script>
import { userInfo } from '@/api/index'
import EditPassWord from '@/components/dialogContent/editPassWord.vue'
import EditUserInfo from '../../components/dialogContent/editUserInfo.vue'
import EditMobile from '../../components/dialogContent/editMobile.vue'
export default {
  components: { EditPassWord, EditUserInfo, EditMobile },
  data() {
    return {
      editPWDialogVisible: false,
      editUIDialogVisible: false,
      editMobileDialogVisible: false,
      schoolInfo: {},
      userInfo: {},
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      userInfo().then((res) => {
        const { data } = res.data
        console.log(data)
        this.schoolInfo = data.school
        this.userInfo = data.userInfo
      })
    },
    handleClose() {
      this.editPWDialogVisible = false
      this.editUIDialogVisible = false
      this.editMobileDialogVisible = false
    },
    fromEdit(data) {
      this.editPWDialogVisible = data
    },
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>

<style lang="scss">
.btn_form {
  .el-form-item__content {
    margin: 0 !important;
  }
}
</style>
