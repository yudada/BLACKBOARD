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
                  <img
                    :src="item.toolImage"
                    :onerror="defaultPic"
                    @click="openDialogVisible(item)"
                  />
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
        :destroy-on-close="true"
      >
        <iframe :src="toolInfo.toolAddress" frameborder="0" />
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
      toolInfo: {},
      defaultPic:
        'this.src="' +
        require('../../assets/tool/betusorrend--字母顺序.png') +
        '"',
      toolUrlList: [
        {
          toolTitle: '光学工具',
          toolAddress: 'static/tool/guangxuebaoshi.html',
        },
        { toolTitle: '海洋', toolAddress: 'static/tool/haiyang.html' },
        { toolTitle: '超级计算器', toolAddress: 'static/tool/jisuanqi.html' },
        {
          toolTitle: '物理单位',
          toolAddress: 'static/tool/liangzhouchang.html',
        },
        { toolTitle: '太阳系', toolAddress: 'static/tool/taiyangxi.html' },
        {
          toolTitle: '元素周期表',
          toolAddress: 'static/tool/yuansuzhouqibiao.html',
        },
      ],
    }
  },
  created() {
    this.getToolList()
  },
  methods: {
    async getToolList() {
      const { data: res } = await this.$http.get(`api/subjectTools/lists`)
      if (res.statusCode !== 200)
        return this.$message.error('获取工具列表失败！')
      this.toolList = res.data

      this.toolList.map((item) => {
        this.toolUrlList.map((item2) => {
          if (item.toolTitle === item2.toolTitle) {
            item.toolAddress = item2.toolAddress
          }
        })
      })
      console.log(this.toolList)
    },
    openDialogVisible(tool) {
      console.log(tool)
      this.toolInfo = tool
      if (tool.toolAddress !== '#' && tool.toolAddress !== null) {
        this.dialogVisible = true
      } else {
        this.$message.info('功能开发中!!!')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card_body {
  display: flex;
  flex-wrap: wrap;
  img {
    cursor: pointer;
  }
  .text {
    width: 20%;
    .card_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
