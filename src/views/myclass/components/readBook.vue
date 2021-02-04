<template>
  <div style="height: 100%;">
    <el-card class="read-book">
      <div slot="header">
        <div>阅读课本</div>
      </div>
      <div
        v-for="(subject, index) in subjectList"
        :key="index"
        :style="{ margin: '1.5rem' }"
      >
        <div class="subject_info">
          <span>{{ subject.name }}</span>
          <span>{{ subject.percentage }}%</span>
        </div>
        <el-progress
          :show-text="false"
          :percentage="subject.percentage"
          :status="subject.status"
          :style="{ width: '100%' }"
        ></el-progress>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjectList: [
        { name: '生物', percentage: 70, status: 'success' },
        { name: '语文', percentage: 84, status: 'success' },
        { name: '地理', percentage: 43, status: 'warning' },
        { name: '英语', percentage: 34, status: 'exception' },
        { name: '数学', percentage: 34, status: 'exception' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.subject_info {
  display: flex;
  justify-content: space-between;
  span:nth-child(1) {
    color: #636262;
    font-size: 1rem;
  }
  span:nth-child(2) {
    color: #707070;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.read-book {
  height: 100%;
  .el-card__body {
    height: calc(100% - 100px);
    overflow: scroll;
  }
}
</style>