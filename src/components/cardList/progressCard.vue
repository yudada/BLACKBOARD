<template>
  <div>
        <el-col :span="5" v-for="item in cardList" :key="item.id">
          <el-card :class="'pro_card'+ item.id">
            <div class="progress_box">
              <div class="row">
                <el-progress type="circle" :percentage="item.percentage" :width="70" :color="item.color"></el-progress>
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
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardList: [
        { id: 1, num: "30" + ' ' + "天", title: "打卡率", color: '#CA8411', percentage: 90 },
        { id: 2, num: "150" + ' ' + "次", title: "作业完成效率", color: '#2B9146', percentage: 80 },
        { id: 3, num: "3500" + ' ' + "题", title: "答题正确率", color: '#F66B4E', percentage: 56 },
        { id: 4, num: "345" + ' ' + "分钟", title: "阅读时长", color: '#3578D5', percentage: 25 },
      ],
      
    }
  },
}
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
</style>

<style lang="scss">
.progress_box {
  .el-progress__text {
    color: #fff;
    font-size: 18px !important;
  }
}

@media (max-width: 1280px) {
  .widgets_main {
    .el-col-5 {
      width: 25% !important;
    }
  }
}
</style>