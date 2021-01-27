<template>
  <div class="wisdomBook_main">
    <Breadcrumb :navData="navData" />

    <div class="wisdomBook_concent">
      <!-- 分类导航 -->
      <el-row>
        <el-col class="wisdom-header">
          <div
            v-for="item in bookTypeList"
            :key="item.id"
            class="wisdom-header-item"
            :class="{ 'wisdom-header-item-active': item.id === activeIcon }"
            @click="changeCategory(item.id)"
          >
            <i v-html="item.cover"></i>
            <span>{{ item.name }}</span>
          </div>
        </el-col>
      </el-row>
      <!-- 课本列表 -->
      <el-row :gutter="50">
        <el-col :span="5" v-for="(item, index) in subjectList" :key="index">
          <el-card
            shadow="always"
            :body-style="{ padding: 0 }"
            class="wisdiom-book"
          >
            <div class="book-cover" @click="openBookDialogVisible(item)">
              <img
                v-if="item.bookImg !== null"
                :src="item.bookImg"
                :onerror="defaultPic"
              />
              <img v-else src="@/assets/book/七年级生物.jpg" />
            </div>
            <div class="book-info">
              <div style="width: 80%">
                <span>{{ item.bookName }}</span>
                <span>{{ item.subName }}</span>
              </div>
              <div
                v-loading="item.isLoading"
                class="book-catalog"
                @click="openCatalog(item)"
              >
                <img src="@/assets/icon/1_catalog.png" alt="" />
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card
            shadow="always"
            :body-style="{ padding: 0 }"
            @click.native="addBook"
            class="wisdiom-book"
          >
            <div class="book-add">
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

        <!-- 课程目录对话框 -->
        <Catalog-dialog
          :isOpenDialog="isOpenDialog"
          :catalogInfo="catalogInfo"
          @dialog="fromDialog"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import selectDialog from './components/selectDialog.vue'
import CatalogDialog from './components/catalogDialog'
import Breadcrumb from '@/components/breadcrumb.vue'
import {
  wisdomBookList,
  categoryListBook,
  wisdomBookDeatil,
} from '@/api/wisdomBook'
export default {
  components: { selectDialog, Breadcrumb, CatalogDialog },
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
      bookTypeList: [{ id: 0, name: '全部' }],
      bookParams: {
        class_id: '',
        category_id: '',
      },
      activeIcon: 1,
      isOpenDialog: false,
      loading: false,
      catalogInfo: {},
    }
  },
  created() {
    this.bookParams.class_id = this.classInfo.class_id
    this.getbookList()
    this.getCategoryListBook()
  },
  computed: {
    ...mapState(['classInfo']),
  },
  watch: {
    'bookParams.category_id': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getbookList()
      }
    },
  },
  methods: {
    getbookList() {
      if (this.bookParams.category_id === 1) this.bookParams.category_id = ''
      console.log(this.bookParams)
      wisdomBookList(this.bookParams).then((res) => {
        const { data } = res
        data.map((item, i)=>{
          let key = 'isLoading'
          let value = false
          item[key] = value
        })
        this.subjectList = data
        console.log(this.subjectList);
      })
    },
    getCategoryListBook() {
      categoryListBook().then((res) => {
        const { data } = res
        this.bookTypeList = data
      })
    },
    openBookDialogVisible(item) {
      console.log(item);
      this.bookDialogVisible = true
      this.bookInfo = item
    },
    addBook() {
      this.selectDialogVisible = true
    },
    fromSun(data) {
      this.selectDialogVisible = data
      this.getbookList()
    },
    changeCategory(id) {
      this.bookParams.category_id = id
      this.activeIcon = id
    },
    // 接收弹框数据
    fromDialog(data) {
      this.isOpenDialog = data
    },
    openCatalog(book) {
      book.isLoading = true
      wisdomBookDeatil(book.id, 1).then((res) => {
        this.catalogInfo = res.data
        book.isLoading = false
        this.isOpenDialog = true
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.wisdomBook_concent {
  .wisdom-header {
    width: 100%;
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
      margin: 0 5px;
      width: 100%;
      cursor: pointer;
      i {
        font-size: xx-large;
        margin-bottom: 10px;
      }
    }
    .wisdom-header-item:hover,
    .wisdom-header-item-active,
    .wisdom-header-item:focus {
      background: #f2f5f9;
      box-shadow: inset 0 2px 2px rgb(69 87 113 / 20%);
      border-radius: 3px;
      i {
        color: #ad5df3;
      }
    }
  }
  .wisdiom-book {
    cursor: pointer;
    transition: transform 0.5s;
    box-shadow: 6px 6px 5px #888 !important;
    .book-cover {
      width: 100%;
      padding-bottom: 125%;
      height: 0;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .book-info {
      width: calc(100% - 1rem);
      padding: 1rem 0.5rem;
      height: 3rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      span {
        height: 50%;
        display: flex;
        overflow: hidden;
        color: #ad5df3;
        font-weight: bold;
      }
      span:nth-child(2) {
        font-weight: normal;
      }
      .book-catalog {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ad5df3;
        img {
          width: 1.5rem;
        }
      }
    }
    .book-add {
      img {
        width: 100%;
        margin: 1.5rem 0;
      }
    }
  }
}
.wisdiom-book:hover {
  transform: scale(1.1);
}
</style>

<style lang="scss">
.select-dialog {
  max-height: 84vh;
  overflow: overlay;
}
.wisdomBook_main {
  .el-col-5 {
    width: 19.83333%;
    padding-bottom: 30px;
  }
}
</style>
