<template>
  <div class="widgets_main">
    <div class="main_header">
      <h4>{{ classInfo.className }}</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的班级</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="widgets_concent">
      <!-- 内容头部 进度卡 -->
      <el-row :gutter="20">
        <progress-card />
      </el-row>

      <!-- 班级信息 -->
      <el-row :gutter="20">
        <class-info-card />
      </el-row>

      <el-row :gutter="20" class="first-row">
        <!-- 答题准确率TOP -->
        <el-col :span="8">
          <accuracy-top />
        </el-col>

        <!-- 阅读优秀TOP -->
        <el-col :span="8">
          <read-top />
        </el-col>
        <!-- 学生动态 -->
        <el-col :span="8">
          <student-live />
        </el-col>
      </el-row>

      <el-row :gutter="20" class="second-row">
        <!-- 阅读课本进度 -->
        <el-col :span="8">
          <read-book />
        </el-col>

        <el-col :span="16">
          <!-- 学生风彩 -->
          <student-life />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { mapState, mapMutations } from 'vuex'
import progressCard from '@/components/cardList/progressCard'
import ClassInfoCard from '@/components/cardList/classInfoCard.vue'
import AccuracyTop from '@/components/top/accuracyTop.vue'
import ReadTop from '@/components/top/readTop.vue'
import StudentLife from './components/studentLife.vue'
import ReadBook from './components/readBook.vue'
import StudentLive from './components/studentLive.vue'
export default {
  components: {
    progressCard,
    ClassInfoCard,
    AccuracyTop,
    ReadTop,
    StudentLife,
    ReadBook,
    StudentLive,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['classInfo']),
  },
}
</script>

<style lang="scss" scoped>
.first-row {
  height: 50vh;
}
.second-row {
  height: 60vh;
}
.el-col {
  height: 100%;
}
.el-card {
  height: 100%;
  overflow: overlay;
  .el-card__body {
    height: 100%;
  }
}
.el-card::-webkit-scrollbar {
  display: none;
}
@media (max-width: 1280px) {
  .second-row {
    height: 50vh;
  }
}
@media (max-width: 1024px) {
  .first-row {
    height: 60vh;
  }
  .second-row {
    height: 50vh;
  }
}
@media (max-width: 800px) {
  .first-row {
    height: auto;
  }
  .second-row {
    height: auto;
  }
}
</style>