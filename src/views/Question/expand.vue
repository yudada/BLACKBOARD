<template>
  <div class="expand_main">
    <div class="main_header">
      <h4>练习题</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">题库资源</a></el-breadcrumb-item>
        <el-breadcrumb-item>练习题</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="expand_concent">
      <questionList :type="1"></questionList>
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
