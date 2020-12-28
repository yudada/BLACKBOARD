<template>
  <div style="height: 100%;">
    <el-card class="read-top">
      <div slot="header">
        <div>阅读优秀TOP5</div>
      </div>
      <div
        v-for="(item, index) in readList"
        :key="index"
        :style="{ margin: '20px' }"
      >
        <div class="read_card">
          <div class="read_info">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <div class="read_name">
              <span>{{ item.name }}</span>
              <span>{{ item.readtime }}</span>
            </div>
          </div>
          <el-button class="read_btn">TOP{{ index + 1 }}</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      readList: [
        { name: '周冰雪', readtime: '阅读时长1403分钟' },
        { name: '周冰雪', readtime: '阅读时长1303分钟' },
        { name: '周冰雪', readtime: '阅读时长1301分钟' },
        { name: '周冰雪', readtime: '阅读时长1223分钟' },
        { name: '周冰雪', readtime: '阅读时长1023分钟' },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.read_btn:hover,
.read_btn:focus {
  color: #fff;
}
.read_card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .read_info {
    display: flex;

    .read_name {
      display: flex;
      flex-direction: column;
      padding-left: 1rem;
      span:nth-child(1) {
        color: #636262;
      }
      span:nth-child(2) {
        color: #afacac;
      }
    }
  }
}
.read_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.5rem;
  color: #fff;
  background: linear-gradient(to bottom right, #9853af, #623aa2);
  border-color: #913ad8;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
}
</style>

<style lang="scss">
.read-top {
  height: 100%;
  .el-card__body {
    height: calc(100% - 60px);
    overflow: overlay;
    padding: 0;
  }
}
</style>