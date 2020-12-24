<template>
  <el-row v-if="type">
    <el-col :span="24">
      <el-card>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input placeholder="题目搜索" v-model="queTitle">
              <el-button slot="append" icon="el-icon-search" @click="getQueList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-select v-model="queType" placeholder="题型筛选" @change="getQueList()" clearable>
              <el-option v-for="item in queTypeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="quePracticeSubject" placeholder="练习对象筛选" @change="getQueList()" clearable>
              <el-option v-for="(item, index) in quePracticeSubjectList" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-table :data="questionList" style="width: 100%" v-loading="loading">
          <el-table-column v-if="type === 3" prop="queYear" label="年份">
          </el-table-column>
          <el-table-column prop="queTitle" label="题目" width="300">
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
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1">显示</span>
              <span v-if="scope.row.status === 0">暂存</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="deit_box">
                <el-button type="text" @click="openDetail(scope.row.id)">查看</el-button>
                <el-button type="text" @click="editById(scope.row.id)" class="edit_btn">编辑</el-button>
                <div v-show="scope.row.status === 0">
                  <el-button type="text" @click="removeById(scope.row.id)" class="delete_btn">删除</el-button>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
    name: 'questionList',
    props: ['type'],
  data() {
    return {
      questionList: [],
      total: 0,
      currentPage: 1,
      pageSize: 20,
      pageData: [],
      loading: true,
      queTitle: '',
      queType: '',
      queYear: '',
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
    this.getQueList();
  },
  methods: {
    async getQuePracticeSubjec() {
      const { data: res } = await this.$http.get(`api/common/constant`)
      const {periodArr} =res.data;
      this.quePracticeSubjectList = Object.values(periodArr)
    },
    // 获取题库列表
    async getQueList() {
      const { data: res } = await this.$http.get("api/library/lists", {
        params: {
          limit: this.pageSize,
          page: this.currentPage,
          type: this.type,
          queTitle: this.queTitle,
          queType: this.queType,
          quePracticeSubject: this.quePracticeSubject,
        },
      });
      if (res.statusCode !== 200) return this.$message.error(res.msg);
      this.questionList = res.data.data;
      this.total = res.data.total;
      this.currentPage = res.data.current_page;

      this.loading = false;
    },
    openDetail(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该作业, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmResult !== "confirm") {
        return 
      }
      const { data: res } = await this.$http.delete(`api/library/${id}`);
      if (res.statusCode !== 200) return this.$message.error(res.msg);
      this.$message.success("删除成功！");
      this.getQueList();
    },
    editById(id) {
      this.$router.push({ path: "/que-edit", query: { id: id } });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getQueList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getQueList();
    }
  },
};
</script>

<style lang="scss" scoped>
.deit_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.edit_btn {
  padding-left: 10px;
}
</style>
