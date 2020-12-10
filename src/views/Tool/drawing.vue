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
                <div class="card_content">
                  <img :src="require('../../assets/tool/' + item.imgsrc + '.png')"/>
                  <span>{{ item.toolTitle }}</span>
                </div>
            </div>
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
      toolList: [
        { id: 1, toolTitle:'字母顺序', imgsrc: 'betusorrend--字母顺序'},
        { id: 2, toolTitle:'元素周期表', imgsrc: 'hetigyakorlo--每周练习' },
        { id: 3, toolTitle:'颜色', imgsrc: 'szinek--颜色' },
        { id: 4, toolTitle:'光学工具箱', imgsrc: 'optikaipad--光学工具箱' },
        { id: 5, toolTitle:'记忆游戏', imgsrc: 'memoria--记忆游戏' }
      ],
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
   } 
  }
}
</script>

<style lang="scss" scoped>
.card_body{
  display: flex;
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
