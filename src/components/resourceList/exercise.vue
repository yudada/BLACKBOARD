<template>
  <div style="padding: 20px">
    <el-row :gutter="20">
          <el-col :span="6">
            <el-input placeholder="题目搜索" v-model="queTitle">
              <el-button slot="append" icon="el-icon-search" @click="getExerciseList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-select v-model="queType" placeholder="题型筛选" @change="getExerciseList" clearable>
              <el-option v-for="item in queTypeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="quePracticeSubject" placeholder="练习对象筛选" @change="getExerciseList" clearable>
              <el-option v-for="(item, index) in quePracticeSubjectList" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
    <el-table ref="multipleTable" :data="exerciseList" style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange">
      <el-table-column type="selection" label="全选" width="55"></el-table-column>
      <el-table-column prop="queTitle" label="题目" width="300">
      </el-table-column>
      <el-table-column label="提纲">
        <template slot-scope="scope">
          <span v-if="scope.row.queSubjectType === 1">练习题</span>
          <span v-if="scope.row.queSubjectType === 2">自检题</span>
          <span v-if="scope.row.queSubjectType === 3">历年考题</span>
        </template>
      </el-table-column>
      <el-table-column prop="queType" label="题型">
        <template slot-scope="scope">
          <span v-if="scope.row.queType === 1">判断</span>
          <span v-if="scope.row.queType === 2">单选</span>
          <span v-if="scope.row.queType === 3">多选</span>
          <span v-if="scope.row.queType === 4">填空</span>
          <span v-if="scope.row.queType === 5">主观</span>
        </template>
      </el-table-column>
      <el-table-column prop="quePracticeSubject" label="练题对象">
      </el-table-column>
      <el-table-column prop="queKnowledge" label="知识点">
      </el-table-column>
    </el-table>
    <el-pagination
      :hide-on-single-page="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 40, 100]"
      :page-size="40"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <span class="footer" v-show="!hidenBtn">
      <el-button type="primary" @click="sendContentID">确 定</el-button>
    </span>
  </div>
</template>
<script>
export default {
  props: ['hidenBtn'],
  data() {
    return {
      // 分页
      currentPage: 1,
      pageSize: 40,
      total: 0,
      //
      sendMsg: {
        contentId: [],
        contentDialogVisible: false,
      },
      exerciseList: [],
      loading: true,
      allModels: [],
      queTitle: '',
      queType: '',
      queTypeList: [
        { value: 1, label: "判断" },
        { value: 2, label: "单选" },
        { value: 3, label: "多选" },
        { value: 4, label: "填空" },
        { value: 5, label: "主观" },
      ],
      quePracticeSubject: '',
      quePracticeSubjectList: [],
    };
  },
  created() {
    this.getQuePracticeSubjec();
    this.getExerciseList();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getExerciseList()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getExerciseList();
    },
    // 练习对象列表
    async getQuePracticeSubjec() {
      const { data: res } = await this.$http.get(`api/common/constant`)
      const {periodArr} =res.data;
      this.quePracticeSubjectList = Object.values(periodArr)
    },
    // 获取题库列表
    async getExerciseList() {
      
      this.sendMsg.contentId = [];
      const { data: res } = await this.$http.get(`api/library/lists`, { params: {
        limit: this.pageSize,
        page: this.currentPage,
        queTitle: this.queTitle,
        queType: this.queType,
        quePracticeSubject: this.quePracticeSubject
      }});
      if (res.statusCode !== 200) return this.$message.error(res.msg);
      this.exerciseList = res.data.data;

      this.total = res.data.total;
      this.pageSize = res.data.per_page;
      this.currentPage = res.data.current_page;
      this.loading = false
    },
    // 发送内容
    sendContentID() {
      this.$emit("func", this.sendMsg);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.sendMsg.contentId = [];
      val.forEach(item=>{
        this.sendMsg.contentId.push(item.id)
      })
      console.log(this.sendMsg.contentId);
    }
  },
};
</script>

<style lang="scss" scoped>
.el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  .el-checkbox {
    width: 20%;
    margin: 1rem;
    .checknox_content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.5rem;
      img {
        width: 100%;
      }
    }
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
}
</style>

<style lang="scss">
.check_list {
  .el-checkbox {
    .el-checkbox__input {
      position: absolute !important;
      right: 1px !important;
      top: 1px !important;
      .el-checkbox__inner {
        border: 2px solid #DCDFE6;
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
</style>