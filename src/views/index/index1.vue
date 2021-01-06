<template>
  <div class="index1_main">
    <Breadcrumb :navData="navData" />
    <div class="index1_concent">
      <el-row :gutter="20">
        <user-card :cardList="cardList" />
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-card>
            <div slot="header">
              <div>课件教学</div>
            </div>
            <e-chart :option="option" />
          </el-card>
        </el-col>
      </el-row>

      <!-- 教师课件 -->
      <el-row>
        <course-waredata :teacherTableData="teacherTableData" />
      </el-row>
    </div>
  </div>
</template>

<script>
import UserCard from '@/components/cardList/userCard'
import { schoolData } from '@/api/index'
import CourseWaredata from '@/components/statisticalData/courseWaredata.vue'
import EChart from '@/components/eChart.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { UserCard, CourseWaredata, EChart, Breadcrumb },
  data() {
    return {
      navData: {
        title: '校园大脑',
        childTitle: '全校数据大屏'
      },
      topTabledate: [
        { name: '王小虎', class: '一年3班', addText: '2019年度', top: '1' },
        { name: '吴天宇', class: '一年3班', addText: '2019年度', top: '2' },
        { name: '李梅', class: '一年3班', addText: '2019年度', top: '3' },
        { name: '胡于琳', class: '一年3班', addText: '2019年度', top: '4' },
        { name: '胡于琳', class: '一年3班', addText: '2019年度', top: '5' },
      ],
      cardList: [
        { num: 0, title: '老师', imgsrc: 'jiaoshi' },
        { num: 0, title: '课件', imgsrc: 'kejian' },
        { num: 0, title: '学生', imgsrc: 'xuesheng' },
        { num: 0, title: '家长', imgsrc: 'jiazhang' },
      ],
      teacherTableData: [],
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
    }
  },
  created() {
    this.getUserNubemr()
  },
  methods: {
    getUserNubemr() {
      schoolData().then((res) => {
        const { data } = res.data
        console.log(data)
        this.teacherTableData = data.courseWare
        this.cardList[0].num = data.teacher_number + '位'
        this.cardList[1].num = data.courseWare_number + '个'
        this.cardList[2].num = data.student_number + '位'
        this.cardList[3].num = data.parents_number + '位'
      })
    },
  },
}
</script>