<template>
  <div>
    <div class="content_dialog">
      <el-select
        clearable
        v-model="book"
        placeholder="请选择课本"
        @change="getbookInfo"
      >
        <el-option
          v-for="item in bookList"
          :key="item.id"
          :label="item.bookName + item.subName"
          :value="item.id"
        />
      </el-select>
      <el-table
        ref="bookDirRef"
        :data="bookDir"
        style="width: 100%"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'child', hasChildren: 'hasChildren' }"
      >
        <el-table-column width="55">
          <template #header>
            <el-checkbox v-model="checkAll" @change="toggleAllSeclection">
            </el-checkbox>
          </template>
          <template #default="{ row }">
            <el-checkbox
              v-model="row.isChecked"
              @change="toggleSelection(row)"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="目录" prop="dirName" />
        <el-table-column label="页码" prop="pageNum" width="55" />
      </el-table>
    </div>
    <span class="dialog-footer">
      <el-button class="cn_btn" @click="sendContent">确 定</el-button>
    </span>
  </div>
</template>

<script>
export default {
  props: ['bookId', 'selecdId'],
  data() {
    return {
      bookList: [],
      bookInfo: {},
      bookDir: [],
      checkAll: false,
      sendMsg: [],
      book: ''
    }
  },
  created() {
    this.getbookList()
    if(this.bookId) {
      this.book = this.bookId
      this.getbookInfo()
    }
  },
  methods: {
    // 获取课本列表
    async getbookList() {
      const { data: res } = await this.$http.get('api/textbook/lists')
      if (res.statusCode !== 200)
        return this.$messsage.error('获取课本列表失败！')
      this.bookList = res.data
    },
    // 获取课本信息
    async getbookInfo() {
      const bookId = this.book
      const { data: res } = await this.$http.get(`api/textbook/${bookId}`)
      if (res.statusCode !== 200) return this.$message.error(res.msg)
      this.bookInfo = res.data
      this.bookDir = this.setChecked(res.data.textbook_dir)
      if(this.selecdId) {
        const selecdId = this.selecdId
        const bookDir = this.bookDir
        bookDir.map(item=>{
          selecdId.map(item2=>{
            if(item2 === item.id) {
              item.isChecked = true
            }
          })
        })
        for (let item of bookDir) {
        item.child.map((childItem) => {
          selecdId.map(item2=>{
            if(item2 ===childItem.id) {
              childItem.isChecked = true
            }
          })
        })
      }
      }
    },
    // 数据初始化
    setChecked(bookDir, checked = false) {
      const result = bookDir.map((item) => {
        const { child = [] } = item
        return {
          ...item,
          isChecked: checked,
          child: this.setChecked(child, checked),
        }
      })
      return result
    },
    // 全选
    toggleAllSeclection() {
      const { checkAll, bookDir } = this
      this.bookDir = this.setChecked(bookDir, checkAll)
      const father = []
      const children = []
      this.bookDir.map((item) => {
        if (item.isChecked == true) {
          father.push(item.id)
        }
      })
      for (let item of this.bookDir) {
        item.child.map((childItem) => {
          if (childItem.isChecked == true) {
            children.push(childItem.id)
          }
        })
      }
      this.sendMsg = [...father, ...children]
    },
    // 选择
    toggleSelection(row) {
      this.sendMsg = []
      const { child = [], isChecked } = row
      if (child.length) {
        row.child.forEach((item) => {
          item.isChecked = isChecked
        })
      } else {
        const { bookDir } = this
        for (let item of bookDir) {
          if (item.id === row.parent_id) {
            const checked = item.child.filter(
              (childItem) => childItem.isChecked
            )
            const checkedCount = checked.length
            item.isChecked = checkedCount > 0
            break
          }
        }
      }
      const { bookDir } = this
      const father = []
      const children = []
      bookDir.map((item) => {
        if (item.isChecked == true) {
          father.push(item.id)
        }
      })
      for (let item of bookDir) {
        item.child.map((childItem) => {
          if (childItem.isChecked == true) {
            children.push(childItem.id)
          }
        })
      }
      this.sendMsg = [...father, ...children]
      const checked = bookDir.filter((item) => item.isChecked)
      if (bookDir.length === checked.length) {
        this.checkAll = true
        return
      }
      return (this.checkAll = false)
    },
    sendContent() {
      this.$emit('func', this.sendMsg)
    },
  },
}
</script>

<style lang="scss" scoped>
.content_dialog {
  .el-table .cell {
    display: flex;
  }
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  button {
    margin-top: 1rem;
  }
}
</style>