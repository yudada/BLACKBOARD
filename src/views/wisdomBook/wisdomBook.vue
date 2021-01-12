<template>
  <div class="wisdomBook_main">
    <Breadcrumb :navData="navData" />

    <div class="wisdomBook_concent">
      <el-row :gutter="20">
        <el-col
          :span="4"
          v-for="(item, index) in subjectList"
          :key="index"
          class="addpadding iapd_w"
        >
          <el-card
            shadow="always"
            :body-style="{ padding: 0 }"
            @click.native="openBookDialogVisible(item)"
          >
            <div class="card_img">
              <img v-if="item.bookImg !== null" :src="item.bookImg" :onerror="defaultPic" />
              <img v-else src="@/assets/book/七年级生物.jpg" />
            </div>
            <div class="card_info">
              <a href="#"
                ><strong>{{ item.bookName }}</strong> {{ item.subName }}</a
              >
              <!-- <span><strong>{{ item.bookName }}</strong> {{ item.subName }}</span> -->
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card
            shadow="always"
            :body-style="{ padding: 0 }"
            @click.native="addBook"
          >
            <div class="space_img">
              <img src="@/assets/book/addBook.jpg" />
            </div>
          </el-card>
        </el-col>

        <!-- 弹框 -->
        <el-dialog
          :title="bookInfo.bookName"
          :visible.sync="bookDialogVisible"
          fullscreen
          :modal="false"
          :append-to-body="true"
          custom-class="dialog"
        >
          <iframe
            :src="bookInfo.bookAddress"
            frameborder="0"
          ></iframe>
        </el-dialog>
        <!-- 选择课本弹框 -->
        <el-dialog
          title="选择课本"
          :visible.sync="selectDialogVisible"
          width="80%"
          :append-to-body="true"
          :destroy-on-close="true"
          top="8vh"
          custom-class="select-dialog"
        >
          <select-dialog @closeDialog="fromSun"></select-dialog>
        </el-dialog>
      </el-row>
    </div>
  </div>
</template>

<script>
import selectDialog from './components/selectDialog.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { selectDialog, Breadcrumb },
  data() {
    return {
      navData: {
        childTitle: '智慧课本'
      },
      subjectList: [],
      selectDialogVisible: false,
      bookInfo: {},
      bookDialogVisible: false,
      defaultPic: 'this.src="'+require('@/assets/book/七年级生物.jpg')+'"'
    }
  },
  created() {
    this.getbookList()
  },
  methods: {
    async getbookList() {
      const { data: res } = await this.$http.get('/api/textbook/lists')
      if (res.statusCode !== 200)
        return this.$messsage.error('获取课本列表失败！')
      this.subjectList = res.data
    },
    openBookDialogVisible(item) {
      this.bookDialogVisible = true
      this.bookInfo = item;
      console.log(this.bookInfo);
    },
    addBook() {
      this.selectDialogVisible = true
    },
    fromSun(data) {
      this.selectDialogVisible = data;
      this.getbookList()
    },
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  cursor: pointer;
}
.wisdomBook_concent {
  .card_img {
    width: 100%;
    padding-bottom: 140%;
    height: 0;
    overflow: hidden;
    img {
      width: 100%;

    }
  }
  .space_img {
    img {
      width: 100%;
      margin: 38px 0;
    }
  }
  .card_info {
    padding: 1rem;
    height: 3rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    .ava {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 2rem 0 1rem 0;
      .ava_img {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 25%;
          border-radius: 100%;
          margin-right: 1rem;
        }
        .info {
          p {
            margin: 0;
          }
        }
      }
      .ava_info {
        display: flex;
        justify-content: space-between;
        i {
          margin: 0.5rem;
        }
      }
    }
  }
}
.addpadding {
  padding-bottom: 20px;
}
</style>

<style lang="scss">
  .select-dialog {
    max-height: 84vh;
    overflow: overlay;
  }
</style>
