<template>
  <div class="select_dialog">
    <!-- <el-select v-model="classId" placeholder="请选择班级" @change="getBookList">
      <el-option
        v-for="item in classList"
        :key="item.class_id"
        :label="item.className"
        :value="item.class_id"
      >
      </el-option>
    </el-select> -->
    <div v-if="bookList.length">
      <el-checkbox-group v-model="wisdomBookId" class="check_list">
        <el-checkbox v-for="item in bookList" :key="item.id" :label="item.id">
          <el-card :body-style="{ padding: 0 }">
            <div class="card_img">
              <img
                v-if="item.bookImg !== null"
                :src="item.bookImg"
                :onerror="defaultPic"
              />
              <img v-else src="@/assets/book/七年级生物.jpg" />
            </div>
            <div class="card_info">
              <span
                ><strong>{{ item.bookName }}</strong> {{ item.subName }}</span
              >
            </div>
          </el-card>
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div v-else class="no_data">
      <span>暂无更多课本！</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="addWisdomBook">确 定</el-button>
    </span>
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
      wisdomBookId: [],
      defaultPic: 'this.src="' + require('@/assets/book/七年级生物.jpg') + '"',
    }
  },
  computed: {
    selectDialogVisible: function () {
      return this.dialogvisible
    },
  },
  created() {
    this.getBookList()
  },
  methods: {
    async getBookList() {
      const { data: res } = await this.$http.get(`api/textbook/choose`)
      this.bookList = res.data
    },
    // async getClassList() {
    //   const { data: res } = await this.$http.get(`api/classroom/select`)
    //   console.log(res)
    //   this.classList = res.data
    //   this.classId = this.classList[0].class_id

    //   this.getBookList()
    // },
    async addWisdomBook() {
      if(this.bookList.length === 0) return this.closeDialog()
      console.log(this.classId, this.wisdomBookId)
      const { data: res } = await this.$http.post(`api/textbook/store`, {
        textbook_ids: this.wisdomBookId,
      })
      if (res.statusCode !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.closeDialog()
    },
    closeDialog() {
      this.$emit('closeDialog', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  cursor: pointer;
}
.select_dialog {
  .card_img {
    width: 100%;
    padding-bottom: 138%;
    height: 0;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .card_info {
    height: 3rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    span {
      white-space: normal;
      width: 90%;
      color: #551a8b;
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
}
.select_dialog {
  .el-checkbox-group {
    display: flex;
    flex-wrap: wrap;
    .el-checkbox {
      width: 20%;
    }
  }
}
.no_data {
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: xx-large;
    color: 666666;
    opacity: 0.5;
  }
}
</style>

<style lang="scss">
.check_list {
  .el-checkbox {
    margin: 18px;
    .el-checkbox__input {
      position: absolute;
      right: 15px;
      bottom: 33px;
      .el-checkbox__inner {
        border: 2px solid #dcdfe6;
        border-radius: 50%;
        width: 20px;
        height: 20px;
      }
      .el-checkbox__inner::after {
        height: 12px;
        left: 6px;
        font-weight: 600;
      }
    }
    .el-checkbox__label {
      width: 100%;
      padding-left: 0;
    }
  }
}

@media (max-width: 800px) {
  .select_dialog {
    .el-checkbox-group {
      .el-checkbox {
        width: 25% !important;
      }
    }
  }
}

@media (max-width: 375px) {
  .select_dialog {
    .el-checkbox-group {
      .el-checkbox {
        width: 100% !important;
      }
    }
  }
}
</style>