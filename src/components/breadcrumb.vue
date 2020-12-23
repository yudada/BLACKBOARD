<template>
  <div class="main_header">
    <h4>{{navData.childTitle}}</h4>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="#">{{navData.title}}</a></el-breadcrumb-item>
      <el-breadcrumb-item>{{navData.childTitle}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: ['navData']
}
</script>