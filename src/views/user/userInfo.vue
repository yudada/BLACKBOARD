<template>
  <div>
    <Breadcrumb :navData="navData" />

    <div class="userinfo_concent">
      <el-row>
        <el-col :span="12">
          <el-card shadow="never">
            <div v-if="schoolInfo">
              <el-form :model="userInfo" label-width="80px">
                <div class="avater_form">
                  <el-form-item class="avater">
                    <img
                      v-if="userInfo.photo"
                      :src="userInfo.photo"
                      alt=""
                      :onerror="defaultPic"
                    />
                    <img v-else src="@/assets/def_avater.jpg" alt="" />
                  </el-form-item>
                </div>
                <el-form-item label="学校">
                  <span>{{ schoolInfo.schoolName }}</span>
                </el-form-item>
                <el-form-item label="职位">
                  <span>{{ userInfo.teaPosition }}</span>
                </el-form-item>
                <el-form-item label="学科">
                  <span>{{ userInfo.teaSubject }}</span>
                </el-form-item>
                <el-form-item label="姓名">
                  <span>{{ userInfo.realName }}</span>
                </el-form-item>
                <el-form-item label="手机号码">
                  <span>{{ userInfo.mobile }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ userInfo.sex }}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                  <span>{{ userInfo.email }}</span>
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
      width="35%"
      :append-to-body="true"
      :before-close="handleClose"
      custom-class="info_dialog"
      top="10vh"
    >
      <edit-user-info :uesrInfoForm="uesrInfoForm" @closeDialog="fromEdit" />
    </el-dialog>

    <!-- 修改手机号码 -->
    <el-dialog
      title="修改手机号码"
      :visible.sync="editMobileDialogVisible"
      width="35%"
      :append-to-body="true"
      :before-close="handleClose"
      top="30vh"
      custom-class="moblie_dialog"
    >
      <edit-mobile @closeDialog="fromEdit" />
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog
      title="更改密码"
      :visible.sync="editPWDialogVisible"
      width="30%"
      :append-to-body="true"
      :before-close="handleClose"
      top="30vh"
      custom-class="passw_dialog"
    >
      <edit-pass-word @closeDialog="fromEdit" />
    </el-dialog>
  </div>
</template>

<script>
import { userInfo } from '@/api/index'
import EditPassWord from '@/components/dialogContent/editPassWord.vue'
import EditUserInfo from '@/components/dialogContent/editUserInfo.vue'
import EditMobile from '@/components/dialogContent/editMobile.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { EditPassWord, EditUserInfo, EditMobile, Breadcrumb },
  data() {
    return {
      navData: {
        title: '',
        childTitle: '用户信息',
      },
      editPWDialogVisible: false,
      editUIDialogVisible: false,
      editMobileDialogVisible: false,
      schoolInfo: {},
      userInfo: {},
      uesrInfoForm: {
        realName: '',
        photo: '',
        email: '',
        sex: '',
        address: '',
        teaSubject: '',
      },
      defaultPic: 'this.src="' + require('@/assets/def_avater.jpg') + '"',
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      userInfo().then((res) => {
        const { data } = res.data
        this.schoolInfo = data.school
        this.userInfo = data.userInfo
        const {
          realName,
          photo,
          email,
          sex,
          address,
          teaSubject,
        } = data.userInfo
        this.uesrInfoForm.realName = realName
        this.uesrInfoForm.photo = photo
        this.uesrInfoForm.email = email
        this.uesrInfoForm.sex = sex
        this.uesrInfoForm.address = address
        this.uesrInfoForm.teaSubject = teaSubject
      })
    },
    handleClose() {
      this.editPWDialogVisible = false
      this.editUIDialogVisible = false
      this.editMobileDialogVisible = false
    },
    fromEdit(data) {
      this.editPWDialogVisible = data
      this.editUIDialogVisible = data
      this.editMobileDialogVisible = data
      location.reload()
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
.userinfo_concent {
  span {
    font-size: 1rem;
    color: #999999;
  }
  .btn_form {
    .el-form-item__content {
      margin: 0 !important;
    }
  }
  .avater_form {
    display: flex;
    justify-content: center;
    .avater {
      width: 120px;
      height: 120px;
      img {
        width: 100%;
        box-shadow: 0 0 10px #ddd;
        border-radius: 50%;
      }
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .el-button {
    span {
      color: #fff;
      font-size: 14px;
    }
  }
  .el-dialog__body {
    padding: 30px 20px 20px 0 !important;
  }
}

@media (max-width: 1024px) {
  .passw_dialog,
  .moblie_dialog,
  .info_dialog {
    width: 50% !important;
  }
}
</style>
