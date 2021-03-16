<template>
  <div>
    <!-- 上传资源弹框 -->
    <el-dialog
      title="上传视频"
      :visible.sync="dialogVisible"
      width="50%"
      top="7vh"
      :before-close="handleClose"
      :append-to-body="true"
      custom-class="video-dialog"
    >
      <el-form ref="form" :model="videoUp" label-width="80px">
        <el-form-item label="视频名称">
          <el-input
            style="width: 60%"
            v-model="videoUp.name"
            placeholder="请输入视频名称"
          />
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :accept="acceptVideo"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="videoList"
            list-type="picture"
            :before-upload="beforeVideoUpload"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <div slot="tip" class="el-upload__tip">
              支持2MB以内的mp4视频
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类标签">
          <el-input
            style="width: 60%"
            v-model="videoUp.classify"
            placeholder="最多支持3个"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="5"
            :maxlength="300"
            :show-word-limit="true"
            v-model="videoUp.describe"
            placeholder="最多支持3个"
          />
        </el-form-item>
        <el-form-item class="el-form-last">
          <el-button size="medium" @click="dialogVisible = false"
            >取 消</el-button
          >
          <el-button
            size="medium"
            type="primary"
            @click="dialogVisible = false"
          >
            确 定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['visible'],
  data() {
    return {
      dialogVisible: false,
      videoUp: {
        name: '',
        resource: '',
        img: '',
        classify: '',
        describe: '',
      },
      videoList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
      acceptVideo: '.mp4,.MP4',
    }
  },
  watch: {
    visible: function (n, o) {
      if (n === 'video') {
        this.dialogVisible = true
      }
    },
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeVideoUpload(file) {
      const isJPG = file.type === 'mp4'
      const isLt2M = file.size / 1024 / 1024 < 50

      if (!isJPG) {
        this.$message.error('上传视频只能是 mp4 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传视频大小不能超过 50MB!')
      }
      return isJPG && isLt2M
    },
  },
}
</script>

<style lang="scss">
.video-dialog {
  .el-dialog__body {
    max-height: calc(85vh - 40px - 2rem);
    overflow: scroll;
    padding: 1rem;
  }
  .el-form-last {
    text-align: end;
  }
}
</style>