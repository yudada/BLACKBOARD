<template>
  <div style="height: 100%;">
    <el-card class="acc-top">
      <div slot="header">
        <div>答题准确率TOP5</div>
      </div>
      <div v-for="item in accuracyList" :key="item.id">
        <div class="accuracy_card">
          <div class="accuracy_name">
            <span>{{ item.name }}</span>
            <span>{{ item.accuracy }}</span>
          </div>
          <h4 :style="{ color: item.color }">TOP{{ item.top }}</h4>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accuracyList: [
        {
          name: '李志军',
          accuracy: '答题110套，正确率100%',
          top: '01',
          color: '#6b3e9e',
        },
        {
          name: '岳杰豪',
          accuracy: '答题108套，正确率100%',
          top: '02',
          color: '#4ecc48',
        },
        {
          name: '罗伯特',
          accuracy: '答题106套，正确率99%',
          top: '03',
          color: '#ecb403',
        },
        {
          name: '毛新民',
          accuracy: '答题100套，正确率99%',
          top: '04',
          color: '#f66b4e',
        },
        {
          name: '陈道明',
          accuracy: '答题100套，正确率98%',
          top: '05',
          color: '#f66b4b ',
        },
      ],
      
    }
  },
}
</script>

<style lang="scss" scoped>
.accuracy_card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
  .accuracy_name {
    display: flex;
    flex-direction: column;
    span:nth-child(1) {
      color: #636262;
      font-size: 16px;
      font-weight: 600;
    }
    span:nth-child(2) {
      color: #636262;
      font-size: 14px;
    }
  }
}
</style>

<style lang="scss">
.acc-top {
  height: 100%;
  .el-card__body {
    height: calc(100% - 100px);
    overflow: overlay;
  }
}
</style>