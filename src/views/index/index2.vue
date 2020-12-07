<template>
  <div class="index2_main">
    <div class="main_header">
      <h4>一年级数据看板</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">校园大脑</a></el-breadcrumb-item>
        <el-breadcrumb-item>一年级数据看板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="index2 concent">
      <el-row :gutter="20">
        <el-col :span="5" v-for="item in classInfoList" :key="item.id">
          <el-card :body-style="{ padding: '16px' }">
            <div :class="'text_card' + item.id">
              <div class="row">
                <img :src="require('../../assets/'+item.imgsrc+'.png')"/>
              </div>
              <div class="col">
                <p class="num_people">{{ item.num }}</p>
                <p>{{ item.title }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" :style="{ height: '400px' }">
        <el-col :span="8">
          <el-card shadow="always">
            <div slot="header">
              <div>答题准确率</div>
            </div>
            <div class="progress" v-for="item2 in progressList" :key="item2.id">
              <p>{{ item2.name }}</p>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="item2.percentage" :status="item2.status"></el-progress>
            </div>
          </el-card>
        </el-col>

        <el-col :span="16">
          <el-card shadow="always">
            <div slot="header">
              <div>课件教学</div>
            </div>
            <div id="main" style="width: 100%; height: 300px "></div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" :style="{ height: '480px' }">
        <el-col :span="8">
          <el-card shadow="always">
            <div slot="header">
              <div>优秀榜单</div>
            </div>
              <el-timeline >
                <el-timeline-item timestamp="2018/4/12" placement="top">
                    <p> <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>Dennis Dalpiaz Add a new projects AngularJS Template</p>                  
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                    <p> <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>Joey Coronel Add a new projects Free HTML Template</p>                  
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                    <p> <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>Norbert Bridwell Add a new projects Free PSD Template</p>                  
                </el-timeline-item>
              </el-timeline>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <div slot="header">
              <div>答题先锋</div>
            </div>
            <div v-for="item in topList" :key="item.id" class="text item">
              <div class="top_card">
                <div class="top_name">
                  <span>{{ item.name }}</span>
                  <span>{{ item.enName }}</span>
                </div>
                <h4>答题{{ item.quantity }}道</h4>
              </div>
            </div>
            <div class="btn_text">
              <el-button type="text">更多<i class="el-icon-arrow-down"></i></el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <div slot="header">
              <div>Order Statistics</div>
            </div>
            <div id="order_main" style="width: 100%; height: 380px "></div>
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
              <div>最新阅读</div>
            </div>
            <el-table :data="raedData" stripe border style="width: 100%">
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="lastTime" label="最后阅读时间"></el-table-column>
              <el-table-column prop="role" label="角色"></el-table-column>
              <el-table-column prop="country" label="国家"></el-table-column>
              <el-table-column prop="status" label="状态">
              </el-table-column>
            </el-table>
            <div class="btn_text">
              <el-button type="text">更多<i class="el-icon-arrow-down"></i></el-button>
            </div>
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
          data: [ "直接访问", "搜索引擎" ],
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
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
      classInfoList: [
        { id: 1, num: "55", title: "班级人数", imgsrc:'yonghu' },
        { id: 2, num: "1270", title: "点赞数", imgsrc:'zan' },
        { id: 3, num: "4645", title: "笔记留言", imgsrc:'zan' },
        { id: 4, num: "454", title: "POST", imgsrc:'youjian' },
      ],
      progressList: [
        { id: 1, name: "雷珊珊", percentage: 70, status: "success" },
        { id: 2, name: "胡天轩", percentage: 84, status: "success" },
        { id: 3, name: "吴琳琳", percentage: 43, status: "warning" },
        { id: 4, name: "何杰", percentage: 34, status: "exception" },
      ],
      topList: [
        { id: 1, name: "周冰雪", enName: "weekly profit", quantity:'1300' },
        { id: 2, name: "周冰雪", enName: "weekly profit", quantity:'1300' },
        { id: 3, name: "周冰雪", enName: "weekly profit", quantity:'1300' },
        { id: 4, name: "周冰雪", enName: "weekly profit", quantity:'1300' }
      ],
      orderOption: {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
      },
      raedData: [
        { name: '吴军', lastTime: '2014/03/04', role: 'Editor', country: 'Canada', status: 'Banned'},
        { name: '吴军', lastTime: '2014/03/04', role: 'Editor', country: 'Canada', status: 'Banned'},
        { name: '吴军', lastTime: '2014/03/04', role: 'Editor', country: 'Canada', status: 'Banned'},
        { name: '吴军', lastTime: '2014/03/04', role: 'Editor', country: 'Canada', status: 'Banned'},
        { name: '吴军', lastTime: '2014/03/04', role: 'Editor', country: 'Canada', status: 'Banned'},
        { name: '吴军', lastTime: '2014/03/04', role: 'Editor', country: 'Canada', status: 'Banned'},
        { name: '吴军', lastTime: '2014/03/04', role: 'Editor', country: 'Canada', status: 'Banned'}
      ],
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
    this.myOrderChart();
  },
  methods: {
    myChart() {
      var myChart = echarts.init(document.getElementById("main"));

      var option = this.option;

      myChart.setOption(option);
    },
    myOrderChart() {
      var myOrderChart = echarts.init(document.getElementById("order_main"));

      var orderOption = this.orderOption;

      myOrderChart.setOption(orderOption);
    }
  },
};
</script>

