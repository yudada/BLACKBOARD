<template>
  <div class="wisdomBook_main">
    <div class="main_header">
      <h4>智慧课本</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>智慧课本</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="wisdomBook_concent">
      <el-row :gutter="20">
        <el-col
          :span="5"
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
              <!-- <img v-if="item.bookImg !== null" :src="item.bookImg" /> -->
              <img src="../../assets/book/七年级生物.jpg" />
            </div>
            <div class="card_info">
              <a href="#"
                ><strong>{{ item.bookName }}</strong> {{ item.subName }}</a
              >
            </div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card
            shadow="always"
            :body-style="{ padding: 0 }"
            @click.native="addBook"
          >
            <div class="card_img">
              <img src="../../assets/book/addBook.png" />
            </div>
            <div class="card_info">
              <!-- <a href="#"><strong>添加课本</strong></a> -->
            </div>
          </el-card>
        </el-col>

        <!-- 弹框 -->
        <el-dialog
          :title="dialigTitle"
          :visible.sync="bookDialogVisible"
          fullscreen
          :modal="false"
          :append-to-body="true"
          custom-class="dialog"
        >
          <iframe
            src="https://edudom.11dom.com/courses/18#/section1/part1"
            frameborder="0"
          ></iframe>
        </el-dialog>
        <!-- 选择课本弹框 -->
        <el-dialog
          title="选择课本"
          :visible.sync="selectDialogVisible"
          width="80%"
          :append-to-body="true"
          custom-class="dialog"
        >
          <select-dialog></select-dialog>
        </el-dialog>
      </el-row>
    </div>
  </div>
</template>

<script>
import selectDialog from './components/selectDialog.vue'
export default {
  components: { selectDialog },
  data() {
    return {
      subjectList: [],
      selectDialogVisible: false,
      dialigTitle: '',
      bookDialogVisible: false,
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
      console.log(res.data)
      this.subjectList = res.data
    },
    openBookDialogVisible(item) {
      console.log(item.bookName)
      this.bookDialogVisible = true
      this.dialigTitle = item.bookName + item.subName
    },
    addBook() {
      this.selectDialogVisible = true
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
    img {
      width: 100%;
    }
  }
  .card_info {
    padding: 1rem;
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

@media (max-width: 768px) {
  .iapd_w {
    width: 50% !important;
    margin-bottom: 1rem;
  }
}

@media (max-width: 375px) {
  .iapd_w {
    width: 100% !important;
  }
}
</style>
