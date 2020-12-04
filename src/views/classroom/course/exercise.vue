<template>
  <el-card>
    <div slot="header">
      <span>课堂练习</span>
    </div>
    <div class="content_box">
      <el-select v-model="book" placeholder="请选择课本"  @change="getbookInfo(book)">
        <el-option v-for="item in bookList" :key="item.id" :label="item.bookName + item.subName" :value="item.id"></el-option>
      </el-select>
      <el-table
        ref="bookDirRef"
        :data="bookDir"
        style="width: 100%"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'child', hasChildren: 'hasChildren'}">
        <el-table-column width="55">
          <template #header>
            <el-checkbox
            v-model="checkAll"
            @change="toggleAllSeclection">
            </el-checkbox>
          </template>
          <template #default='{row}'>
            <el-checkbox v-model="row.isChecked"
            @change="toggleSelection(row)"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="目录" prop="dirName">
        </el-table-column>
        <el-table-column label="页码" prop="pageNum" width="55">
        </el-table-column>
        <el-table-column label="模型数量" prop="modelNum" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="openModel(scope.row)">{{scope.row.modelNum}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn_table">
        <el-button @click="onSubmit" class="cn_btn">立即发布</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      book:'',
      bookList: [],
      bookInfo: {},
      bookDir: [],
      checkAll: false,
      queKnowledge: []
    };
  },
  created() {
    this.getbookList();
  },
  methods: {// 获取课本列表
    async getbookList() {
      const { data: res } = await this.$http.get('api/textbook/lists')
      if (res.statusCode !== 200) return this.$messsage.error('获取课本列表失败！')
      this.bookList = res.data;
      
      this.book = res.data[0].id
      this.getbookInfo();
    },
    // 获取课本信息
    async getbookInfo() {
      const bookId = this.book
      const { data: res } = await this.$http.get(`api/textbook/${bookId}`, { params: {type: 1}});
      if (res.statusCode !== 200) return this.$message.error(res.msg);
      this.bookInfo = res.data;

      this.bookDir = this.setChecked(res.data.textbook_dir)
      console.log(this.bookDir);
    },
    // 数据初始化
    setChecked(bookDir, checked = false) {
      const result = bookDir.map(item=>{
        const { child = [] } = item;
        return {
          ...item,
          isChecked: checked,
          child: this.setChecked(child, checked )
        }
      })
      return result
    },
    // 全选
    toggleAllSeclection() {
      const { checkAll, bookDir } = this;
      this.bookDir = this.setChecked(bookDir, checkAll);
      const father = [];
      const children = [];
      this.bookDir.map(item=>{
        if(item.isChecked == true) {
          father.push(item.id)
        }
      });
      for(let item of this.bookDir) {
        item.child.map(childItem=> {
          if(childItem.isChecked ==true) {
            children.push(childItem.id)
          }
        })
      }
      this.queKnowledge = [...father,...children];
      console.log(this.queKnowledge);
    },
    // 选择
    toggleSelection(row) {
      this.queKnowledge = [];
      const { child = [], isChecked } = row;
      if(child.length) {
        row.child.forEach(item=> {
          item.isChecked = isChecked;
        });
      } else {
        const { bookDir } = this;
        for(let item of bookDir){
          if(item.id === row.parent_id){
            const checked = item.child.filter(childItem => childItem.isChecked);
            const checkedCount = checked.length;
            item.isChecked = checkedCount > 0;
            break;
          }
        }
      };
      const { bookDir } = this;
      const father = [];
      const children = [];
      bookDir.map(item=>{
        if(item.isChecked == true) {
          father.push(item.id)
        }
      });
      for(let item of bookDir) {
        item.child.map(childItem=> {
          if(childItem.isChecked == true) {
            children.push(childItem.id)
          }
        })
      }
      this.queKnowledge = [...father,...children];
      console.log(this.queKnowledge);

      const checked = bookDir.filter(item=> item.isChecked)
      if( bookDir.length === checked.length) {
        this.checkAll = true;
        return
      }
      return this.checkAll = false;
    },
    openModel(row) {
      console.log(row);
      this.$router.push({ path: "/models-detail", query: { 
        textbook_id: row.textbook_id,
        dir_id: row.id
        } });
    },
    // 发布课堂作业
    async onSubmit() {
      const { data:res } = await this.$http.post(`api/exercises/classExercise`, {
        textbook_id: this.bookDir[0].textbook_id,
        model_ids: this.queKnowledge
      })
      if(res.statusCode !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
    }
  },
};
</script>

<style lang="scss" scoped>
  .btn_table{
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
</style>
<style lang="scss">
  .content_box {
    .el-table .cell {
    display: flex;
  }
}
</style>