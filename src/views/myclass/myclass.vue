<template>
  <div class="widgets_main">
    <div class="main_header">
      <h4>一年五班</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的班级</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="widgets_concent">
      <!-- 内容头部 进度卡 -->
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

      <!-- 班级信息 -->
      <el-row :gutter="20">
        <el-col :span="5" v-for="item2 in classInfoList" :key="item2.id">
          <el-card :body-style="{ padding: '16px'}">
            <div :class="'text_card' + item2.id">
              <div class="row">
                <img :src="require('../../assets/'+item2.imgsrc+'.png')"/>
              </div>
              <div class="col">
                <p class="num_people">{{ item2.num }}</p>
                <p>{{ item2.title }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="always">
            <div slot="header">
              <div>答题准确率TOP5</div>
            </div>
            <div v-for="item in accuracyList" :key="item.id" class="text item">
              <div class="accuracy_card">
                <div class="accuracy_name">
                  <span>{{ item.name }}</span>
                  <span>{{ item.accuracy }}</span>
                </div>
                <h4 :style="{ color: item.color }">TOP{{ item.top }}</h4>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="always">
            <div slot="header">
              <div>阅读优秀TOP5</div>
            </div>
            <div v-for="(item, index) in readList" :key="index" :style="{ margin: '1.5rem'}">
              <div class="read_card">
                <div class="read_info">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  <div class="read_name">
                    <span>{{ item.name }}</span>
                    <span>{{ item.readtime }}</span>
                  </div>
                </div>
                <el-button class="read_btn">TOP{{ item.top }}</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 学生动态 -->
        <el-col :span="8">
          <el-card shadow="always" :body-style="{ padding: 0 }" class="photo_box">
            <div class="card_img">
              <img src="../../assets/images/photos/12.jpeg" alt="">
            </div>
            <div class="card_info">
              <div class="ava">
                <div class="ava_img">
                  <img src="../../assets/images/faces/male/18.jpeg" alt="">
                  <div class="info">
                    <p>{{updateInfo.name}}</p>
                    <p>{{updateInfo.time}}</p>
                  </div>
                </div>
                <div class="ava_info">
                  <i class="el-icon-thumb"></i>
                  <i class="el-icon-chat-square"></i>
                  <i class="el-icon-share"></i>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="always">
            <div slot="header">
              <div>阅读课本</div>
            </div>
            <div v-for="(subject, index) in subjectList" :key="index" :style="{ margin: '1.5rem'}">
              <div class="subject_info">
                <span>{{ subject.name }}</span>
                <span>{{ subject.percentage }}%</span>
              </div>
              <el-progress :show-text="false" :percentage="subject.percentage" :status="subject.status" :style="{ width: '100%' }"></el-progress>
            </div>
          </el-card>
        </el-col>

        <el-col :span="16">
          <el-card :body-style="{ padding: '0.5rem'}">
            <div slot="header">
              <span>学生风彩</span>
            </div>
            <el-row :gutter="10" class="gallery_box">
              <el-col :span="8" v-for="(item, index) in studentList" :key="index">
                <img :src="require('../../assets/images/photos/'+ item.imgsrc +'.jpeg')"/>
              </el-col>
            </el-row>
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
      cardList: [
        { id: 1, num: "30" + ' ' + "天", title: "打卡率", color: '#CA8411', percentage: 90 },
        { id: 2, num: "150" + ' ' + "次", title: "作业完成效率", color: '#2B9146', percentage: 80 },
        { id: 3, num: "3500" + ' ' + "题", title: "答题正确率", color: '#F66B4E', percentage: 56 },
        { id: 4, num: "3450" + ' ' + "分钟", title: "阅读时长", color: '#3578D5', percentage: 25 },
      ],
      classInfoList: [
        { id: 1, num: "55", title: "班级人数", imgsrc:'yonghu' },
        { id: 2, num: "1270", title: "点赞数", imgsrc:'zan' },
        { id: 3, num: "4645", title: "笔记留言", imgsrc:'zan' },
        { id: 4, num: "454", title: "POST", imgsrc:'youjian' },
      ],
      readList: [
        { name: "周冰雪", readtime: "阅读时长10003分钟", top: '1' },
        { name: "周冰雪", readtime: "阅读时长12003分钟", top: '2' },
        { name: "周冰雪", readtime: "阅读时长13003分钟", top: '3' },
        { name: "周冰雪", readtime: "阅读时长10023分钟", top: '4' },
        { name: "周冰雪", readtime: "阅读时长10023分钟", top: '5' }
      ],
      accuracyList: [
        { name: "李志军", accuracy: "答题110套，正确率100%", top:'01', color: '#6b3e9e' },
        { name: "岳杰豪", accuracy: "答题108套，正确率100%", top:'02', color: '#4ecc48' },
        { name: "罗伯特", accuracy: "答题106套，正确率99%", top:'03', color: '#ecb403' },
        { name: "毛新民", accuracy: "答题100套，正确率99%", top:'04', color: '#f66b4e' },
        { name: "陈道明", accuracy: "答题100套，正确率98%", top:'05', color: '#f66b4b ' }
      ],
      subjectList: [
        { name: "生物", percentage: 70, status: "success" },
        { name: "语文", percentage: 84, status: "success" },
        { name: "地理", percentage: 43, status: "warning" },
        { name: "英语", percentage: 34, status: "exception" },
        { name: "数学", percentage: 34, status: "exception" }
      ],
      studentList: [
        { name: 'weekly', imgsrc: '1' },
        { name: 'weekly', imgsrc: '2' },
        { name: 'weekly', imgsrc: '3' },
        { name: 'weekly', imgsrc: '4' },
        { name: 'weekly', imgsrc: '5' },
        { name: 'weekly', imgsrc: '6' },
      ],
      updateInfo: { name: '张玉燕', time: '12小时前' }
    }
  }
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

