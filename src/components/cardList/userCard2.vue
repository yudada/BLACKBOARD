<template>
  <div>
    <el-col :span="5" v-for="item in cardList" :key="item.id">
      <el-card :body-style="{ padding: '20px' }">
        <div :class="'text_card' + item.id">
          <div class="col">
            <p>{{ item.num }}</p>
            <p class="num_people">{{ item.title }}</p>
          </div>
          <div class="row">
            <img :src="require('@/assets/icon/' + item.imgsrc + '.png')" />
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: ['cardList']
}
</script>

<style lang="scss" scoped>
.text_card1 {
  display: flex;
  justify-content: space-between;
  color: #636262;
  .row {
    display: flex;
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom right, #9853af, #623aa2) !important;
    border-radius: 50%;
    box-shadow: 0 7px 30px rgba(152, 83, 175, 0.5) !important;
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
}
.text_card2 {
  display: flex;
  justify-content: space-between;
  color: #636262;
  .row {
    display: flex;
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      to bottom right,
      #fbc434 0%,
      #f66b4e 100%
    ) !important;
    border-radius: 50%;
    box-shadow: 0 7px 30px rgba(251, 176, 52, 0.5) !important;
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
}
.text_card3 {
  display: flex;
  justify-content: space-between;
  color: #636262;
  .row {
    display: flex;
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom right, #00f2fe 0%, #2e78df 100%);
    border-radius: 50%;
    box-shadow: 0 7px 30px rgba(40, 146, 235, 0.5) !important;
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
}
.text_card4 {
  display: flex;
  justify-content: space-between;
  color: #636262;
  .row {
    display: flex;
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom right, #62fb62, #21a544) !important;
    border-radius: 50%;
    box-shadow: 0 7px 30px rgba(26, 122, 16, 0.5) !important;
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
}

</style>