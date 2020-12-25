<template>
  <div class="select_dialog">
    <el-select v-model="classId" placeholder="请选择班级" @change="getBookList">
      <el-option
        v-for="item in classList"
        :key="item.class_id"
        :label="item.className"
        :value="item.class_id"
      >
      </el-option>
    </el-select>
    <div v-if="bookList.length">
      <el-checkbox-group v-model="wisdomBookId" class="check_list">
        <el-checkbox v-for="item in bookList" :key="item.id" :label="item.id">
          <el-card shadow="never" :body-style="{ padding: 0 }">
            <div class="card_img">
              <img
                v-if="item.bookImg !== null"
                :src="item.bookImg"
                :onerror="defaultPic"
              />
              <img v-else src="@/assets/book/七年级生物.jpg" />
            </div>
            <div class="card_info">
              <a href="#"
                ><strong>{{ item.bookName }}</strong>
                {{ item.subName }}</a
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
    this.getClassList()
  },
  methods: {
    async getBookList() {
      const { data: res } = await this.$http.get(`api/textbook/choose`)
      this.bookList = res.data
      console.log(this.bookList);
    },
    async getClassList() {
      const { data: res } = await this.$http.get(`api/classroom/select`)
      console.log(res);
      this.classList = res.data
      this.classId = this.classList[0].class_id
      console.log(this.classList)

      this.getBookList()
    },
    closeDialog() {
      this.$emit('closeDialog', false)
    },
    async addWisdomBook() {
      console.log(this.classId, this.wisdomBookId)
      const { data: res } = await this.$http.post(`api/textbook/store`, {
        class_id: this.classId,
        textbook_ids: this.wisdomBookId,
      })
      if (res.statusCode !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.closeDialog()
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
    margin: 20px;
    .el-checkbox__input {
      position: absolute;
      right: 15px;
      bottom: 18px;
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
  }
}

@media (max-width: 1280px) {
  .check_list {
    .el-checkbox__input {
      top: 5px !important;
      right: 5px !important;
    }
  }
}
</style>