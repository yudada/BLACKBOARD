<template>
  <div style="padding: 20px">
    <div class="content_dialog">
      <el-table
        ref="bookDirRef"
        :data="bookDir"
        style="width: 100%"
        row-key="id"
        default-expand-all
        stripe
        border
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
        <el-table-column label="目录" prop="dirName"> </el-table-column>
        <el-table-column label="页码" prop="pageNum" width="55">
        </el-table-column>
      </el-table>
    </div>
    <span class="footer">
      <el-button type="primary" @click="sendContentID">确 定</el-button>
    </span>
  </div>
</template>
<script>
export default {
  props: ['bookId', 'contentId'],
  data() {
    return {
      sendMsg: {
        contentId: [],
        contentDialogVisible: false,
      },
      bookInfo: {},
      bookDir: [],
      checkAll: false,
    }
  },
  created() {
    this.isSelect()
  },
  methods: {
    isSelect() {
      if (this.bookId > 0) {
        this.getbookList()
      } else {
        this.$message.error('请先选择课本！')
      }
    },
    // 获取课本信息
    async getbookList() {
      const { data: res } = await this.$http.get(`api/textbook/${this.bookId}`)
      if (res.statusCode !== 200) return this.$message.error(res.msg)
      this.bookInfo = res.data
      this.bookDir = this.setChecked(res.data.textbook_dir)
      console.log(this.bookDir);
      if (this.contentId) {
        this.sendMsg.contentId = this.contentId
        console.log(this.sendMsg.contentId)
        this.bookDir.map(item=>{
          this.contentId.map(item2=>{
            if(item.id === item2) {
              item.isChecked = true
            }
          })
        })
        for (let item of this.bookDir) {
        item.child.map((childItem) => {
          this.contentId.map(item2=>{
            if(childItem.id === item2) {
              childItem.isChecked = true
            }
          })
        })
      }
      }
    },
    // 发送内容
    sendContentID() {
      this.$emit('func', this.sendMsg)
    },
    setChecked(tableData, checked = false) {
      const result = tableData.map((item) => {
        const { child = [] } = item
        return {
          ...item,
          isChecked: checked,
          child: this.setChecked(child, checked),
        }
      })
      return result
    },
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
      this.sendMsg.contentId = [...father, ...children]
      console.log((this.sendMsg.contentId = [...father, ...children]))
    },
    toggleSelection(row) {
      this.sendMsg.contentId = []
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
      this.sendMsg.contentId = [...father, ...children]

      const checked = bookDir.filter((item) => item.isChecked)
      if (bookDir.length === checked.length) {
        this.checkAll = true
        return
      }
      return (this.checkAll = false)
    },
  },
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: flex-end;
}
</style>
<style lang="scss">
.content_dialog {
  padding-bottom: 20px;
  .el-table .cell {
    display: flex;
  }
}
</style>