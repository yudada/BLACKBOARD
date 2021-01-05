<template>
  <div>
    <el-card>
      <div slot="header">
        <span>课件列表</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="addCourse"
          >添加课件</el-button
        >
      </div>
      <el-table :data="courseData" style="width: 100%" stripe border>
        <el-table-column
          type="index"
          label="序号"
          width="50px"
          align="center"
        />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="is_share" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.is_share === 1">共享</span>
            <span v-if="scope.row.is_share === 2">私有</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="openDetail(scope.row.id)"
              >查看</el-button
            >
            <el-button type="text" @click="editCourse(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="text"
              @click="deleteCourse(scope.row.id)"
              class="delete_btn"
              >删除</el-button
            >
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
    <!-- 打分模块 -->
    <div class="classroom_mark">
      <div class="mark_btn">
        <el-button @click="goExercise">课后练习</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { courseWareList, deleteCourseWare } from '@/api/classRoom.js'
export default {
  data() {
    return {
      courseData: [],
      total: 0,
      currentPage: 1,
      pageSize: 20,
    }
  },
  created() {
    this.getcourseWareList()
  },
  methods: {
    getcourseWareList() {
      const pageInfo = {
        limit: this.pageSize,
        page: this.currentPage,
      }
      courseWareList(pageInfo).then((res) => {
        const { current_page, data, per_page, total } = res.data

        this.courseData = data
        this.total = total
        this.currentPage = current_page
        this.pageSize = parseFloat(per_page)
      })
    },
    goExercise() {
      this.$router.push('/exercise').catch((err) => {
        console.log('err')
      })
    },
    editCourse(id) {
      this.$router.push({ path: '/create-courseware', query: { id: id } })
    },
    async deleteCourse(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该课件, 是否继续?',
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
      deleteCourseWare(id).then((res) => {
        this.$message.success(res.msg)
        this.getcourseWareList()
      })
    },
    openDetail(id) {
      this.$router.push({ path: '/course-detail', query: { id: id } })
    },
    addCourse() {
      this.$router.push('/create-courseware')
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.getcourseWareList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getcourseWareList()
    },
  },
}
</script>

<style lang="scss" scoped>
.classroom_mark {
  position: fixed;
  right: 0;
  top: 80%;
  .mark_btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 5rem;
      height: 5rem;
      margin: 0.5rem;
      border: none;
      color: #fff;
      background: linear-gradient(to bottom right, #9853af, #623aa2) !important;
    }
  }
}
</style>