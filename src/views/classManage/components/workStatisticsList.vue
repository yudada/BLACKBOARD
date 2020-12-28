<template>
  <div class="work_pross">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
        <div>
          <span>开始时间: {{ startTime }} </span>
          <span> 结束时间: {{ endTime }}</span>
        </div>
      </div>
      <div v-for="item in statisticsList" :key="item.id" class="card_pro">
        <p>{{ item.stuName }}</p>
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="item.accuracy"
          :color="customColors"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['statisticsList', 'startTime', 'endTime', 'title'],
  data() {
    return {
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
      ],
    }
  },
  methods: {},
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