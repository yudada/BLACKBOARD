<template>
  <el-card :body-style="{ padding: '0' }">
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
</template>

<script>
export default {
  data() {
    return {
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
    }
  },
}
</script>

<style lang="scss" scoped>
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