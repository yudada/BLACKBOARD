<template>
  <div class="index5_main">
    <div class="main_header">
      <h4>兴趣社团</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">校园大脑</a></el-breadcrumb-item>
        <el-breadcrumb-item>兴趣社团数据看板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="index5_concent">
      <el-row :gutter="20">
        <el-col :span="5" v-for="item in cardList" :key="item.id">
          <el-card :body-style="{ padding: '20px' }" :class="'card_color' + item.id">
            <div class="text_card">
              <div class="col">
                <p>{{ item.title }}</p>
                <p class="num_people">{{ item.num }}</p>
                <i class="el-icon-caret-left"></i>
              </div>
              <div class="row">
                <img :src="require('../../assets/'+item.imgsrc+'.png')"/>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-card shadow="always">
            <div slot="header">
              <div>课件教学</div>
            </div>
            <div id="main" style="width: 100%; height: 380px"></div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="5" v-for="item2 in ProgressList" :key="item2.id">
          <el-card shadow="always">
            <div class="data_box">
              <div class="circle_pro">
                <el-progress :width="70" :color="item2.color" type="circle" :percentage="item2.percentage"></el-progress>
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
            <el-table :data="tableData" border>
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
                  <el-progress :percentage="scope.row.influence.percentage" :color="scope.row.influence.customColor"></el-progress>
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
        visualMap: {
          type: "continuous",
          min: 0,
          max: 10,
          inRange: {
            color: ["#2D5F73", "#538EA6", "#F2D1B3", "#F2B8A2", "#F28C8C"],
          },
        },
        series: {
          type: "sunburst",
          data: [
            {
              name: "Grandpa",
              children: [
                {
                  name: "Uncle Leo",
                  value: 15,
                  children: [
                    {
                      name: "Cousin Jack",
                      value: 2,
                    },
                    {
                      name: "Cousin Mary",
                      value: 5,
                      children: [
                        {
                          name: "Jackson",
                          value: 2,
                        },
                      ],
                    },
                    {
                      name: "Cousin Ben",
                      value: 4,
                    },
                  ],
                },
                {
                  name: "Aunt Jane",
                  children: [
                    {
                      name: "Cousin Kate",
                      value: 4,
                    },
                  ],
                },
                {
                  name: "Father",
                  value: 10,
                  children: [
                    {
                      name: "Me",
                      value: 5,
                      itemStyle: {
                        color: "red",
                      },
                    },
                    {
                      name: "Brother Peter",
                      value: 1,
                    },
                  ],
                },
              ],
            },
            {
              name: "Mike",
              children: [
                {
                  name: "Uncle Dan",
                  children: [
                    {
                      name: "Cousin Lucy",
                      value: 3,
                    },
                    {
                      name: "Cousin Luck",
                      value: 4,
                      children: [
                        {
                          name: "Nephew",
                          value: 2,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "Nancy",
              children: [
                {
                  name: "Uncle Nike",
                  children: [
                    {
                      name: "Cousin Betty",
                      value: 1,
                    },
                    {
                      name: "Cousin Jenny",
                      value: 2,
                    },
                  ],
                },
              ],
            },
          ],
          radius: [0, "90%"],
          label: {
            rotate: "radial",
          },
        },
      },
      cardList: [
        { id: 1, num: "453" + "位", title: "老师", imgsrc: 'yonghu' },
        { id: 2, num: "453" + "人", title: "学生", imgsrc: 'yonghu' },
        { id: 3, num: "453" + "个", title: "课件", imgsrc: 'yonghu' },
        { id: 4, num: "453" + "位", title: "家长", imgsrc: 'yonghu' },
      ],
      ProgressList: [
        { id: 1, percentage: 67, value: "67", color: "#f56c6c", title: "Customers" },
        { id: 2, percentage: 76, value: "76", color: "#e6a23c", title: "Total Sales" },
        { id: 3, percentage: 17, value: "17", color: "#5cb87a", title: "New Orders" },
        { id: 4, percentage: 38, value: "38", color: "#6f7ad3", title: "Invoice" },
      ],
      tableData: [
        { num: "#675", name: "奥数初中组",  peoplenum: 120, coursewarenum: 110, tutorname: "张老师", influence: { percentage: 20, customColor: '#909399' } },
        { num: "#789", name: "计算机软件编程", peoplenum: 120, coursewarenum: 110, tutorname: "张老师", influence: { percentage: 40, customColor: '#909399' } },
        { num: "#675",  name: "奥数初中组", peoplenum: 120, coursewarenum: 110, tutorname: "张老师", influence: { percentage: 50, customColor: '#909399' } },
        { num: "#234",  name: "中国主持人小组", peoplenum: 120, coursewarenum: 110, tutorname: "张老师", influence: { percentage: 60, customColor: '#909399' } },
        { num: "#234", name: "无人机兴趣小组", peoplenum: 120, coursewarenum: 110, tutorname: "", influence: { percentage: 80, customColor: '#909399' } },
        { num: "#675", name: "VR建模兴趣组", peoplenum: 120, coursewarenum: 110, tutorname: "张老师", influence: { percentage: 100, customColor: '#909399'} }
      ]
    };
  },
  mounted() {
    this.myChart();
  },
  methods: {
    myChart() {
      var myChart = echarts.init(document.getElementById("main"));

      var option = this.option;

      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.card_color1 {
  background: linear-gradient(to bottom right ,#9853af,#623AA2) !important;
  .text_card{
  display: flex;
  justify-content: space-between;
  color: #fff;

  .row{
    display: flex;
    width: 70px;
    justify-content: center;
    align-items: center;
    img {
      width: 70%;
    }
  }
  .col{
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .num_people {
      font-size: 1.5rem;
      font-weight: 600 !important;
      padding-bottom: 1.5rem;
    }
    p {margin: 0;}
    }
  }
}
.card_color2 {
  background: linear-gradient(to bottom right, #fbc434 0%, #f66b4e 100%) !important;
  .text_card{
  display: flex;
  justify-content: space-between;
  color: #fff;

  .row{
    display: flex;
    width: 70px;
    justify-content: center;
    align-items: center;
    img {
      width: 70%;
    }
  }
  .col{
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .num_people {
      font-size: 1.5rem;
      font-weight: 600 !important;
      padding-bottom: 1.5rem;
    }
    p {margin: 0;}
    }
  }
}
.card_color3 {
  background: linear-gradient(to bottom right,#00f2fe 0%, #1e63c3 100%) !important;
  .text_card{
  display: flex;
  justify-content: space-between;
  color: #fff;

  .row{
    display: flex;
    width: 70px;
    justify-content: center;
    align-items: center;
    img {
      width: 70%;
    }
  }
  .col{
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .num_people {
      font-size: 1.5rem;
      font-weight: 600 !important;
      padding-bottom: 1.5rem;
    }
    p {margin: 0;}
    }
  }
}
.card_color4 {
  background: linear-gradient(to bottom right, #62fb62, #21a544) !important;
  .text_card{
  display: flex;
  justify-content: space-between;
  color: #fff;

  .row{
    display: flex;
    width: 70px;
    justify-content: center;
    align-items: center;
    img {
      width: 70%;
    }
  }
  .col{
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .num_people {
      font-size: 1.5rem;
      font-weight: 600 !important;
      padding-bottom: 1.5rem;
    }
    p {margin: 0;}
    }
  }
}

.data_box{
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