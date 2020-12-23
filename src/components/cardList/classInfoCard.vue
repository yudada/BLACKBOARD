<template>
  <div class="class-info">
    <el-col :span="5" v-for="item2 in classInfoList" :key="item2.id">
      <el-card :body-style="{ padding: '16px' }">
        <div class="text_card">
          <div class="row" :class="'bg_color' + item2.id">
            <img :src="require('@/assets/icon/' + item2.imgsrc + '.png')" />
          </div>
          <div class="col">
            <p class="num_people">{{ item2.num }}</p>
            <p>{{ item2.title }}</p>
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
      classInfoList: [
        { id: 1, num: '55', title: '班级人数', imgsrc: 'yonghu' },
        { id: 2, num: '1270', title: '点赞数', imgsrc: 'zan' },
        { id: 3, num: '4645', title: '笔记留言', imgsrc: 'zan' },
        { id: 4, num: '454', title: 'POST', imgsrc: 'youjian' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.class-info {
  height: 100%;
  .text_card {
    display: flex;
    justify-content: space-between;
    color: #6b3e9e;
    .row {
      width: 70px;
      height: 70px;
      display: flex;
      width: 70px;
      height: 70px;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      img {
        width: 50%;
      }
    }
    .col {
      flex: 3;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 20px;
      .num_people {
        font-size: 32px;
      }
      p {
        margin: 0;
      }
    }
    .bg_color1 {
      background: linear-gradient(to bottom right, #9853af, #623aa2) !important;
      box-shadow: 0 7px 30px rgba(152, 83, 175, 0.5) !important;
    }
    .bg_color2 {
      background: linear-gradient(
        to bottom right,
        #fbc434 0%,
        #f66b4e 100%
      ) !important;
      box-shadow: 0 7px 30px rgba(251, 176, 52, 0.5) !important;
    }
    .bg_color3 {
      background: linear-gradient(to bottom right, #00f2fe 0%, #2e78df 100%);
      box-shadow: 0 7px 30px rgba(40, 146, 235, 0.5) !important;
    }
    .bg_color4 {
      background: linear-gradient(to bottom right, #62fb62, #21a544) !important;
      box-shadow: 0 7px 30px rgba(26, 122, 16, 0.5) !important;
    }
  }
}
</style>

<style lang="scss">
@media (max-width: 1280px) {
  .class-info {
    .el-col-5 {
      width: 25% !important;
    }
  }
}
@media (max-width: 768px) {
  .class-info {
    .el-col-5 {
      width: 50% !important;
    }
  }
}
</style>