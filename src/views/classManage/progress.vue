<template>
  <div class="progress_main">
    <div class="main_header">
      <h4>作业统计</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">班级管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>作业统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="progress_concent">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>答题统计</span>
            </div>
            <div v-for="item in statisticsList" :key="item.id" class="card_pro">
              <p>{{item.name}}</p>
              <el-progress :text-inside="true" :stroke-width="22" :percentage="item.percentage" :status="item.status"></el-progress>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>错题统计</span>
            </div>
            <div v-for="item2 in errorList" :key="item2.id" class="card_pro">
              <p>{{item2.name}}</p>
              <el-progress :text-inside="true" :stroke-width="22" :percentage="item2.percentage" :status="item2.status"></el-progress>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        statisticsList: [
        { id: 1, name: "雷珊珊", percentage: 70, status: "success" },
        { id: 2, name: "胡天轩", percentage: 84, status: "success" },
        { id: 3, name: "吴琳琳", percentage: 43, status: "warning" },
        { id: 4, name: "何杰", percentage: 34, status: "exception" },
        { id: 5, name: "雷珊珊", percentage: 70, status: "success" },
        { id: 6, name: "胡天轩", percentage: 84, status: "success" },
        { id: 7, name: "吴琳琳", percentage: 43, status: "warning" },
        { id: 8, name: "何杰", percentage: 34, status: "exception" }
      ],
      errorList: [
        { id: 1, name: "雷珊珊", percentage: 70, status: "success" },
        { id: 2, name: "胡天轩", percentage: 84, status: "success" },
        { id: 3, name: "吴琳琳", percentage: 43, status: "warning" },
        { id: 4, name: "何杰", percentage: 34, status: "exception" },
      ],
      }
    },
}
</script>

<style lang="scss" scoped>
.card_pro {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-progress{
  width: 90%;
}
</style>