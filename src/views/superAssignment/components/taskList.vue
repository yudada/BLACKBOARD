<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <div slot="header" v-if="makeType">
          <span>课堂练习列表</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="goBack"
          >
            返回
          </el-button>
        </div>
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
          <el-table-column prop="exeTitle" label="作业名称" min-width="30%" />
          <el-table-column prop="bookName" label="科目" min-width="10%" />
          <el-table-column prop="className" label="班级" min-width="10%" v-if="!makeType" />
          <el-table-column prop="exeType" label="作业类型" min-width="10%" v-if="makeType" :formatter="formatterValue" />
          <el-table-column prop="exeStartTime" label="开始时间" min-width="15%" />
          <el-table-column prop="exeEndTime" label="结束时间" min-width="15%" />
          <el-table-column
            prop="status"
            label="状态"
            :formatter="formatterFunc"
             min-width="10%"
          />
          <el-table-column label="完成情况"  min-width="10%">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="taskPage(scope.row.id)"
              >查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作"  min-width="15%">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status === 1"
                type="text"
                @click="taskDetailPage(scope.row.id)"
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
import { exercisesList, deleteExercises } from '@/api/superAssignment'
export default {
  props: ['type', 'makeType'],
  data() {
    return {
      query: '',
      currentPage: 1,
      pagesize: 20,
      total: 1,
      exercisesList: [],
      loading: true,
      queTitle: '',
      params: {
        limit: '',
        page: '',
        type: '',
      },
    }
  },
  created() {
    this.getExercisesList()
  },
  methods: {
    taskPage(id) {
      if(this.$route.path === '/exercise-list') {
        this.$router.push({ path: '/exercise-detail', query: { id: id,tip: 'classExe' } })
      } else {
        this.$router.push({ path: '/task-detial', query: { id: id } })
      }
    },
    async getExercisesList() {
      this.params.limit = this.pagesize
      this.params.page = this.currentPage
      this.params.type = this.type
      if (this.makeType) {
        this.params = {
          limit: this.pagesize,
          page: this.currentPage,
          makeType: this.makeType,
        }
      }
      exercisesList(this.params).then((res) => {
        const { current_page, data, per_page, total } = res.data
        this.exercisesList = data
        this.currentPage = current_page
        this.pagesize = parseFloat(per_page)
        this.total = total
        this.loading = false
      })
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
      deleteExercises(id).then((res) => {
        this.$message.success('删除成功！')
        this.getExercisesList()
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    formatterFunc(row, column, cellValue, index) {
      if (cellValue === 1) return '已发布'
      if (cellValue === 2) return '草稿'
    },
    taskDetailPage(id) {
      if(this.$route.path === '/exercise-list') {
        this.$router.push({ path: '/class-exercise-detail', query: { id: id,tip: 'classExe' } })
      } else {
        this.$router.push({ path: '/superAssignment/class-exercise-detail', query: { id: id } })
      }
    },
    formatterValue(row, column, cellValue, index) {
      if (cellValue === 1) return 'VR模型控索'
      if (cellValue === 2) return '智慧课本阅读'
      if (cellValue === 3) return '精选题库练习'
      if (cellValue === 4) return '仿真实验'
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