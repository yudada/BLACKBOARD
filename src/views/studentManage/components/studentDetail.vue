<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>基础信息</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="openDialog"
          >编辑信息</el-button
        >
      </div>
      <div class="student_info">
        <table class="table_wh">
          <tbody class="table_w">
            <tr>
              <td><strong>性别 : </strong>{{ studentInfo.sex }}</td>
            </tr>
            <tr>
              <td>
                <strong>家庭址址 : </strong>
                {{ studentInfo.address }}
              </td>
            </tr>
            <tr>
              <td><strong>兴趣爱好 : </strong>{{ studentInfo.hobby }}</td>
            </tr>
          </tbody>
          <tbody class="table_w">
            <tr>
              <td><strong>学生QQ : </strong>{{ studentInfo.qq }}</td>
            </tr>
            <tr>
              <td><strong>学生邮箱 : </strong>{{ studentInfo.email }}</td>
            </tr>
            <tr>
              <td><strong>学生电话 : </strong>{{ studentInfo.userMobile }}</td>
            </tr>
          </tbody>
          <tbody
            class="table_w"
            v-for="(item, index) in studentInfo.parentsInfo"
            :key="index"
          >
            <div v-if="item.realName">
              <tr>
                <td>
                  <strong>家长姓名 : </strong>{{ item.realName }}--{{
                    item.relation
                  }}
                </td>
              </tr>
              <tr>
                <td><strong>联系电话 : </strong>{{ item.mobile }}</td>
              </tr>
            </div>
          </tbody>
        </table>
      </div>
      <div class="book_info">
        <el-tabs v-model="activeName" class="book_tab">
          <el-tab-pane label="智慧课本" name="first">
            <div class="book_card">
              <div
                v-for="book in studentInfo.textbook"
                :key="book.id"
                class="book_detail"
              >
                <div class="subject_img">
                  <img v-if="book.bookImg" :src="book.bookImg" />
                  <img v-else src="@/assets/book/七年级生物.jpg" />
                </div>
                <div class="subject_info">
                  <el-button type="text">{{ book.bookName }}</el-button>
                  <el-button type="text">已读：{{ book.percent }}</el-button>
                  <el-button type="text">笔记：{{ book.noteNum }} 条</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="阅读笔记" name="second">
            <div
              v-for="item in studentInfo.notes"
              :key="item.id"
              class="read_info"
            >
              <div class="content_note">
                <i class="el-icon-edit-outline" />
                <p>{{ item.note }}</p>
              </div>
              <span>{{ item.noteTime }}</span>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="点赞互动" name="third">点赞互动</el-tab-pane> -->
        </el-tabs>
      </div>
      <!-- 编辑信息 -->
      <el-dialog
        title="编辑信息"
        :visible.sync="editUIDialogVisible"
        width="60%"
        :append-to-body="true"
        :before-close="handleClose"
        custom-class="info_dialog"
        top="10vh"
      >
        <edit-student :studentInfo="studentInfo" @closeDialog="fromEdit" />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import editStudent from '@/components/dialogContent/editStudent.vue'
export default {
  components: { editStudent },
  props: ['studentInfo'],
  data() {
    return {
      activeName: 'second',
      editUIDialogVisible: false,
    }
  },
  methods: {
    openDialog() {
      this.editUIDialogVisible = true
    },
    handleClose() {
      this.editUIDialogVisible = false
    },
    fromEdit(data) {
      this.editUIDialogVisible = data
    },
  },
}
</script>

<style lang="scss" scoped>
.student_info {
  table {
    border-collapse: separate;
    border-spacing: 1rem;
  }
  padding: 0.5rem;
  border: 1px solid rgba(167, 180, 201, 0.2);
  margin-bottom: 0.5rem;
  .table_wh {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    .table_w {
      color: #636262;
      font-size: 14px;
      width: 40%;
    }
  }
}
.book_tab {
  padding: 0.5rem;
  border: 1px solid rgba(167, 180, 201, 0.2);
  .book_card {
    display: flex;
    flex-wrap: wrap;
    .book_detail {
      margin: 20px;
      border: 1px solid rgba(167, 180, 201, 0.2);
      border-radius: 10px;
      padding: 0 !important;
      width: calc(25% - 40px);
      box-shadow: 0px 0px 10px rgba(69, 101, 173, 0.1);
      .subject_img {
        border-bottom: 1px solid rgba(167, 180, 201, 0.2);
        border-radius: 10px 10px 0 0;
        width: 100%;
        padding-bottom: 140%;
        height: 0;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .subject_info {
        padding: 20px;
        .el-button {
          padding: 0 !important;
        }
      }
    }
  }
  .read_info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #636262;
    font-size: 14px;
    padding: 0 1rem;
    .content_note {
      display: flex;
      align-items: center;
      flex: 4;
      i {
        padding-right: 0.5rem;
        color: #623aa2;
        font-size: large;
      }
    }
    span {
      flex: 1;
    }
  }
}
@media (max-width: 1024px) {
  .info_dialog {
    width: 50% !important;
  }
}
@media (max-width: 375px) {
  .table_wh {
    display: inherit;
    width: 100%;
    .table_w {
      color: #636262;
      font-size: 14px;
      width: 100%;
    }
  }
}
</style>

<style lang="scss">
.info_dialog {
  max-height: 88vh;
  overflow: scroll;
}
</style>