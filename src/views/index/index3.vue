<template>
  <div class="index3_main">
    <Breadcrumb :navData="navData" />

    <div class="index3_concent">
      <el-row :gutter="20">
        <user-card2 :cardList="cardList" />
      </el-row>

      <el-row :gutter="20" :style="{ height:'480px'}">
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
              <div>阅读笔记</div>
            </div>
            <el-timeline>
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :icon="activity.icon"
                  :type="activity.type"
                  :color="activity.color"
                  :size="activity.size"
                  :timestamp="activity.timestamp"
                  placement="top"
                >
                  {{ activity.content }}
                </el-timeline-item>
              </el-timeline>
            </el-timeline>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" :style="{ height:'40vh'}">
        <el-col :span="8">
          <el-card>
            <div slot="header">
              <span>优秀榜单</span>
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
        <el-col :span="8">
          <el-card>
            <div slot="header">
              <span>Projects</span>
            </div>
            <div class="card_progress">
              <el-progress type="circle" :percentage="100" ></el-progress>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div slot="header">
              <span>Team</span>
            </div>
            <el-calendar v-model="nowDate"></el-calendar>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" :style="{ height:'auto'}">
        <el-col :span="6">
          <el-card >
            <div slot="header">
              <span>答题小能手</span>
            </div>
            <div v-for="(answer, index) in answerList" :key="index" class="answer_box">
              <span class="answer_name">{{answer.name}}</span>
              <span class="answer_percentage">
                <el-tag size="small">{{answer.percentage}}%</el-tag>
              </span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card>
            <div slot="header">
              <span>Crypt Marketing Values</span>
            </div>
            <el-table :data="cryptData" border style="width: 100%">
              <el-table-column type="index" label="NO"></el-table-column>
              <el-table-column prop="icon" label="ICON"></el-table-column>
              <el-table-column prop="currency" label="CURRENCY"></el-table-column>
              <el-table-column prop="price" label="PRICE"></el-table-column>
              <el-table-column prop="market" label="MARKET CAP"></el-table-column>
              <el-table-column prop="volume" label="VOLUME 1D"></el-table-column>
              <el-table-column prop="change" label="CHANGE % (1D)">
                <template slot-scope="scope">
                  <el-tag size="small">{{ scope.row.change }}%</el-tag>
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
import userCard2 from '@/components/cardList/userCard2';
import Breadcrumb from '@/components/breadcrumb.vue';
export default {
  components: { userCard2, Breadcrumb },
  data() {
    return {
      navData: {
        title: '校园大脑',
        childTitle: '二年级数据看板'
      },
      option: {
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
        { id: 1, num: "453" + "位", title: "老师", imgsrc: "jiaoshi" },
        { id: 2, num: "453" + "人", title: "学生", imgsrc: "xuesheng" },
        { id: 3, num: "453" + "个", title: "课件", imgsrc: "kejian" },
        { id: 4, num: "453" + "位", title: "家长", imgsrc: "jiazhang" },
      ],
      progressList: [
        { id: 1, name: "雷珊珊", percentage: 70, status: "success" },
        { id: 2, name: "胡天轩", percentage: 84, status: "success" },
        { id: 3, name: "吴琳琳", percentage: 43, status: "warning" },
        { id: 4, name: "何杰", percentage: 34, status: "exception" },
      ],
      activities: [{
          content: '阅读《背景》有感，才知天下父亲的那份平凡的伟大。特别感动。故事简单沉思。',
          timestamp: '胡于鹏 2018-04-12 20:46',
          color: '#623AA2'
        }, {
          content: '体验《细胞结构》有感，细胞的结构原来可以这么生动灵活，让我学习的非常轻松快乐。我超喜欢。',
          timestamp: '张玲 2018-04-03 20:46',
          color: '#623AA2'
        }, {
          content: '阅读《背景》有感，才知天下父亲的那份平凡的伟大。特别感动。故事简单沉思。',
          timestamp: '洪志明 2018-04-03 20:46',
          color: '#623AA2'
        },{
          content: '阅读《背景》有感，才知天下父亲的那份平凡的伟大。特别感动。故事简单沉思。',
          timestamp: '洪志明 2018-04-03 20:46',
          color: '#623AA2'
        }
      ],
      topList: [
        { name: "王小虎", enName: 'Web Designer', class: "一年3班", addText: "2019年度", top: '1' },
        { name: "吴天宇", enName: 'Web Designer', class: "一年3班", addText: "2019年度", top: '2' },
        { name: "李梅", enName: 'Web Designer', class: "一年3班", addText: "2019年度", top: '3' },
        { name: "胡于琳", enName: 'Web Designer', class: "一年3班", addText: "2019年度", top: '4' }
      ],
      nowDate: new Date(),
      answerList: [
        { name:'李军', percentage: 85 },
        { name:'王一飞', percentage: 85 },
        { name:'李军', percentage: 85 },
        { name:'王一飞', percentage: 85 },
        { name:'李军', percentage: 85 },
        { name:'王一飞', percentage: 85 },
        { name:'李军', percentage: 85 },
        { name:'王一飞', percentage: 85 },
        { name:'李军', percentage: 85 }
      ],
      cryptData: [
        { icon:'', currency:'Bitcoin', price:'$ 10513.00', market:'$ 51,191,183,730', volume:'$ 10,133,400,000',change:'0.66%' },
        { icon:'', currency:'Bitcoin', price:'$ 10513.00', market:'$ 51,191,183,730', volume:'$ 10,133,400,000',change:'0.66%' },
        { icon:'', currency:'Bitcoin', price:'$ 10513.00', market:'$ 51,191,183,730', volume:'$ 10,133,400,000',change:'0.66%' },
        { icon:'', currency:'Bitcoin', price:'$ 10513.00', market:'$ 51,191,183,730', volume:'$ 10,133,400,000',change:'0.66%' },
        { icon:'', currency:'Bitcoin', price:'$ 10513.00', market:'$ 51,191,183,730', volume:'$ 10,133,400,000',change:'0.66%' }
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
.card_progress {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-progress {
    width: auto !important;
  }
}

.answer_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem;
  font-size: 14px;
  color: #636262;
}

// 卡片
.el-col, .el-card  {
  height: 100%;
}
.el-card {
  overflow: scroll;
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