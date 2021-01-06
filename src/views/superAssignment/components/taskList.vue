<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <!-- <el-col :span="6">
          <el-input placeholder="题目搜索" v-model="queTitle">
            <el-button slot="append" icon="el-icon-search" @click="getExercisesList"></el-button>
          </el-input>
        </el-col> -->
        <el-table
          :data="exercisesList"
          style="width: 100%"
          stripe
          border
          v-loading="loading"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50px"
            align="center"
          />
          <el-table-column prop="exeTitle" label="作业名称" width="350" />
          <el-table-column prop="bookName" label="科目" />
          <el-table-column prop="className" label="班级" />
          <el-table-column prop="exeStartTime" label="开始时间" />
          <el-table-column prop="exeEndTime" label="结束时间" />
          <el-table-column prop="exeStatus" label="状态" />
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status === 1"
                type="text"
                @click="taskPage(scope.row.id)"
              >
                查看
              </el-button>
              <el-button
                v-if="scope.row.status === 2"
                type="text"
                @click="editById(scope.row.id)"
              >
                编辑
              </el-button>
              <el-button
                v-if="scope.row.status === 2"
                type="text"
                @click="removeById(scope.row.id)"
                class="delete_btn"
              >
                删除
              </el-button>
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
          :total="total"
        >
        </el-pagination>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ['type'],
  data() {
    return {
      query: '',
      currentPage: 1,
      pagesize: 20,
      total: 1,
      exercisesList: [],
      loading: true,
      queTitle: '',
    }
  },
  created() {
    this.getExercisesList()
  },
  methods: {
    taskPage(id) {
      this.$router.push({ path: '/taskDetial', query: { id: id } })
    },
    async getExercisesList() {
      const { data: res } = await this.$http.get(`api/exercises/lists`, {
        params: {
          limit: this.pagesize,
          page: this.currentPage,
          type: this.type,
        },
      })
      if (res.statusCode !== 200)
        return this.$message.error('获取作业列表失败！')
      console.log(res.data)
      this.exercisesList = res.data.data

      this.currentPage = res.data.current_page
      this.pagesize = parseFloat(res.data.per_page)
      this.total = res.data.total
      this.loading = false
    },
    handleSizeChange(newSize) {
      this.pagesize = newSize
      this.getExercisesList()
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getExercisesList()
    },
    editById(id) {
      this.$router.push({ path: '/publish', query: { id: id } })
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该作业, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)

      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.delete(`api/exercises/${id}`)
      if (res.statusCode !== 200) return this.$message.error(res.msg)
      this.$message.success('删除成功！')
      this.getExercisesList()
    },
  },
}
</script>

<style lang="scss" scoped>
.delete_btn {
  color: #e22018;
  padding-left: 10px;
}
</style>