<template>
  <div class="progress_main">
    <Breadcrumb :navData="navData" />

    <div class="progress_concent">
      <el-row :gutter="20">
        <el-col :span="12">
          <work-statistics-list
            :statisticsList="accuracyList"
            :startTime="startTime"
            :endTime="endTime"
            :title="'答题统计'"
            @func="fromSun"
          />
        </el-col>
        <el-col :span="12">
          <work-statistics-list
            :statisticsList="errorList"
            :startTime="startTime"
            :endTime="endTime"
            :title="'错题统计'"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { workStatistics } from '@/api/classManage'
import workStatisticsList from './components/workStatisticsList.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { workStatisticsList, Breadcrumb },
  data() {
    return {
      navData: {
        title: '班级管理',
        childTitle: '作业统计'
      },
      accuracyList: [],
      errorList: [],
      endTime: '',
      startTime: ''
    }
  },
  created() {
    this.getWorkStatisticsList()
  },
  methods: {
    getWorkStatisticsList() {
      const params = {
        endTime: this.endTime,
        startTime: this.startTime
      }
      workStatistics(params).then((res) => {
        console.log(res);
        const { accuracy_student, error_student, endTime, startTime } = res.data
        this.accuracyList = accuracy_student
        this.errorList = error_student
        this.startTime = startTime
        this.endTime = endTime
      })
    },
    fromSun(data) {
      console.log(data);
      this.startTime = data.startTime
      this.endTime = data.endTime
      this.getWorkStatisticsList()
      // this.$nextTick(() => {
      //   this.$message.success('')
      // })
    }
  },
}
</script>