<template>
  <div class="resource_box">
    <div
      v-for="item in data"
      :key="item.id"
      :label="item.id"
      style="width: 20%"
    >
      <div class="img_model" @click="modelDialogVisible(item)">
        <div class="model-img">
          <img v-if="item.modCoverimg" :src="item.modCoverimg" alt="模型图" />
          <img v-if="item.modImage" :src="item.modImage" alt="模型图" />
        </div>
        <span>{{ item.modName }}</span>
      </div>
    </div>

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
export default {
  props: ['data'],
  data() {
    return {
      dialogVisible: false,
      dialogContent: {},
    }
  },
  methods: {
    modelDialogVisible(item) {
      console.log(item)
      this.dialogVisible = true
      this.dialogContent = item
    },
  },
}
</script>

<style lang="scss" scoped>
.resource_box {
  display: flex;
  flex-wrap: wrap;
  .img_model {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    padding: 0.5rem;
    border: 1px solid rgba(167, 180, 201, 0.2);
    .model-img {
      width: 100%;
      height: 0;
      overflow: hidden;
      padding-bottom: 100%;
      img {
        width: 100%;
        cursor: pointer;
      }
    }
  }
}
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>

<style lang="scss">
.modle_dialog {
  height: 70%;
  .el-dialog__body {
    height: 100%;
    padding: 0 !important;
    background: rgba(255, 255, 255, 1);
  }
}
</style>