<template>
  <div class="mistakes_main">
    <div class="main_header">
      <h4>错题锦囊</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">超级作业</a></el-breadcrumb-item>
        <el-breadcrumb-item>错题锦囊</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="mistakes_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <el-table :data="exercisesList" style="width: 100%;" v-loading="loading">
              <el-table-column prop="exeTitle" label="作业名称" width="350">
              </el-table-column>
              <el-table-column prop="bookName" label="科目">
              </el-table-column>
              <el-table-column prop="className" label="班级">
              </el-table-column>
              <el-table-column prop="exeStartTime" label="开始时间">
              </el-table-column>
              <el-table-column prop="exeEndTime" label="结束时间">
              </el-table-column>
              <el-table-column prop="exeStatus" label="状态">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="taskPage(scope.row.id)">查看</el-button>
                  <el-button type="danger" size="mini" @click="removeById(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 40, 80, 100]"
            :page-size="pagesize"
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
export default {
  data() {
    return {
      query: '',
      currentPage: 1,
      pagesize: 20,
      total: 1,
      exercisesList: [],
      loading: true
    }
  },
  created() {
    this.getExercisesList();
  },
  methods: {
    taskPage(id) {
      this.$router.push({path:'/taskDetial',query: {id: id}})
    },
    async getExercisesList() {
      const { data: res } = await this.$http.get(`api/exercises/lists`, { params: {
        limit: this.pagesize,
        page: this.currentPage
      }})
      if (res.statusCode !== 200) return this.$message.error('获取作业列表失败！')
      console.log(res.data);
      this.exercisesList = res.data.data

      this.currentPage = res.data.current_page
      this.pagesize = parseFloat(res.data.per_page)
      this.total = res.data.total
      this.loading = false
    },
    handleSizeChange(newSize) {
      this.pagesize = newSize;
      this.getExercisesList();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.getExercisesList();
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该作业, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') {
        return 
      }
      const { data: res } = await this.$http.delete(`api/exercises/${id}`)
      if(res.statusCode !== 200) return this.$message.error(res.msg)
      this.getExercisesList();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
