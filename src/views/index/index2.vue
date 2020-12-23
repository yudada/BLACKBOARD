<template>
  <div class="index2_main">
    <Breadcrumb :navData="navData" />
    <div class="index2_concent">
      <el-row :gutter="20">
        <class-info-card />
      </el-row>

      <el-row :gutter="20" :style="{ height: '500px' }">
        <el-col :span="8">
          <accuracy-top />
        </el-col>

        <el-col :span="16">
          <el-card>
            <div slot="header">
              <div>课件教学</div>
            </div>
            <e-chart :option="option" />
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" :style="{ height: '500px' }">
        <!-- 优秀榜单 -->
        <el-col :span="8">
          <excellent-top />
        </el-col>
        <!-- 优秀阅读 -->
        <el-col :span="8">
          <read-top />
        </el-col>
        <!--  -->
        <el-col :span="8">
          <el-card>
            <div slot="header">
              <div>Order Statistics</div>
            </div>
            <div id="order_main" style="width: 100%; height: 380px"></div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <!-- 天气 -->
        <el-col :span="8">
          <weather />
        </el-col>
        <!-- 最近阅读 -->
        <el-col :span="16">
          <el-card>
            <div slot="header">
              <div>最近阅读</div>
            </div>
            <el-table :data="raedData" stripe border style="width: 100%">
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column
                prop="lastTime"
                label="最后阅读时间"
              ></el-table-column>
              <el-table-column prop="role" label="角色"></el-table-column>
              <el-table-column prop="country" label="国家"></el-table-column>
              <el-table-column prop="status" label="状态"> </el-table-column>
            </el-table>
            <div class="btn_text">
              <el-button type="text"
                >更多<i class="el-icon-arrow-down"></i
              ></el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import AccuracyTop from '@/components/top/accuracyTop.vue'
import ClassInfoCard from '@/components/cardList/classInfoCard.vue'
import EChart from '@/components/eChart.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import ExcellentTop from '@/components/top/excellentTop.vue'
import ReadTop from '@/components/top/readTop.vue'
import Weather from '@/components/statisticalData/weather.vue'
export default {
  components: {
    AccuracyTop,
    ClassInfoCard,
    EChart,
    Breadcrumb,
    ExcellentTop,
    ReadTop,
    Weather,
  },
  data() {
    return {
      navData: {
        title: '校园大脑',
        childTitle: '一年级数据看板',
      },
      option: {
        title: {
          text: '课件',
        },
        legend: {
          data: ['课件数量', '使用人数'],
        },
        color: ['#764496', '#f29848'],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [
              '12.01',
              '12.02',
              '12.03',
              '12.04',
              '12.05',
              '12.06',
              '12.07',
              '12.08',
              '12.09',
              '12.10',
            ],
            nameTextStyle: {
              fontSize: 16,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            boundaryGap: true,
            nameTextStyle: {
              fontSize: 16,
            },
          },
        ],
        series: [
          {
            name: '课件数量',
            type: 'line',
            stack: '总量',
            areaStyle: {
              color: '#764496',
              opacity: 0.9,
            },
            smooth: true,
            data: [120, 180, 132, 245, 156, 450, 210, 555, 324, 645, 485],
          },
          {
            name: '使用人数',
            type: 'line',
            stack: '总量',
            areaStyle: {
              color: '#f29848',
              opacity: 0.9,
            },
            smooth: true,
            data: [220, 320, 254, 450, 312, 660, 514, 754, 589, 845, 650],
          },
        ],
      },
      orderOption: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      },
      raedData: [
        {
          name: '吴军',
          lastTime: '2014/03/04',
          role: 'Editor',
          country: 'Canada',
          status: 'Banned',
        },
        {
          name: '吴军',
          lastTime: '2014/03/04',
          role: 'Editor',
          country: 'Canada',
          status: 'Banned',
        },
        {
          name: '吴军',
          lastTime: '2014/03/04',
          role: 'Editor',
          country: 'Canada',
          status: 'Banned',
        },
        {
          name: '吴军',
          lastTime: '2014/03/04',
          role: 'Editor',
          country: 'Canada',
          status: 'Banned',
        },
        {
          name: '吴军',
          lastTime: '2014/03/04',
          role: 'Editor',
          country: 'Canada',
          status: 'Banned',
        },
        {
          name: '吴军',
          lastTime: '2014/03/04',
          role: 'Editor',
          country: 'Canada',
          status: 'Banned',
        },
        {
          name: '吴军',
          lastTime: '2014/03/04',
          role: 'Editor',
          country: 'Canada',
          status: 'Banned',
        },
      ],
    }
  },
  mounted() {
    this.myOrderChart()
  },
  methods: {
    myOrderChart() {
      let myChart = echarts.init(document.getElementById('order_main'))
      myChart.setOption(this.orderOption)
    },
  },
}
</script>

<style lang="scss" scoped>
.btn_text {
  text-align: center;
}
</style>

<style lang="scss">
.index2_concent {
  .el-col,
  .el-card {
    height: 100%;
  }
  .el-card {
    overflow: scroll;
  }
  .el-card::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    .el-col,
    .el-card {
      height: auto !important;
    }
  }
  @media (max-width: 375px) {
    .el-col,
    .el-card {
      height: auto !important;
    }
  }
}
</style>