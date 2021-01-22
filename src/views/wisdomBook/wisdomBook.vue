<template>
  <div class="wisdomBook_main">
    <Breadcrumb :navData="navData" />

    <div class="wisdomBook_concent">
      <el-row>
        <el-col class="wisdom-header">
          <div
            v-for="item in bookTypeList"
            :key="item.id"
            class="wisdom-header-item"
            @click="changeCategory(item.id)"
          >
            <i class="icon" :class="item.cover"></i>
            <span>{{ item.name }}</span>
          </div>
        </el-col>
      </el-row>
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
            class="wisdiom-book"
          >
            <div class="card_img">
              <img
                v-if="item.bookImg !== null"
                :src="item.bookImg"
                :onerror="defaultPic"
              />
              <img v-else src="@/assets/book/七年级生物.jpg" />
            </div>
            <div class="card_info">
              <span>{{ item.bookName }}</span>
              <span>{{ item.subName }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card
            shadow="always"
            :body-style="{ padding: 0 }"
            @click.native="addBook"
            class="wisdiom-book"
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
          <iframe :src="bookInfo.bookAddress" frameborder="0"></iframe>
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
import { mapState, mapMutations } from 'vuex'
import selectDialog from './components/selectDialog.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import { wisdomBookList, categoryListBook } from '@/api/wisdomBook'
export default {
  components: { selectDialog, Breadcrumb },
  data() {
    return {
      navData: {
        childTitle: '智慧课本',
      },
      subjectList: [],
      selectDialogVisible: false,
      bookInfo: {},
      bookDialogVisible: false,
      defaultPic: 'this.src="' + require('@/assets/book/七年级生物.jpg') + '"',
      bookTypeList: [ { id: 0, name: '全部'}],
      bookParams: {
        class_id: '',
        category_id: ''
      }
    }
  },
  created() {
    this.getbookList()
    this.getCategoryListBook()
    this.bookParams.class_id = this.classInfo.class_id
  },
  computed: {
    ...mapState(['classInfo']),
  },
  watch: {
    'bookParams.category_id':function(newValue, oldValue) {
      if(newValue !== oldValue) {
        this.getbookList()
      }
    }
  },
  methods: {
    getbookList() {
      console.log(this.bookParams);
      wisdomBookList(this.bookParams).then(res=>{
        const { data } = res
        this.subjectList = data
      })
    },
    getCategoryListBook() {
      categoryListBook().then(res=>{
        const { data } = res
        this.bookTypeList = data
        console.log(data);
      })
    },
    openBookDialogVisible(item) {
      this.bookDialogVisible = true
      this.bookInfo = item
      console.log(this.bookInfo)
    },
    addBook() {
      this.selectDialogVisible = true
    },
    fromSun(data) {
      this.selectDialogVisible = data
      this.getbookList()
    },
    changeCategory(id) {
      if(id === 1 ) {
        this.bookParams.category_id = ''
      } else {
        this.bookParams.category_id = id
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.wisdiom-book {
  cursor: pointer;
  transition: transform 0.6s;
  box-shadow: 6px 6px 5px #888 !important;
}
.wisdiom-book:hover {
  transform: scale(1.1);
}
.wisdomBook_concent {
  .wisdom-header {
    width: 1005;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    border-radius: 5px;
    padding: 5px;
    .wisdom-header-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #6d7382;
      padding: 20px 0;
      width: 100%;
      cursor: pointer;
      i {
        font-size: x-large;
        margin-bottom: 5px;
      }
    }
    .wisdom-header-item:hover,
    .wisdom-header-item:focus {
      background: #f2f5f9;
      box-shadow: inset 0 2px 2px rgb(69 87 113 / 20%);
      border-radius: 3px;
      i {
        color: #AD5DF3;
      }
    }
  }
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
    display: flex;
    flex-direction: column;
    span {
      height: 50%;
      overflow: hidden;
      color: #ad5df3;
      font-weight: bold;
    }
    span:nth-child(2) {
      font-weight: normal;
    }
  }
}
.addpadding {
  padding-bottom: 30px;
}
</style>

<style lang="scss">
.select-dialog {
  max-height: 84vh;
  overflow: overlay;
}
</style>
