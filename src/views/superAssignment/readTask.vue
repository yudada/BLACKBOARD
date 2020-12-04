<template>
  <div class="readTask_main">
    <div class="main_header">
      <h4>课本阅读</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">超级作业</a></el-breadcrumb-item>
        <el-breadcrumb-item>课本阅读</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="readTask_concent">
      <taskList :type="2"></taskList>
    </div>
  </div>
</template>

<script>
import taskList from './components/taskList'
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
