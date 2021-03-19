<template>
  <div class="resource-thumbnail-list">
    <div class="resource-picture">
      <div
        v-for="item in tableData"
        :key="item.id"
        :class="{ 'resource-picture-item': item.type === 1 }"
      >
        <div v-if="item.type === 4" class="resource-item-pic">
          <img :src="item.coverImg" :alt="item.description" />
          <div
            class="resource-item-video"
            @click="handlePreviewImage(item.materialPath, item.name)"
          >
            <i class="el-icon-video-play"></i>
          </div>
        </div>
        <div v-else-if="item.type === 2" class="resource-item-pic">
          <img
            @click="handlePreviewImage(item.materialPath, item.name)"
            :src="item.materialPath"
            :alt="item.description"
          />
        </div>
        <div v-else-if="item.type === 1">
          <span>{{ item.name }}</span>
          <div style="display: flex; flex-wrap: wrap">
            <div
              v-for="pic in item.imageArr"
              :key="pic"
              class="resource-item-pic"
              @click="handlePreviewImage(pic, item.name)"
            >
              <img :src="pic" alt="" />
            </div>
          </div>
        </div>
        <div
          class="resource-item-text"
          v-show="item.type !== 1 && item.type !== 3"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- 图片预览 -->
    <el-dialog
      top="5vh"
      :title="previewTitle"
      :visible.sync="previewDialogVisible"
      :append-to-body="true"
      :custom-class="
        activeName === 'video' ? 'preview-dialog' : 'preview-dialog-image'
      "
    >
      <img v-if="activeName !== 'video'" :src="previewImage" alt="" />
      <video
        v-else
        :src="previewImage"
        autoplay
        controls
        style="max-width: 100%;"
      />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['tableData', 'activeName'],
  data() {
    return {
      previewDialogVisible: false,
      previewImage: '',
      previewTitle: '预览',
    }
  },
  methods: {
    handlePreviewImage(url, name) {
      this.previewImage = url
      this.previewTitle = name
      this.previewDialogVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.resource-picture {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  .resource-item-pic {
    width: 20vh;
    height: 20vh;
    margin: 1rem;
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    position: relative;
    img {
      width: 100%;
      cursor: pointer;
      transition: all 1.5s;
    }
    img:hover {
      transform: scale(1.2);
    }
  }
  .resource-picture-item {
    width: 100%;
    box-sizing: border-box;
    text-align: start;
    margin: 0;
    padding-top: 0.5rem;
    border-bottom: 1px solid #ede4e4;
  }
  .resource-item-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: xx-large;
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
  .resource-item-text {
    width: 20vh;
    max-height: 3rem;
    margin: 0 1rem;
    overflow: hidden;
  }
}
::v-deep .preview-dialog {
  width: fit-content;
  max-width: 80%;
  .el-dialog__body {
    display: flex;
    padding: 0;
    max-height: 80vh;
    video {
      outline: none;
    }
  }
}
::v-deep .preview-dialog-image {
  width: fit-content;
  max-width: 90%;
  .el-dialog__body {
    padding: 0;
    width: auto;
    height: 80vh;
    img {
      width: auto;
      max-width: 100%;
      height: 100%;
    }
  }
}
.resource-thumbnail-list {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>