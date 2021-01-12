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
          <div class="img_content">
            <img v-if="item.modCoverimg" :src="item.modCoverimg" alt="模型图" :onerror="defaultPic" />
            <img v-else :src="item.modImage" alt="模型图" :onerror="defaultPic" />
          </div>
          <span>{{ item.modName }}</span>
        </div>
      </el-checkbox>
    </el-checkbox-group>
    <el-pagination
      :hide-on-single-page="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[ 20, 40, 80, 9999]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <span class="footer">
      <el-button :class="classWork ? 'pb_btn' : 'cn_btn'" @click="sendContentID">{{btnText}}</el-button>
    </span>
  </div>
</template>
<script>
export default {
  name: 'models',
  props: ['contentId','classWork'],
  data() {
    return {
      // 分页
      currentPage: 1,
      pageSize: 20,
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
    if(this.contentId) {
      this.sendMsg.contentId = this.contentId
    }
  },
  computed: {
    btnText: function() {
      return this.classWork ? '立即发布' : '确 定'
    }
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
  // max-height: 48vh;
  // overflow: overlay;
  .el-checkbox {
    // width: calc(10% -20px);
    width: 10%;
    margin: 1rem 0;
    .checknox_content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.5rem;
      .img_content {
        width: 90%;
        height: 0;
        padding-bottom: 90%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      span {
        width: 100%;
        overflow: auto;
        text-align: center;
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
      right: 8% !important;
      top: 5px !important;
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
    .el-checkbox__label {
      width: 100% !important;
      padding-left: 0 !important;
    }
  }
}
</style>