<style lang="scss" scoped>
.el-breadcrumb-item {
  color: #fff;
}

.title_box {
  flex-direction: column;
}

.text_card1{
  display: flex;
  justify-content: space-between;
  color: #707070;
  .row{
    display: flex;
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom right ,#9853af,#623AA2) !important;
    border-radius: 5px;
    box-shadow: 0 7px 30px rgba(152, 83, 175, 0.50)!important;
    img {
      width: 50%;
    }
  }
  .col{
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    .num_people {
      font-size: 32px;
    }
    p {margin: 0;}
  }
}
.text_card2{
  display: flex;
  justify-content: space-between;
  color: #707070;
  .row{
    display: flex;
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom right, #fbc434 0%, #f66b4e 100%) !important;
    border-radius: 5px;
    box-shadow: 0 7px 30px rgba(251, 176, 52, 0.50)!important;
    img {
      width: 50%;
    }
  }
  .col{
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    .num_people {
      font-size: 32px;
    }
    p {margin: 0;}
  }
}
.text_card3{
  display: flex;
  justify-content: space-between;
  color: #707070;
  .row{
    display: flex;
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom right,#00f2fe 0%, #2e78df 100%);
    border-radius: 5px;
    box-shadow: 0 7px 30px rgba(40, 146, 235, 0.50)!important;
    img {
      width: 50%;
    }
  }
  .col{
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    .num_people {
      font-size: 32px;
    }
    p {margin: 0;}
  }
}
.text_card4{
  display: flex;
  justify-content: space-between;
  color: #707070;
  .row{
    display: flex;
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom right, #62fb62, #21a544) !important;
    border-radius: 5px;
    box-shadow: 0 7px 30px rgba(26, 122, 16, 0.50)!important;
    img {
      width: 50%;
    }
  }
  .col{
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    .num_people {
      font-size: 32px;
    }
    p {margin: 0;}
  }
}
.top_card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #EBEEF5;
  box-sizing: border-box;
  .top_name {
    display: flex;
    flex-direction: column;
  }
}
.btn_text {
  text-align: center;
}


.el-col, .el-card  {
  height: 100%;
}
.el-card {
  overflow: scroll;
}
.el-card::-webkit-scrollbar {
  display: none;
}
.status_btn {
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

@media (max-width: 768px) {
  .el-col, .el-card  {
  height: auto !important;
  }
}
@media (max-width: 375px) {
  .el-col, .el-card  {
  height: auto !important;
  }
}
</style>