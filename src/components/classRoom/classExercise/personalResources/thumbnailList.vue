<template>
  <div class="resource-thumbnail-list">
    <div class="resource-picture">
      <div
        v-for="(item, i) in tableData"
        :key="item.id"
        :class="{ 'resource-picture-item': item.type === 1 }"
      >
        <div v-if="item.type === 4" class="resource-item-pic">
          <img :src="item.coverImg" :alt="item.description" />
          <div
            class="resource-item-video"
            @click="handlePreviewImage(item.materialPath, item.name, i)"
          >
            <i class="el-icon-video-play"></i>
          </div>
        </div>
        <div v-else-if="item.type === 2" class="resource-item-pic">
          <img
            @click="handlePreviewImage(item.materialPath, item.name, i)"
            :src="item.materialPath"
            :alt="item.description"
          />
        </div>
        <div v-else-if="item.type === 1">
          <span>{{ item.name }}</span>
          <div style="display: flex; flex-wrap: wrap">
            <div
              v-for="(pic, m) in item.imageArr"
              :key="pic"
              class="resource-item-pic"
              @click="handlePreviewImage(pic, item.name, i, m)"
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
      :destroy-on-close="true"
      @open="onTouchMove(true)"
      @close="onTouchMove(false)"
    >
      <div
        @touchstart="touchstart($event)"
        @touchend="touchend($event)"
        style="width: 100%; height: 100%"
      >
        <img v-if="activeName !== 'video'" :src="previewImage" alt="" />
        <video
          v-else
          :src="previewImage"
          autoplay
          controls
          style="max-width: 100%"
        />
        <div
          class="dialog-image-previous"
          @keyup.page-up="previousPreview"
          @click="previousPreview"
          v-if="activeName !== 'video'"
        >
          <i class="el-icon-back"></i>
        </div>
        <div
          class="dialog-image-next"
          @keyup.page-down="nextPreview"
          @click="nextPreview"
          v-if="activeName !== 'video'"
        >
          <i class="el-icon-right"></i>
        </div>
      </div>
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
      index: 0,
      index2: 0,
      touchStart: 0,
    }
  },
  methods: {
    handlePreviewImage(url, name, index, index2) {
      console.log(this.tableData[index])
      this.index = index
      this.index2 = index2
      this.previewImage = url
      this.previewTitle = name
      this.previewDialogVisible = true
    },
    previousPreview() {
      let index = this.index
      let index2 = this.index2
      let tableData = this.tableData
      if (this.activeName !== 'picture') {
        if (this.index === 0) return
        this.index--
        this.previewImage = tableData[index].materialPath
        this.previewTitle = tableData[index].name
        this.previewDialogVisible = true
      } else {
        if (index2 > 0) {
          index2--
          this.index2 = index2
          this.previewImage = tableData[index].imageArr[index2]
          this.previewTitle = tableData[index].name
        } else {
          if (index > 0) {
            index--
            index2 = this.index2 = tableData[index].imageArr.length - 1
            this.index = index
            this.previewImage = tableData[index].imageArr[index2]
            this.previewTitle = tableData[index].name
          }
        }
      }
    },
    nextPreview() {
      let index = this.index
      let index2 = this.index2
      let tableData = this.tableData
      if (this.activeName !== 'picture') {
        if (this.index === tableData.length - 1) return
        index++
        this.index = index
        this.previewImage = tableData[index].materialPath
        this.previewTitle = tableData[index].name
      } else {
        if (index2 < tableData[index].imageArr.length - 1) {
          index2++
          this.index2 = index2
          this.previewImage = tableData[index].imageArr[index2]
          this.previewTitle = tableData[index].name
        } else {
          if (index !== tableData.length - 1) {
            index2 = this.index2 = 0
            index++
            this.index = index
            this.previewImage = tableData[index].imageArr[index2]
            this.previewTitle = tableData[index].name
          }
        }
      }
    },
    touchstart(e) {
      this.touchStart = e.changedTouches[0].clientX
    },
    touchend(e) {
      let start = this.touchStart
      let end = e.changedTouches[0].clientX
      if (start > end) {
        this.nextPreview()
      } else {
        this.previousPreview()
      }
    },
    onTouchMove(inFlag) {
      if (inFlag) {
        document.addEventListener('touchmove', this.onHandler, {
          passive: false,
        })
      } else {
        document.removeEventListener('touchmove', this.onHandler, {
          passive: false,
        })
      }
    },
    onHandler(e) {
      e.preventDefault()
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
    padding: 0;
    max-height: 80vh;
    position: relative;
    div {
      display: flex;
    }
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
    .dialog-image-previous {
      position: absolute;
      left: 0;
      top: 50%;
      width: 25%;
      text-align: start;
      transform: translateY(-100%);
      font-size: 3rem;
      margin: 2rem;
      cursor: pointer;
      color: #a39898c7;

      i {
        opacity: 0;
        transition: all 0.5s;
      }
    }
    .dialog-image-next {
      position: absolute;
      right: 0;
      top: 50%;
      width: 25%;
      text-align: end;
      transform: translateY(-100%);
      font-size: 3rem;
      margin: 2rem;
      cursor: pointer;
      color: #a39898c7;
      i {
        opacity: 0;
        transition: all 0.5s;
      }
    }
    .dialog-image-next:hover,
    .dialog-image-previous:hover {
      i {
        opacity: 1;
      }
    }
  }
}
.resource-thumbnail-list {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>