<template>
  <div class="drawing_main">
    <Breadcrumb :navData="navData" />

    <div class="drawing_concent">
      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span> </span>
            </div>
            <div class="card_body">
              <div v-for="item in toolList" :key="item.id" class="text">
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
import { subjectToolsLists } from '@/api/tool'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        childTitle: '学科工具',
      },
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
      subjectToolsLists().then((res) => {
        const { data } = res
        this.toolList = data

        this.toolList.map((item) => {
          this.toolUrlList.map((item2) => {
            if (item.toolTitle === item2.toolTitle) {
              item.toolAddress = item2.toolAddress
            }
          })
        })
        console.log(this.toolList)
      })
    },
    openDialogVisible(tool) {
      if (tool.toolAddress !== '#' && tool.toolAddress !== null) {
        this.toolInfo = tool
        this.dialogVisible = true
      } else {
        this.$message.info('功能开发中...敬请期待!')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card_body {
  display: flex;
  flex-wrap: wrap;
  .text {
    width: 20%;
    .card_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: calc(100% - 60px);
      margin: 30px;
      img {
        cursor: pointer;
        width: 100%;
        border-radius: 5px;
      }
    }
  }
}
</style>
