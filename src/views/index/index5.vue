<template>
  <div class="index5_main">
    <Breadcrumb :navData="navData" />

    <div class="index5_concent">
      <el-row :gutter="20">
        <user-card-3 :cardList="cardList" />
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-card shadow="always">
            <div slot="header">
              <div>课件教学</div>
            </div>
            <e-chart :option="option" />
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="5" v-for="item2 in ProgressList" :key="item2.id">
          <el-card shadow="always">
            <div class="data_box">
              <div class="circle_pro">
                <el-progress
                  :width="70"
                  :color="item2.color"
                  type="circle"
                  :percentage="item2.percentage"
                ></el-progress>
              </div>
              <div class="pro_info">
                <h1>{{ item2.value }}</h1>
                <span>{{ item2.title }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-card shadow="always">
            <div slot="header">
              <div>兴趣组名</div>
            </div>
            <el-table :data="tableData" stripe border>
              <el-table-column label="编号">
                <template slot-scope="scope">
                  <span>{{ scope.row.num }}</span>
                </template>
              </el-table-column>
              <el-table-column label="社区名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="参于人数	">
                <template slot-scope="scope">
                  <span>{{ scope.row.peoplenum }}</span>
                </template>
              </el-table-column>
              <el-table-column label="课件	">
                <template slot-scope="scope">
                  <span>{{ scope.row.coursewarenum }}</span>
                </template>
              </el-table-column>
              <el-table-column label="导师">
                <template slot-scope="scope">
                  <span>{{ scope.row.tutorname }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="influence" label="影响率">
                <template slot-scope="scope">
                  <el-progress
                    :percentage="scope.row.influence.percentage"
                    :color="scope.row.influence.customColor"
                  ></el-progress>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb.vue'
import echarts from 'echarts'
import UserCard3 from '@/components/cardList/userCard3.vue'
import EChart from '../../components/eChart.vue'
export default {
  components: { Breadcrumb, UserCard3, EChart },
  data() {
    return {
      navData: {
        title: '校园大脑',
        childTitle: '兴趣社团',
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
      cardList: [
        { id: 1, num: '453' + '位', title: '老师', imgsrc: 'jiaoshi' },
        { id: 2, num: '453' + '人', title: '学生', imgsrc: 'xuesheng' },
        { id: 3, num: '453' + '个', title: '课件', imgsrc: 'kejian' },
        { id: 4, num: '453' + '位', title: '家长', imgsrc: 'jiazhang' },
      ],
      ProgressList: [
        {
          id: 1,
          percentage: 67,
          value: '67',
          color: '#f56c6c',
          title: 'Customers',
        },
        {
          id: 2,
          percentage: 76,
          value: '76',
          color: '#e6a23c',
          title: 'Total Sales',
        },
        {
          id: 3,
          percentage: 17,
          value: '17',
          color: '#5cb87a',
          title: 'New Orders',
        },
        {
          id: 4,
          percentage: 38,
          value: '38',
          color: '#6f7ad3',
          title: 'Invoice',
        },
      ],
      tableData: [
        {
          num: '#675',
          name: '奥数初中组',
          peoplenum: 120,
          coursewarenum: 110,
          tutorname: '张老师',
          influence: { percentage: 20, customColor: '#909399' },
        },
        {
          num: '#789',
          name: '计算机软件编程',
          peoplenum: 120,
          coursewarenum: 110,
          tutorname: '张老师',
          influence: { percentage: 40, customColor: '#909399' },
        },
        {
          num: '#675',
          name: '奥数初中组',
          peoplenum: 120,
          coursewarenum: 110,
          tutorname: '张老师',
          influence: { percentage: 50, customColor: '#909399' },
        },
        {
          num: '#234',
          name: '中国主持人小组',
          peoplenum: 120,
          coursewarenum: 110,
          tutorname: '张老师',
          influence: { percentage: 60, customColor: '#909399' },
        },
        {
          num: '#234',
          name: '无人机兴趣小组',
          peoplenum: 120,
          coursewarenum: 110,
          tutorname: '',
          influence: { percentage: 80, customColor: '#909399' },
        },
        {
          num: '#675',
          name: 'VR建模兴趣组',
          peoplenum: 120,
          coursewarenum: 110,
          tutorname: '张老师',
          influence: { percentage: 100, customColor: '#909399' },
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.data_box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .pro_info {
    h1 {
      color: #636262;
      font-size: 2rem;
      margin: 0;
    }
    span {
      color: #afacac !important;
    }
  }
}
</style>