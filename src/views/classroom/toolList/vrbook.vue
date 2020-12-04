<template>
  <el-card>
    <div slot="header">
      <span>智慧课本</span>
    </div>
    <div class="book_list">
      <el-col :span="5" v-for="(item, index) in subjectList" :key="index">
        <el-card :body-style="{ padding: 0 }" @click.native="dialogVisible = true">
          <div class="card_img">
            <img :src="require('../../../assets/book/'+item.id+'.jpg')" />
          </div>
          <div class="card_info">
            <a href="#"><strong>{{ item.bookName }}</strong> {{ item.subName}}</a>
          </div>
        </el-card>
      </el-col>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" fullscreen :modal="false" :append-to-body="true" custom-class="dialog">
      <iframe src="https://edudom.11dom.com/courses/18#/section1/part1" frameborder="0"></iframe>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'vrbook',
  data() {
    return {
      subjectList: [],
      dialogVisible: false
    };
  },
  created() {
    this.getbookList();
  },
  methods: {
    async getbookList() {
      const { data: res } = await this.$http.get('api/textbook/lists')
      if (res.statusCode !== 200) return this.$messsage.error('获取课本列表失败！')
      console.log(res.data);
      this.subjectList = res.data
    }
  }
};
</script>

<style lang="scss" scoped>
.book_list{
  .el-card {
    cursor: pointer;
    margin-bottom: 2rem;
  }
  img {
    width: 100%;
  }
  .card_info{
    padding: 1rem;
  }
}
</style>