.text_card1{
  display: flex;
  justify-content: space-between;
  color: #6b3e9e;
  .row{
    width: 70px;
    height: 70px;
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
  color: #6b3e9e;
  .row{
    width: 70px;
    height: 70px;
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
  color: #6b3e9e;
  .row{
    width: 70px;
    height: 70px;
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
  color: #6b3e9e;
  .row{
    width: 70px;
    height: 70px;
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

.read_card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .read_info{
    display: flex;
    
    .read_name {
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    span:nth-child(1) {
      color: #636262;
    }
    span:nth-child(2) {
      color: #AFACAC;
    }
  }
  }
  
}
.btn_text {
  border-top: 1px solid #EBEEF5;
  box-sizing: border-box;
  text-align: center;
}
.read_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.5rem;
  color: #fff;
  background: linear-gradient(to bottom right, #9853af, #623AA2);
  border-color: #913ad8;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
}

.read_btn:hover, .read_btn:focus {
  color: #fff;
}
.accuracy_card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #EBEEF5;
  box-sizing: border-box;
  .accuracy_name {
    display: flex;
    flex-direction: column;
    span:nth-child(1) {
      color: #636262;
      font-size: 16px;
      font-weight: 600;
    }
    span:nth-child(2) {
      color: #636262;
      font-size: 14px;
    }
  }
}
.el-card__body:last-child {
  border-bottom: none !important;
}
.subject_info{
  display: flex;
  justify-content: space-between;
  span:nth-child(1) {
    color: #636262;
    font-size: 1rem;
  }
  span:nth-child(2) {
    color: #707070;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
  }
}
.gallery_box{
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  img {
    width: 100%;
    border-radius: 3px !important;
  }
}

.photo_box {
  .card_img{
  img {
    width: 100%;
  }
  }
  .card_info {
    padding: 1rem;
    .ava {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin: 1rem 0 0 0 ;
      .ava_img {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 25%;
          border-radius: 100%;
          margin-right: 1rem;
        }
        .info {
          p {
            margin: 0;
          }
          p:nth-child(1) {
            color: #707070;
            font-size: 1rem;
          }
          p:nth-child(2) {
            color: #AFACAC;
            font-size: 0.5rem;
          }
        }
      }
      .ava_info{
        display: flex;
        justify-content: space-between;
        i {
          color: #707070;
          margin: 0.5rem;
        }
      }
    }
  }
}
</style>