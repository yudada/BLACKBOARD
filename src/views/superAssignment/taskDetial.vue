<template>
  <div class="detial_main">
    <div class="main_header">
      <h4>作业详情</h4>
      <el-button type="text" @click="goBack" class="back_btn">返回</el-button>
    </div>

    <div class="detial_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
              <el-table :data="detialTableData" style="width: 100%" v-loading="loading">
                <el-table-column prop="stuName" label="学生姓名" width="120"></el-table-column>
                <el-table-column prop="exeStartTime" label="开始时间"></el-table-column>
                <el-table-column prop="exeEndTime" label="结束时间"></el-table-column>
                <el-table-column prop="status" label="状态">
                  <template slot-scope="scope">
                    <el-tag type="info" v-show="scope.row.status === 0">未开始</el-tag>
                    <el-tag type="warning" v-show="scope.row.status === 1">待完成(进行中)</el-tag>
                    <el-tag type="success" v-show="scope.row.status === 2">已完成</el-tag>
                    <el-tag type="danger" v-show="scope.row.status === 3">已超时</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="finishTime" label="作业完成时间"></el-table-column>
                <el-table-column prop="attachCount" label="作业内容数量" width="120" align="center"></el-table-column>
                <el-table-column prop="attachFinalTime" label="最后的答题时间"></el-table-column>
                <el-table-column prop="attachCompletedCount" label="已完成的内容数量" width="140" align="center"></el-table-column>
              </el-table>
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
      detialTableData: [],
      loading: true
    };
  },
  created() {
      this.getdetail();
  },
  methods: {
      // 返回按钮
    goBack() {
      this.$router.go(-1);
    },
    async getdetail() {
      const { data: res } = await this.$http.post(`api/exercises/detail/${this.id}`);
      if (res.statusCode !== 200) return this.$message.error('获取详细信息失败！')
      console.log(res);
      this.detialTableData = res.data;
      this.loading = false;
    },
  },
  computed: {
    id: function () {
      return this.$route.query.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.back_btn {
  color: #fff;
  font-size: 18px;
}
.back_btn:hover {
  color: #fff;
}
</style>
