<template>
  <div class="courseware_main">
    <div class="main_header">
      <h4>精选题库</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">超级作业</a></el-breadcrumb-item>
        <el-breadcrumb-item>精选题库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="courseware_concent">
      <taskList :type="3"></taskList>
    </div>
  </div>
</template>

<script>
import taskList from './components/taskList.vue'
export default {
  components: {
    taskList
  },
  data() {
    return {
      
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
