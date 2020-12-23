<template>
  <div style="height: 100%;">
    <el-card class="photo_box">
      <div class="card_img">
        <img src="@/assets/images/photos/12.jpeg" alt="" />
      </div>
      <div class="card_info">
        <div class="ava">
          <div class="ava_img">
            <img src="@/assets/images/faces/male/18.jpeg" alt="" />
            <div class="info">
              <p>{{ updateInfo.name }}</p>
              <p>{{ updateInfo.time }}</p>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      updateInfo: { name: '张玉燕', time: '12小时前' },
    }
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  height: 100%;
}
.photo_box {
  .card_img {
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
      margin: 1rem 0 0 0;
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
            color: #afacac;
            font-size: 0.5rem;
          }
        }
      }
      .ava_info {
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

<style lang="scss">
.photo_box {
  height: 100%;
  .el-card__body {
    height: calc(100%);
    overflow: overlay;
    padding: 0;
  }
  .el-card__body::-webkit-scrollbar {
    display: none;
  }
}
</style>