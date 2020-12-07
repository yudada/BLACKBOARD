<template>
  <div class="history_main">
    <div class="main_header">
      <h4>历年考题</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">题库资源</a></el-breadcrumb-item>
        <el-breadcrumb-item>历年考题</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="history_concent">
      <questionList :type="3"></questionList>
    </div>
  </div>
</template>

<script>
import questionList from "./components/questionList.vue";
export default {
  components: {
    questionList,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
