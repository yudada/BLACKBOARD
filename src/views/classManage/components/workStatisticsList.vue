<template>
  <div class="work_pross">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
        <div v-if="title === '答题统计'">
          <div class="header-time">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="startTime"
              type="date"
              placeholder="选择开始时间"
              @change="handleChange"
            />
            ~
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="endTime"
              type="date"
              placeholder="选择结束时间"
              @change="handleChange"
            />
          </div>
        </div>
      </div>
      <div v-for="item in statisticsList" :key="item.id" class="card_pro">
        <p @click="openDialog(item)">{{ item.stuName }}</p>
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="item.accuracy"
          :color="customColors"
        />
      </div>
    </el-card>
    <!-- 个人成绩统计 -->
    <el-dialog
      :title="dilaogTitle"
      :visible.sync="dialogVisible"
      top="15vh"
      width="50%"
      :append-to-body="true"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div v-if="someOneStatisticsList.length > 0">
        <div
          v-for="(item, index) in someOneStatisticsList"
          :key="index + item.accuracy"
        >
          <div class="someOne">
            <span>{{ item.dateTime }}</span>
            <el-progress
              :text-inside="true"
              :stroke-width="20"
              :percentage="item.accuracy"
              :color="customColors"
            />
          </div>
        </div>
      </div>
      <div v-else class="no-data">
        <span>暂无数据</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { studentStatistic, workStatistics } from '@/api/classManage'
export default {
  props: ['statisticsList', 'title'],
  data() {
    return {
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
      ],
      dialogVisible: false,
      dilaogTitle: '个人成绩统计',
      someOneStatisticsList: [],
      startTime: '',
      endTime: '',
      startT: '',
      endT: '',
    }
  },
  created() {
    this.getWorkStatisticsList()
  },
  methods: {
    async openDialog(item) {
      console.log(item)
      this.dilaogTitle = item.stuName + '个人答题统计'
      const params = {
        sid: item.sid,
        startTime: this.startT,
        endTime: this.endT,
      }
      await studentStatistic(params).then((res) => {
        console.log(res)
        const { statistic, endTime, startTime } = res.data
        this.someOneStatisticsList = statistic
        this.startT = startTime
        this.endT = endTime
      })
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    getWorkStatisticsList() {
      workStatistics().then((res) => {
        const { endTime, startTime } = res.data
        this.startTime = startTime
        this.endTime = endTime
      })
    },
    handleChange(value) {
      if (this.startTime !== value || this.endTime !== value) {
        const params = {
          endTime: this.endTime,
          startTime: this.startTime,
        }
        this.$emit('func', params)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card_pro {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 6px 0 6px 0 !important;
    width: 8rem;
    text-align: left;
    cursor: pointer;
  }
}
.el-progress {
  width: 90%;
  .el-progress-bar__inner,
  .el-progress-bar__outer {
    border-radius: o !important;
  }
}
.clearfix {
  display: flex;
  justify-content: space-between;
}
.header-time {
  .el-date-editor {
    width: 150px;
  }
}
.someOne {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  span {
    width: 100px;
  }
}
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  span {
    font-size: xx-large;
    color: #666666;
    opacity: 0.5;
  }
}
</style>

<style lang="scss">
.work_pross {
  .el-progress {
    .el-progress-bar__inner,
    .el-progress-bar__outer {
      border-radius: 0 !important;
    }
  }
}
</style>