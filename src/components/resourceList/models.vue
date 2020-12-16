<template>
  <div style="padding: 20px">
    <el-row class="modName_box">
      <el-col :span="18">
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="模型搜索" v-model="modName">
          <el-button slot="append" icon="el-icon-search" @click="getModelsList"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-checkbox-group
      v-model="sendMsg.contentId"
      @change="handleCheckedCitiesChange"
      class="check_list">
      <el-checkbox v-for="item in modelsList" :key="item.id" :label="item.id">
        <div class="checknox_content">
          <img v-if="item.modCoverimg" :src="item.modCoverimg" alt="模型图" :onerror="defaultPic" />
          <span>{{ item.modName }}</span>
        </div>
      </el-checkbox>
    </el-checkbox-group>
    <el-pagination
      :hide-on-single-page="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[8, 20, 40, 80, 9999]"
      :page-size="8"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <span class="footer">
      <el-button type="primary" @click="sendContentID">确 定</el-button>
    </span>
  </div>
</template>
<script>
export default {
  name: 'models',
  data() {
    return {
      // 分页
      currentPage: 1,
      pageSize: 8,
      total: 0,
      //
      sendMsg: {
        contentId: [],
        contentDialogVisible: false,
      },
      modelsList: [],
      checkAll: false,
      allModels: [],
      modName: '',
      defaultPic: 'this.src="'+require('@/assets/def_avater.jpg')+'"'
    };
  },
  created() {
    this.sendMsg.contentId = [];
    this.getModelsList();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getModelsList()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getModelsList();
    },
    // 获取模型列表
    async getModelsList() {
      const { data: res } = await this.$http.post(`api/models/lists`, {
        limit: this.pageSize,
        page: this.currentPage,
        modName: this.modName
      });
      if (res.statusCode !== 200) return this.$message.error(res.msg);
      this.modelsList = res.data.data;
      res.data.data.forEach((item) => {
        this.allModels.push(item.id);
      });

      this.total = res.data.total;
      this.pageSize = res.data.per_page;
      this.currentPage = res.data.current_page;
    },
    // 发送内容
    sendContentID() {
      this.$emit("func", this.sendMsg);
    },
    handleCheckAllChange(val) {
      this.sendMsg.contentId = val ? this.allModels : [];
    },
    handleCheckedCitiesChange(value) {
      if (this.sendMsg.contentId.length == this.modelsList.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modName_box {
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

<style lang="scss">
.check_list {
  .el-checkbox {
    .el-checkbox__input {
      position: absolute !important;
      right: 1px !important;
      top: 1px !important;
      .el-checkbox__inner {
        border: 2px solid #DCDFE6;
        border-radius: 50%;
        width: 20px;
        height: 20px;
      }
      .el-checkbox__inner::after {
        height: 12px;
        left: 6px;
        font-weight: 600;
      }
    }
  }
}
</style>