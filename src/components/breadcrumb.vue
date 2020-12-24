<template>
  <div class="main_header">
    <h4>{{ navData.childTitle }}</h4>
    <div v-if="navData.title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="#">{{ navData.title }}</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ navData.childTitle }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-if="navData.goTo && !navData.path">
      <el-button type="text" @click="goBack" class="goBack">{{navData.goTo}}</el-button>
    </div>
    <div v-if="navData.path">
      <el-button type="text" @click="goPath" class="goBack">{{navData.goTo}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['navData'],
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goPath() {
      this.$router.push(this.navData.path)
    }
  },
}
</script>

<style lang="scss" scoped>
.goBack {
  color: #fff;
  font-size: 18px;
}
.goBack:hover {
  color: #fff;
}
</style>