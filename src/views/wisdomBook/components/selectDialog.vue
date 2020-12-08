<template>
  <div class="select_dialog">
    <el-row>
      <el-col>
        <el-select
          v-model="classId"
          placeholder="请选择班级"
          @change="getBookList"
        >
          <el-option
            v-for="item in classList"
            :key="item.class_id"
            :label="item.className"
            :value="item.class_id"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="5"
        v-for="(item, index) in bookList"
        :key="index"
        class="addpadding iapd_w"
      >
        <el-card
          shadow="always"
          :body-style="{ padding: 0 }"
          @click.native="selectBook"
        >
          <div class="card_img">
            <!-- <img v-if="item.bookImg !== null" :src="item.bookImg" /> -->
            <img src="../../../assets/book/七年级生物.jpg" />
          </div>
          <div class="card_info">
            <a href="#"
              ><strong>{{ item.bookName }}</strong> {{ item.subName }}</a
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'selectDialog',
  props: ['dialogvisible'],
  data() {
    return {
      bookList: [],
      classList: [],
      classId: '',
    }
  },
  computed: {
    selectDialogVisible: function () {
      return this.dialogvisible
    },
  },
  created() {
    this.getClassList()
  },
  methods: {
    async getBookList() {
      const { data: res } = await this.$http.get(`api/textbook/choose`)
      this.bookList = res.data
    },
    async getClassList() {
      const { data: res } = await this.$http.get(`api/classroom/select`)
      console.log(res)
      this.classList = res.data
    },
    selectBook() {},
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  cursor: pointer;
}
.select_dialog {
  padding: 20px;
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
</style>