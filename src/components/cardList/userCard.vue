<template>
  <div>
    <el-col :span="5" v-for="(item, index) in cardList" :key="index">
      <el-card :body-style="{ padding: 0 }">
        <div class="text_card">
          <div class="row" :class="'bg_color' + index">
            <img :src="require('@/assets/icon/' + item.imgsrc + '.png')" />
          </div>
          <div class="col">
            <p class="num_people">{{ item.num }}</p>
            <p>{{ item.title }}</p>
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: ['cardList'],
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.text_card {
  display: flex;
  justify-content: space-between;
  color: #707070;
  .row {
    display: flex;
    width: 80px;
    justify-content: center;
    align-items: center;
    img {
      width: 50%;
    }
  }
  .col {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px 0 15px 10px;
    .num_people {
      font-size: 2em;
    }
    p {
      margin: 0;
    }
  }
  .bg_color0 {
    background: linear-gradient(to bottom right, #9853af, #623aa2) !important;
    box-shadow: 0 7px 30px rgba(152, 83, 175, 0.5) !important;
  }
  .bg_color1 {
    background: linear-gradient(to bottom right, #fbc434 0%, #f66b4e) !important;
    box-shadow: 0 7px 30px rgba(251, 176, 52, 0.5) !important;
  }
  .bg_color2 {
    background: linear-gradient(to bottom right, #00f2fe 0%, #2e78df);
    box-shadow: 0 7px 30px rgba(40, 146, 235, 0.5) !important;
  }
  .bg_color3 {
    background: linear-gradient(to bottom right, #62fb62, #21a544) !important;
    box-shadow: 0 7px 30px rgba(26, 122, 16, 0.5) !important;
  }
}
.card_img {
  img {
    width: 100%;
  }
}
.card_info {
  padding: 0 20px;
  h3,
  p {
    color: #636262;
  }
  h3 {
    margin: 0;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }
}
</style>