<template>
  <div class="wisdomBook_main">
    <div class="main_header">
      <h4>智慧课本</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>智慧课本</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="wisdomBook_concent">
      <el-row :gutter="20">
        <el-col :span="5" v-for="(item, index) in subjectList" :key="index" class="addpadding iapd_w">
          <el-card shadow="always" :body-style="{ padding: 0 }" @click.native="openBookDialogVisible(item)">
            <div class="card_img">
<<<<<<< HEAD
              <img :src="require('../../assets/book/'+item.bookName+'.jpg')" />
=======
              <img :src="item.bookName" />
>>>>>>> 67d9ceec6d312c66354d36e482661140709b33e3
            </div>
            <div class="card_info">
              <a href="#"><strong>{{ item.bookName }}</strong> {{ item.subName}}</a>
            </div>
          </el-card>
        </el-col>
        <el-dialog :title="dialigTitle" :visible.sync="bookDialogVisible" fullscreen :modal="false" :append-to-body="true" custom-class="dialog">
          <iframe src="https://edudom.11dom.com/courses/18#/section1/part1" frameborder="0"></iframe>
        </el-dialog>
      </el-row>
      
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      subjectList: [],
      bookDialogVisible: false,
      dialigTitle: ''
    };
  },
  created() {
    this.getbookList();
  },
  methods: {
    async getbookList() {
<<<<<<< HEAD
      const { data: res } = await this.$http.get('http://192.168.8.123/api/textbook/lists')
=======
      const { data: res } = await this.$http.get('/api/textbook/lists')
>>>>>>> 67d9ceec6d312c66354d36e482661140709b33e3
      if (res.statusCode !== 200) return this.$messsage.error('获取课本列表失败！')
      console.log(res.data);
      this.subjectList = res.data;
    },
    openBookDialogVisible(item) {
      console.log(item.bookName);
      this.bookDialogVisible = true;
      this.dialigTitle = item.bookName + item.subName;
    }
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  cursor: pointer;
}
.wisdomBook_concent {
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
      margin: 2rem 0 1rem 0;
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
        }
      }
      .ava_info {
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
  .iapd_w {
    width: 50% !important;
    margin-bottom: 1rem;
  }
}

@media (max-width: 375px) {
  .iapd_w {
    width: 100% !important;
  }
}
</style>
