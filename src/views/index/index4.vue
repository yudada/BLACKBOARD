<template>
  <div class="index4_main">
    <div class="main_header">
      <h4>三年级数据看板</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">校园大脑</a></el-breadcrumb-item>
        <el-breadcrumb-item>三年级数据看板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="index4_concent">
      <el-row :gutter="20">
        <el-col :span="5" v-for="item in cardList" :key="item.id">
          <el-card :class="'pro_card'+ item.id">
            <div class="progress_box">
              <div class="row">
                <el-progress type="circle" :percentage="item.percentage" :width="60" :color="item.color"></el-progress>
              </div>
              <div >
                <div class="col">
                  <p class="num_people">{{ item.num }}</p>
                  <p class="num_title">{{ item.title }}</p>
                </div>
             </div>
           </div>
          </el-card>
        </el-col>
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
            <div v-for="(item, index) in exactList" :key="index" class="item top_box">
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
            <div v-for="(item, index) in excellentList" :key="index" class="item top_box">
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
            <div v-for="(item, index) in topList" :key="index" class="item top_box">
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
          <el-card shadow="always" :body-style="{ padding: '0'}">
            <div class="weather_card">
              <div class="card_header">
                <div class="header_icon">
                  <i class="el-icon-arrow-left"></i>
                  <i class="el-icon-setting"></i>
                </div>
                  <div class="header_text">
                      <h1>Clear Night</h1>
                    <h3>Toronto, Canada</h3>
                    <p>
                      <span>30</span>
                      <span>℃</span>
                    </p>
                  </div>
              </div>
              <div class="card_content">
                <div class="content_icon">
                  <i class="el-icon-arrow-up"></i>
                </div>
                <div class="content_weather" v-for="item in weatherList" :key="item.id">
                  <span>{{ item.date }}</span>
                  <div class="icon">
                    <i :class="weatherIcon[item.weather]"></i>
                    <span>{{ item.temperature }}℃</span>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="16">
          <el-card shadow="always">
            <div slot="header">
              <div>学员列表</div>
            </div>
            <el-table :data="studentData" stripe style="width: 100%">
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
import echarts from "echarts";
export default {
  data() {
    return {
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
.progress_box{
  display: flex;
  justify-content: space-around;
  align-items: center;
  .col {
    p { margin: 0.5rem; }
    .num_people{
      font-size: 25px;
      font-weight: 600;
      }
    .num_title {
    font-size: 14px;
    }
  }
}
.pro_card1{
  color: #fff;
  background: linear-gradient(to bottom right ,#d9ee62,#8ab414) !important;
}
.pro_card2{
  color: #fff;
  background: linear-gradient(to bottom right, #62fb62, #21a544) !important;
}
.pro_card3{
  color: #fff;
  background: linear-gradient(to bottom right, #fbc434 0%, #f66b4e 100%) !important;
}
.pro_card4{
  color: #fff;
  background: linear-gradient(to bottom right,#00f2fe 0%, #1e63c3 100%);
}
.top_box{
  display: flex;
  justify-content: space-between;
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
.weather_card {
  .card_header{
    padding: 1rem;
    background: linear-gradient(rgba(112, 64, 165,0.7),rgba(112, 64, 165,0.7)),url(../../assets/images/toronto.jpeg) no-repeat;
    background-size: cover;
    background-position: center;
    .header_icon{
      display: flex;
      justify-content: space-between;
      i {
        color: #fff;
        font-size: 20px;
      }
    }
    .header_text{
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h1 { font-size: 35px; }
      h3 { font-size: 21px;}
      p span {
        font-size: 84px;
      }
    }
  }
  .card_content {
    padding: 2rem;
    .content_icon {
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 25px;
        cursor: pointer;
        }
    
    }
    .content_weather {
      display: flex;
      justify-content: space-between;
      span, i { font-size: 25px;}
      i { padding-right: 0.25rem;}
    }
    .content_weather:nth-child(3) {
        color: rgba(0, 0, 0, 0.25);
      }
  }
}
</style>