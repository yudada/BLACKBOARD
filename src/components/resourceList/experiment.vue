<template>
  <div style="padding: 20px">
    <el-row class="expName_box">
      <el-col :span="18">
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="实验搜索" v-model="expName">
          <el-button slot="append" icon="el-icon-search" @click="getExperimentsList"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-checkbox-group
      v-model="sendMsg.contentId"
      @change="handleCheckedCitiesChange">
      <el-checkbox v-for="item in experimentsList" :key="item.id" :label="item.id">
        <div class="checknox_content">
          <span>{{ item.expName }}</span>
        </div>
      </el-checkbox>
    </el-checkbox-group>
    <el-pagination
      :hide-on-single-page="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[8, 20, 40, 80, 9999]"
      :page-size="40"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <span class="footer" v-show="!hidenBtn">
      <el-button type="primary" @click="sendContentID">确 定</el-button>
    </span>
  </div>
</template>
<script>
export default {
  props: ['hidenBtn'],
  name: 'models',
  data() {
    return {
      // 分页
      currentPage: 1,
      pageSize: 40,
      total: 0,
      experimentsList: [],
      sendMsg: {
        contentId: [],
        contentDialogVisible: false,
      },
      checkAll: false,
      allExprimrnts: [],
      expName: ''
    };
  },
  created() {
    this.getExperimentsList();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getExperimentsList()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getExperimentsList();
    },
    // 获取实验列表
    async getExperimentsList() {
      const { data: res } = await this.$http.post(`api/experiments/lists`, {
        limit: this.pageSize,
        page: this.currentPage,
        expName: this.expName
      });
      if (res.statusCode !== 200) return this.$message.error(res.msg);
      this.experimentsList = res.data.data;
      res.data.data.forEach((item) => {
        this.allExprimrnts.push(item.id);
      });

      this.total = res.data.total;
      this.pageSize = res.data.per_page;
      this.currentPage = res.data.current_page;
    },
    // 发送内容
    sendContentID() {
      this.$emit("func", this.sendMsg);
    },
    // 全选
    handleCheckAllChange(val) {
      this.sendMsg.contentId = val ? this.allExprimrnts : [];
    },
    handleCheckedCitiesChange(value) {
      if (this.sendMsg.contentId.length == this.experimentsList.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.expName_box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0;
}
.el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  .el-checkbox {
    width: 20%;
    margin: 1rem;
    .checknox_content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.5rem;
      img {
        width: 100%;
      }
    }
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
}
</style>

