<template>
  <div class="blog_main">
    <Breadcrumb :navData="navData" />

    <div class="blog_concent">
      <el-row :gutter="20" >
        <el-col :span="6" v-for="item in cardList" :key="item.id" class="addpadding iapd_w">
          <el-card shadow="always" :body-style="{ padding: 0 }">
            <div class="card_img">
              <img v-if="item.image" :src="item.image" :onerror="defaultPic"  />
              <img v-else src="@/assets/images/thumbnails/thumb1.jpeg" />
            </div>
            <div class="card_info">
              <div class="card_text">
                <span>学习宣言：</span>
                <p>{{item.content}}</p>
              </div>
              <div class="ava">
                <div class="ava_img">
                  <img v-if="item.photo" :src="item.photo" :onerror="defaultPic"  />
                  <img v-else src="@/assets/def_avater.jpg" />
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
import { studentLife } from '@/api/studentManage'
import studentDetail from './components/studentDetail.vue';
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { studentDetail, Breadcrumb },
  data() {
    return {
      navData: {
        title: '学生管理',
        childTitle: '学生风彩'
      },
      cardList: [],
      defaultPic: 'this.src="'+require('@/assets/def_avater.jpg')+'"'
    }
  },
  created() {
    this.getStudentLife();
  },
  methods: {
   getStudentLife() {
     studentLife().then(res=>{
       const{ data } = res
       this.cardList = data
     })
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
          cursor: pointer;
          font-size: large;
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
