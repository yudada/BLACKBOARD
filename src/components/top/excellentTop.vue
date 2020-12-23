<template>
  <div class="excellent-top">
    <el-card>
      <div slot="header">
        <div>优秀榜单</div>
      </div>
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <p>
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar
            >Dennis Dalpiaz Add a new projects AngularJS Template
          </p>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <p>
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar
            >Joey Coronel Add a new projects Free HTML Template
          </p>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <p>
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar
            >Norbert Bridwell Add a new projects Free PSD Template
          </p>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
export default {
  props: [''],
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.excellent-top {
  height: 100%;
  .el-card__body {
    height: calc(100% - 60px);
    overflow: overlay;
    padding: 0;
  }
  .el-card__body::-webkit-scrollbar {
    display: none;
  }
}
</style>