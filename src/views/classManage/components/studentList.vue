<template>
  <div>
    <el-input
      placeholder="请输入内容"
      v-model="queryInfo.stuName"
      clearable
      @clear="getStudentList"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="getStudentList"
      />
    </el-input>
    <el-card>
      <div slot="header">
        <span>全班</span>
      </div>
      <el-table
        ref="multipleTable"
        :data="studentData"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading"
        stripe
        border
      >
        <el-table-column type="index" label="序号" width="50px" align="center" />
        <el-table-column width="70">
          <template slot-scope="scope">
            <div class="avater_student">
              <img
                v-if="scope.row.photo"
                :src="scope.row.photo"
                :onerror="defaultPic"
              />
              <img v-else src="@/assets/def_avater.jpg" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="stuName" />
        <el-table-column label="阅读" prop="time" :formatter="formatterCellval" />
        <el-table-column
          label="练习"
          prop="exercise"
          :formatter="formatterCellval"
        />
        <el-table-column
          label="本周奖评"
          prop="appraise"
          :formatter="formatterCellval"
        />
      </el-table>
      <el-pagination
        style="padding: 10px 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 60, 80, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </el-card>
  </div>
</template>

<script>
import { nowStudents } from '@/api/classManage'
export default {
  props:['classInfo'],
  data() {
    return {
      studentData: [],
      queryInfo: {
        stuName: '',
        limit: 20
      },
      currentPage: 1,
      pageSize: 20,
      total: 0,
      loading: true,
      defaultPic: 'this.src="' + require('@/assets/def_avater.jpg') + '"',
    }
  },
  created() {
    this.getStudentList()
  },
  methods: {
    // 获取学生列表
    async getStudentList() {
      this.queryInfo.limit = this.pageSize;
      nowStudents(this.classInfo.class_id,this.queryInfo).then(res => {
        const { data } = res;
        this.studentData = data.data
        this.total = data.total
        this.currentPage = data.current_page
        this.pageSize = parseInt(data.per_page)
        this.loading = false
      })
    },
    // 分页
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getStudentList()
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getStudentList()
    },
    // 表格无数据显示占位符
    formatterCellval(row, column, cellValue, index) {
      if (!cellValue) {
        return '— —'
      } else {
        return cellValue
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-input {
  margin-bottom: 1rem;
}
.avater_student {
  width: 100%;
  padding-bottom: 100%;
  height: 0;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
  }
}
@media (max-width: 768px) {
  .adviser_card {
    display: flex;
    justify-content: space-around;
  }
}
</style>