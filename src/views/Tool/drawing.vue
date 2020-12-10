<template>
  <div class="drawing_main">
    <div class="main_header">
      <h4>学科工具集</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学科工具</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="drawing_concent">
      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>学科工具</span>
            </div>
            <div class="card_body">
              <div v-for="item in toolList" :key="item.id" class="text item">
                <div class="card_content" @click="openDialogVisible(item)">
                  <img v-if="item.toolImage" :src="item.toolImage"/>
                  <img v-else src="../../assets/tool/betusorrend--字母顺序.png" alt="">
                  <span>{{ item.toolTitle }}</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-dialog
        :title="toolInfo.toolTitle"
        :visible.sync="dialogVisible"
        fullscreen
        :append-to-body="true"
        custom-class="dialog"
      >
        <iframe
          :src="toolInfo.toolAddress"
          frameborder="0"
        ></iframe>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toolList: [],
      dialogVisible: false,
      toolInfo: {}
    }
  },
  created() {
    this.getToolList();
  },
  methods: {
   async getToolList() {
     const { data: res } = await this.$http.get(`api/subjectTools/lists`)
     if (res.statusCode !== 200) return this.$message.error('获取工具列表失败！');
     console.log(res);
     this.toolList = res.data;
   },
   openDialogVisible(tool) {
     this.dialogVisible = true
     this.toolInfo = tool;
   }
  }
}
</script>

<style lang="scss" scoped>
.card_body{
  display: flex;
  img {
    cursor: pointer;
  }
  .text{
    width: 20%;
    .card_content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  }
}
</style>
