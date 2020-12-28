<template>
  <div style="height: 100%">
    <el-card class="student_life">
      <div slot="header">
        <span>学生风彩</span>
      </div>
      <el-row :gutter="10" class="gallery_box">
        <el-col :span="8" v-for="(item, index) in studentList" :key="index">
          <img
            :src="require('@/assets/images/photos/' + item.imgsrc + '.jpeg')"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentList: [
        { name: 'weekly', imgsrc: '1' },
        { name: 'weekly', imgsrc: '2' },
        { name: 'weekly', imgsrc: '3' },
        { name: 'weekly', imgsrc: '4' },
        { name: 'weekly', imgsrc: '5' },
        { name: 'weekly', imgsrc: '6' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.gallery_box {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  img {
    width: 100%;
    border-radius: 3px !important;
  }
}
</style>

<style lang="scss">
.student_life {
  height: 100%;
  .el-card__body {
    height: calc(100% - 100px);
    overflow: overlay;
  }
}
</style>