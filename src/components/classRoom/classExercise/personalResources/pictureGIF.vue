<template>
  <div>
    <!-- 上传资源弹框 -->
    <el-dialog
      title="上传GIF动图"
      :visible.sync="dialogVisible"
      width="50%"
      top="7vh"
      :before-close="handleClose"
      :append-to-body="true"
      custom-class="picture-gif-dialog"
    >
      <el-form ref="form" :model="modelUp" label-width="80px">
        <el-form-item label="图片名称">
          <el-input
            style="width: 60%"
            v-model="modelUp.name"
            placeholder="请输入图片名称"
          />
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :accept="acceptImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="imgList"
            list-type="fileList"
            :before-upload="beforeImgUpload"
          >
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">支持 5MB 以内的gif图片</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="总帧数">
          <el-input style="width: 60%" v-model="modelUp.fpsAll" />
        </el-form-item>
        <el-form-item label="总时长">
          <el-input style="width: 60%" v-model="modelUp.durationTime" />
        </el-form-item>
        <el-form-item label="单帧时长">
          <el-input style="width: 60%" v-model="modelUp.fps" />
        </el-form-item>
        <el-form-item label="播放方式">
          <el-radio-group v-model="modelUp.autoPaly">
            <el-radio :label="0">自动播放</el-radio>
            <el-radio :label="1">点击播放</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分类标签">
          <el-input
            style="width: 60%"
            v-model="modelUp.classify"
            placeholder="最多支持3个"
          />
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-input
            style="width: 60%"
            v-model="modelUp.http"
            placeholder="最多支持3个"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="5"
            :maxlength="300"
            :show-word-limit="true"
            v-model="modelUp.describe"
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
      modelUp: {
        name: '',
        img: '',
        classify: '',
        http: 'http//:',
        describe: '',
        fpsAll: '',
        fps: '',
        durationTime: '',
        autoPaly: 0
      },
      imgList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
      acceptImg: '.gif,.GIF',
      isMulitple: false,
    }
  },
  watch: {
    visible: function (n, o) {
      if (n === 'pictureGif') {
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
    beforeImgUpload(file) {
      const isJPG = file.type === 'gif'
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传图片图片只能是 gif 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
  },
}
</script>

<style lang="scss">
.picture-gif-dialog {
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