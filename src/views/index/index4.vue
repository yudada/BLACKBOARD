<template>
  <div class="index4_main">
    <Breadcrumb :navData="navData" />

    <div class="index4_concent">
      <el-row :gutter="20">
        <progress-card />
      </el-row>
      
      <el-row :gutter="20">
        <el-col :span="16">
          <el-card shadow="always">
            <div slot="header">
              <div>课件教学</div>
            </div>
            <div>
              <div id="main" style="width: auto; height: 380px"></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <div slot="header">
              <div>班级答题统计</div>
            </div>
            <div id="pillar" style="width: auto; height: 380px"></div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="always">
            <div slot="header">
              <div>答题准确率</div>
            </div>
            <div v-for="(item, index) in exactList" :key="index" class="top_box">
              <div class="top_ava">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <div class="ava_info">
                  <span>{{ item.name }}</span>
                  <span>{{ item.enName }}</span>
                </div>
              </div>
              <div>
                <el-tag type="info">{{ item.percentage }}%</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <div slot="header">
              <div>优秀榜单</div>
            </div>
            <div v-for="(item, index) in excellentList" :key="index" class="top_box">
              <div class="top_ava">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <div class="ava_info">
                  <span>{{ item.name }}</span>
                  <span>{{ item.enName }}</span>
                </div>
              </div>
              <div>
                <el-button class="top_btn">TOP{{ item.top }}</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <div slot="header">
              <div>答题先锋</div>
            </div>
            <div v-for="(item, index) in topList" :key="index" class="top_box">
              <div class="top_ava">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <div class="ava_info">
                  <span>{{ item.name }}</span>
                  <span>{{ item.enName }}</span>
                </div>
              </div>
              <div>
                <el-button class="top_btn">TOP{{ item.top }}</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <weather />
        </el-col>

        <el-col :span="16">
          <el-card shadow="always">
            <div slot="header">
              <div>学员列表</div>
            </div>
            <el-table :data="studentData" stripe border style="width: 100%">
              <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column prop="user" label="USER"></el-table-column>
              <el-table-column prop="feedback" label="FEED BACK"></el-table-column>
              <el-table-column prop="date" label="DATE"></el-table-column>
              <el-table-column>
                <template>
                  <i class="el-icon-delete"></i>
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
import Breadcrumb from '@/components/breadcrumb.vue';
import echarts from "echarts";
import ProgressCard from '../../components/cardList/progressCard.vue';
import Weather from '../../components/statisticalData/weather.vue';
export default {
  components: { Breadcrumb, ProgressCard, Weather },
  data() {
    return {
      navData: {
        title: '校园大脑',
        childTitle: '三年级数据看板'
      },
      option: {
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
      },
      pillarOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        legend: {
          data: [ "直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎" ],
        },
        grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
        yAxis: { type: "value" },
        xAxis: {
          type: "category",
          data: [ "周一", "周二", "周三", "周四", "周五", "周六", "周日" ],
        },
        series: [
          {
            name: "直接访问",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [320, 302, 301, 334, 390, 330, 320],
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
        ],
      },
      cardList: [
        { id: 1, num: "3000" + ' ' + "位", title: "学生", color: '#CA8411', percentage: 90 },
        { id: 2, num: "35" + ' ' + "位", title: "老师", color: '#2B9146', percentage: 80 },
        { id: 3, num: "3500" + ' ' + "个", title: "课件", color: '#F66B4E', percentage: 56 },
        { id: 4, num: "1988" + ' ' + "位", title: "家长", color: '#3578D5', percentage: 25 },
      ],
      progressList: [
        { id: 1, name: "雷珊珊", percentage: 70, status: "success" },
        { id: 2, name: "胡天轩", percentage: 84, status: "success" },
        { id: 3, name: "吴琳琳", percentage: 43, status: "warning" },
        { id: 4, name: "何杰", percentage: 34, status: "exception" },
      ],
      exactList: [
        { name: "王小虎", enName: 'Web Designer', class: "一年3班", addText: "2019年度", percentage: '10' },
        { name: "吴天宇", enName: 'Web Designer', class: "一年3班", addText: "2019年度", percentage: '20' },
        { name: "李梅", enName: 'Web Designer', class: "一年3班", addText: "2019年度", percentage: '30' },
        { name: "胡于琳", enName: 'Web Designer', class: "一年3班", addText: "2019年度", percentage: '40' }
      ],
      excellentList: [
        { name: "王小虎", enName: 'Web Designer', class: "一年3班", addText: "2019年度", top: '1' },
        { name: "吴天宇", enName: 'Web Designer', class: "一年3班", addText: "2019年度", top: '2' },
        { name: "李梅", enName: 'Web Designer', class: "一年3班", addText: "2019年度", top: '3' },
        { name: "胡于琳", enName: 'Web Designer', class: "一年3班", addText: "2019年度", top: '4' }
      ],
      topList: [
        { name: "王小虎", enName: 'Web Designer', class: "一年3班", addText: "2019年度", top: '1' },
        { name: "吴天宇", enName: 'Web Designer', class: "一年3班", addText: "2019年度", top: '2' },
        { name: "李梅", enName: 'Web Designer', class: "一年3班", addText: "2019年度", top: '3' },
        { name: "胡于琳", enName: 'Web Designer', class: "一年3班", addText: "2019年度", top: '4' }
      ],
      studentData: [
        { id: '2345', user: 'Megan Peters', feedback: 'please check pricing Info', date: 'July 13, 2018' },
        { id: '2345', user: 'Megan Peters', feedback: 'please check pricing Info', date: 'July 13, 2018' },
        { id: '2345', user: 'Megan Peters', feedback: 'please check pricing Info', date: 'July 13, 2018' },
        { id: '2345', user: 'Megan Peters', feedback: 'please check pricing Info', date: 'July 13, 2018' },
        { id: '2345', user: 'Megan Peters', feedback: 'please check pricing Info', date: 'July 13, 2018' },
        { id: '2345', user: 'Megan Peters', feedback: 'please check pricing Info', date: 'July 13, 2018' }      ],
      weatherList:[
        {id: 1, date: 'Yesterday', weather: 'sunny', temperature: '28' },
        {id: 2, date: 'Tomorrow', weather: 'cloudySunny', temperature: '32' },
      ],
      weatherIcon: {
        'sunny': 'el-icon-sunny',
        'cloudy': 'el-icon-cloudy',
        'partlyCloudy': 'el-icon-partly-cloudy',
        'cloudySunny': 'el-icon-cloudy-and-sunny',
        'lightRain': 'el-icon-light-rain',
        'lightning': 'el-icon-lightning',
        'heavyRain': 'el-icon-heavy-rain'
      }
    };
  },
  mounted() {
    this.myChart();
    this.pillarOptionChart();
  },
  methods: {
    myChart() {
      var myChart = echarts.init(document.getElementById("main"));

      var option = this.option;

      myChart.setOption(option);
    },
    pillarOptionChart() {
      var myChart = echarts.init(document.getElementById("pillar"));

      var pillarOption = this.pillarOption;

      myChart.setOption(pillarOption);
    }
  },
};
</script>

<style lang="scss" scoped>
.top_box{
  display: flex;
  justify-content: space-between;
  padding: 10px;
  .top_ava {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ava_info {
      display: flex;
      flex-direction: column;
      padding-left: 0.5rem;
      span { font-size: 0.25rem; color: #707070; }
    }
  }
}
.top_btn {
  color: #fff;
  background: linear-gradient(to bottom right, #9853af, #623AA2);
  border-color: #913ad8;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
}
.top_btn:hover, .top_btn:focus {
  color: #fff;
}
</style>