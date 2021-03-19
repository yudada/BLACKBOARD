<template>
  <div class="model-list">
    <!-- 模型列表 -->
    <div class="resource_box">
      <div
        v-for="item in modelsList"
        :key="item.id"
        :label="item.id"
        style="width: 10%; position: relative"
      >
        <div class="img_model" @click="modelDialogVisible(item)">
          <div class="model-img">
            <img v-if="item.modCoverimg" :src="item.modCoverimg" alt="模型图" />
          </div>
          <span>{{ item.modName }}</span>
        </div>
        <el-button
          class="collect-button"
          type="text"
          :icon="item.is_collect === 1 ? 'el-icon-star-on' : 'el-icon-star-off'"
          :title="item.is_collect === 1 ? '取消收藏' : '收藏'"
          @click="setModelCollect(item.is_collect, item.id)"
        >
        </el-button>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      :hide-on-single-page="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[40, 80, 100, 1000]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      v-show="modelsList.length > pageSize"
    >
    </el-pagination>
    <!-- 模型浏览对话框 -->
    <el-dialog
      :title="dialogContent.modName"
      :visible.sync="dialogVisible"
      width="80%"
      :append-to-body="true"
      custom-class="modle_dialog"
    >
      <iframe :src="dialogContent.modLinkAddress" class="content_box" />
    </el-dialog>
  </div>
</template>

<script>
import { modelCollect } from '@/api/classRoom'
export default {
  props: ['modelsList', 'currentPage', 'pageSize', 'total'],
  data() {
    return {
      dialogVisible: false,
      dialogContent: {},
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('changePageSie', val)
    },
    handleCurrentChange(val) {
      this.$emit('changeCurrentChange', val)
    },
    modelDialogVisible(item) {
      this.dialogVisible = true
      this.dialogContent = item
    },
    setModelCollect(n, id) {
      console.log(n === 1 ? 2 : 1)
      modelCollect({ type: n === 1 ? 2 : 1, model_id: id }).then((res) => {
        this.$message.success(res.msg)
        this.$emit('handleClick')
      })
    },
  },
}
</script>

<style lang="scss">
.model-list {
  .resource_box {
    display: flex;
    flex-wrap: wrap;
    .img_model {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0.5rem;
      border: 1px solid rgba(167, 180, 201, 0.2);
      cursor: pointer;
      .model-img {
        width: 100%;
        height: 0;
        overflow: hidden;
        padding-bottom: 100%;
        img {
          width: 100%;
          transition: all 1.5s;
        }
        img:hover {
          transform: scale(1.2);
        }
      }
      span {
        width: 100%;
        overflow: auto;
        text-align: center;
        height: 1.5rem;
      }
    }
  }
}
.modle_dialog {
  height: 70%;
  .el-dialog__body {
    height: 100%;
    padding: 0 !important;
    background: rgba(255, 255, 255, 1);
  }
  .content_box {
    width: 100%;
    height: 100%;
    border: none;
  }
  iframe {
    height: 100%;
  }
}
.collect-button {
  position: absolute;
  padding: 0;
  color: #e6a23c;
  font-size: x-large;
  top: 1rem;
  right: 1rem;
}
</style>