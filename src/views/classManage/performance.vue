<template>
  <div class="performance_main">
    <Breadcrumb :navData="navData" />

    <div class="performance_concent">
      <el-row>
        <el-col :span="24">
          <el-card shadow="always">
            <el-table :data="performanceData" style="width: 100%" v-loading="loading">
              <el-table-column prop="examTitle" label="考试名称" :formatter="formatterCellval">
              </el-table-column>
              <el-table-column prop="className" label="班级" :formatter="formatterCellval">
              </el-table-column>
              <el-table-column prop="examSubject" label="科目" :formatter="formatterCellval">
              </el-table-column>
              <el-table-column prop="examTime" label="考试时间" :formatter="formatterCellval">
              </el-table-column>
              <el-table-column prop="examPersonNum" label="考试人数" :formatter="formatterCellval">
              </el-table-column>
              <el-table-column prop="fullPoints" label="单科满分" :formatter="formatterCellval">
              </el-table-column>
              <el-table-column prop="avgPoints" label="平均分" :formatter="formatterCellval">
              </el-table-column>
              <el-table-column prop="created_at" label="上传时间" :formatter="formatterCellval">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="openDetail(scope.row.id)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        childTitle: '成绩报告',
        goTo: '发布成绩',
        path: '/reportPerformance'
      },
      performanceData: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      loading: true
    };
  },
  created() {
    this.getPerformance()
  },
  methods: {
    // 获取成绩报告
    async getPerformance() {
      const { data: res } = await this.$http.post(`api/classroom/achievement`, { limit:this.pageSize})
      console.log(res);
      if (res.statusCode !== 200) return this.$message.error('获取成绩报告失败！')
      this.performanceData = res.data.data
      this.total = res.data.total;
      this.pageSize = res.data.per_page
      this.currentPage = res.data.current_page
      this.loading = false
    },
    // 分页
    handleSizeChange(newSize) {
    this.pageSize = newSize
    this.getPerformance();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getPerformance();
    },
    // 成绩详情
    openDetail(id) {
      this.$router.push({path:'/perDetial',query: {id: id}})
    },
    // 表格无数据显示占位符
    formatterCellval(row, column, cellValue, index) {
      if (!Boolean(cellValue)) {
          return "— —";
      } else {
          return cellValue;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.el-pagination{
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
}
</style>