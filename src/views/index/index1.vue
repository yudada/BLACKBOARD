<template>
  <div class="index1_main">
    <div class="main_header">
      <h4>全校数据大屏</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">校园大脑</a></el-breadcrumb-item>
        <el-breadcrumb-item>全校数据大屏</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="index1_concent">
      <el-row :gutter="20">
        <user-card :cardList="cardList" />
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-card shadow="always">
            <div slot="header">
              <div>课件教学</div>
            </div>
            <div id="main" style="width: 100%; height: 380px"></div>
          </el-card>
        </el-col>
      </el-row>

      <!-- <el-row :gutter="20" >
        <el-col :span="8" :style="{ height: '100%'}">
          <el-card shadow="always" :body-style="{ padding: 0 }" :style="{ height: '100%'}">
            <div class="card_img">
              <img src="../../assets/images/photos/3.jpeg" alt="" />
            </div>
            <div class="card_info">
              <h3>张玲玲 (一年3班班主任)</h3>
              <p class="card-text">
                优秀课件老师，张玲玲老师（现任一年3班班主任），她用自己智慧的大脑，通过坚持努力的付出，制做出一套又一套优秀的教学课件。
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="16" :style="{ height: '100%'}">
          <el-card shadow="always" :style="{ height: '100%'}">
            <div slot="header">
              <span>榜样的力量</span>
            </div>
            <div class="card_table">
              <el-table :data="topTabledate" style="width: 100%">
                <el-table-column prop="name" label="姓名">
                  <template slot-scope="scope">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="class" label="班级">
                </el-table-column>
                <el-table-column prop="addText" label="备注"> </el-table-column>
                <el-table-column prop="top" label="TOP榜单">
                  <template slot-scope="scope">
                    <el-dropdown trigger="click">
                      <el-button :class="'top_btn' + scope.row.top">TOP{{ scope.row.top }}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的班级</el-dropdown-item>
                        <el-dropdown-item>我的阅读</el-dropdown-item>
                        <el-dropdown-item>我的笔记</el-dropdown-item>
                        <el-dropdown-item>更多</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row> -->
    
      <!-- 教师课件 -->
      <el-row>
        <course-waredata :teacherTableData="teacherTableData" />
      </el-row>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import UserCard from '@/components/cardList/userCard';
import { schoolData } from '@/api/index'
import CourseWaredata from '@/components/statisticalData/courseWaredata.vue';
export default {
  components: { UserCard, CourseWaredata },
  data() {
    return {
      topTabledate: [
        { name: "王小虎", class: "一年3班", addText: "2019年度", top: '1' },
        { name: "吴天宇", class: "一年3班", addText: "2019年度", top: '2' },
        { name: "李梅", class: "一年3班", addText: "2019年度", top: '3' },
        { name: "胡于琳", class: "一年3班", addText: "2019年度", top: '4' },
        { name: "胡于琳", class: "一年3班", addText: "2019年度", top: '5' }
      ],
      cardList: [
        { num: '', title: "老师", imgsrc:'yonghu' },
        { num: '', title: "课件", imgsrc:'yonghu' },
        { num: '', title: "学生", imgsrc:'yonghu' },
        { num: '', title: "家长", imgsrc:'yonghu' },
      ],
      teacherTableData: []
    };
  },
  created() {
    this.getUserNubemr();
  },
  mounted() {
    this.myChart();
  },
  methods: {
    myChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "堆叠区域图",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310],
          }
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getUserNubemr() {
      schoolData().then(res => {
        const {data} = res.data;
        console.log(data);
        this.teacherTableData = data.courseWare;
        this.cardList[0].num = data.teacher_number + '位';
        this.cardList[1].num = data.courseWare_number + '个';
        this.cardList[2].num = data.student_number + '位';
        this.cardList[3].num = data.parents_number + '位';
      })
    }
  }
};
</script>

<style lang="scss" scoped>


// TOP 按钮
.top_btn1 {
  color: #fff;
  background: linear-gradient(to bottom right,#9853af,#623AA2);
  border-color: #913ad8;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
}
.top_btn1:hover, .top_btn1:focus {
  color: #fff !important;
  border-color: #fff;
}
.top_btn2 {
    color: #fff;
    background: linear-gradient(to bottom right, #fbc434 0%, #f66b4e 100%);
    border-color: #ef9f49;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
}
.top_btn2:hover, .top_btn2:focus {
  color: #fff !important;
  border-color: #fff;
}
.top_btn3 {
  color: #fff;
  background: linear-gradient(to bottom right, #62fb62, #21a544);
  border-color: #4ecc48;
}
.top_btn3:hover, .top_btn3:focus {
  color: #fff !important;
  border-color: #fff;
}
.top_btn4 {
  color: #fff;
  background: linear-gradient(to bottom right,#00f2fe 0%, #1fb2c1 100%);
  border-color: #07cedc;
}
.top_btn4:hover, .top_btn4:focus {
  color: #fff !important;
  border-color: #fff;
}
</style>