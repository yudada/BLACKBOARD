<template>
  <div class="blog_main">
    <div class="main_header">
      <h4>学生风彩</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">班级管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>学生风彩</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="blog_concent">
      <el-row :gutter="20" >
        <el-col :span="6" v-for="item in cardList" :key="item.id" class="addpadding iapd_w">
          <el-card shadow="always" :body-style="{ padding: 0 }">
            <div class="card_img">
              <img src="../../assets/images/photos/12.jpeg" alt="">
            </div>
            <div class="card_info">
              <div class="card_text">
                <span>学习宣言：</span>
                <p>{{item.content}}</p>
              </div>
              <div class="ava">
                <div class="ava_img">
                  <img src="../../assets/images/faces/male/18.jpeg" alt="">
                  <div class="info">
                    <p>{{item.realName}}</p>
                    <p>{{item.className}}</p>
                  </div>
                </div>
                <div class="ava_info">
                  <i class="iconfont icon-xin"></i>
                  <i class="iconfont icon-zan"></i>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardList: []
    }
  },
  created() {
    this.getStudentLife();
  },
  methods: {
   async getStudentLife() {
     const { data: res } = await this.$http.post(`api/student/life`)
     if(res.statusCode !==200 ) return this.$message.error(res.msg);
     this.cardList = res.data;
   } 
  }
}
</script>

<style lang="scss" scoped>
.blog_concent {
  .card_img{
  img {
    width: 100%;
    }
  }
  .card_info {
    padding: 1rem;
    .card_text {
      height: 10vh;
      span { font-size: 1.5rem;}
      p{
        color: #AFACAC;
        font-size: 1rem;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    .ava {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin: 2rem 0 1rem 0 ;
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
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          p{ font-size: 0.75rem; color: #AFACAC; margin: 0; }
        }
      }
      .ava_info{
        display: flex;
        justify-content: space-between;
        i {
          margin: 0.5rem;
        }
      }
    }
  }
}
.addpadding {
  padding-bottom: 20px;
}
@media (max-width: 768px) {
  .iapd_w{
    width: 50% !important;
    margin-bottom: 1rem;
  }
}

@media (max-width: 375px) {
  .iapd_w{
  width: 100% !important;
  }
}
</style>
