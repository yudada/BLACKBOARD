<template>
  <div class="mistakes_main">
    <div class="main_header">
      <h4>实验操作</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">超级作业</a></el-breadcrumb-item>
        <el-breadcrumb-item>实验操作</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="mistakes_concent">
      <taskList :type="4"></taskList>
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
