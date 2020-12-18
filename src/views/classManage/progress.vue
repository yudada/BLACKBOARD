<template>
  <div class="progress_main">
    <div class="main_header">
      <h4>作业统计</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">班级管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>作业统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="progress_concent">
      <el-row :gutter="20">
        <!-- 答题统计 -->
        <el-col :span="12">
          <work-statistics-list
            :statisticsList="accuracyList"
            :startTime="startTime"
            :endTime="endTime"
          />
        </el-col>
        <!-- 错题统计 -->
        <el-col :span="12">
          <work-statistics-list
            :statisticsList="errorList"
            :startTime="startTime"
            :endTime="endTime"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { workStatistics } from '@/api/classManage'
import workStatisticsList from './components/workStatisticsList.vue'
export default {
  components: { workStatisticsList },
  data() {
    return {
      accuracyList: [],
      errorList: [],
      endTime: '',
      startTime: '',
    }
  },
  created() {
    this.getWorkStatisticsList()
  },
  methods: {
    getWorkStatisticsList() {
      workStatistics().then((res) => {
        const { data } = res
        const { accuracy_student, error_student, endTime, startTime } = res.data
        this.accuracyList = accuracy_student
        this.errorList = error_student
        this.startTime = startTime
        this.endTime = endTime
        console.log(this.errorList)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>