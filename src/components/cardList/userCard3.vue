<template>
  <div>
    <el-col :span="5" v-for="item in cardList" :key="item.id">
      <el-card
        :body-style="{ padding: '20px' }"
        :class="'card_color' + item.id"
      >
        <div class="text_card">
          <div class="col">
            <p>{{ item.title }}</p>
            <p class="num_people">{{ item.num }}</p>
            <i class="el-icon-caret-left"></i>
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
  name: 'UserCard3',
  props: ['cardList'],
}
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

</style>