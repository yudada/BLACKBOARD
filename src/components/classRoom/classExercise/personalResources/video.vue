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
      :destroy-on-close="true"
      custom-class="video-dialog"
    >
      <el-form
        ref="ruleForm"
        :model="videoUp"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item prop="name" label="视频名称">
          <el-input
            style="width: 60%"
            v-model="videoUp.name"
            placeholder="请输入视频名称"
          />
        </el-form-item>
        <el-form-item prop="materialPath" label="上传视频">
          <el-upload
            class="upload-demo"
            list-type="fileList"
            :class="{ disUoloadSty: videoUp.materialPath }"
            :action="actionVideo"
            :accept="acceptVideo"
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-upload="beforeVideoUpload"
            :limit="1"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <div
              v-show="!videoUp.materialPath"
              slot="tip"
              class="el-upload__tip"
            >
              支持100MB以内的mp4视频
            </div>
          </el-upload>
        </el-form-item>
        <!-- 上传封面 -->
        <el-form-item prop="coverImg" label="上传封面">
          <el-upload
            class="upload-demo"
            list-type="picture-card"
            :class="{ disUoloadSty: videoUp.coverImg }"
            :action="actionPictrue"
            :accept="acceptImg"
            :headers="headers"
            :on-preview="handlePreviewPictrue"
            :on-remove="handleRemovePictrue"
            :on-success="handleSuccessPictrue"
            :before-upload="beforeImgUploadPictrue"
            :limit="1"
          >
            <el-button type="text">上传图片</el-button>
            <div v-show="!videoUp.coverImg" slot="tip" class="el-upload__tip">
              支持 2MB 以内的jpe/png图片
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类标签">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleCloseTag(tag)"
            style="margin: 0 0.5rem"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            v-show="dynamicTags.length < 3"
            >+ 新标签</el-button
          >
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="5"
            :maxlength="300"
            :show-word-limit="true"
            v-model="videoUp.description"
            placeholder="在此输入..."
          />
        </el-form-item>
        <el-form-item class="el-form-last">
          <el-button size="medium" @click="handleClose">取 消</el-button>
          <el-button size="medium" type="primary" @click="upResource">
            确 定
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 视频预览 -->
      <el-dialog
        :visible.sync="previewVisible"
        width="70%"
        top="15vh"
        :append-to-body="true"
        custom-class="preview-video-dialog"
      >
        <video :src="videoUp.materialPath" autoplay controls></video>
      </el-dialog>
      <!-- 视频预览 -->
      <el-dialog
        :visible.sync="previewDialogVisible"
        width="70%"
        top="5vh"
        :append-to-body="true"
        custom-class="preview-image-dialog"
      >
        <img :src="videoUp.coverImg" alt="" />
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { resourceOfAdd } from '@/api/classRoom'
export default {
  props: ['visible'],
  data() {
    return {
      dialogVisible: false,
      previewVisible: false,
      previewDialogVisible: false,
      headers: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      videoUp: {
        type: 4,
        name: '',
        coverImg: '',
        materialPath: '',
        classify: '',
        description: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入名称！', trigger: 'blur' },
          {
            min: 1,
            max: 25,
            message: '长度在 1 到 25 个字符',
            trigger: 'blur',
          },
        ],
        materialPath: [
          { required: true, message: '请添加音频文件！', trigger: 'blur' },
        ],
        coverImg: [
          { required: true, message: '请添加封面！', trigger: 'blur' },
        ],
      },
      acceptImg: '.jpg,.JPG,.PNG,.png',
      acceptVideo: '.mp4,.MP4,.avi,.AVI',
      // 分类标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
    }
  },
  computed: {
    actionVideo: function () {
      const isDev = process.env.NODE_ENV === 'development'
      return isDev
        ? '/api/api/common/uploadVideo'
        : 'https://api.vrbook.vip/api/common/uploadVideo'
    },
    actionPictrue: function () {
      const isDev = process.env.NODE_ENV === 'development'
      return isDev
        ? 'api/api/common/uploadImg'
        : 'https://api.vrbook.vip/api/common/uploadImg'
    },
  },
  watch: {
    visible: function (n, o) {
      if (n === 'video') {
        this.dialogVisible = true
      }
    },
  },
  methods: {
    // 分类标签
    handleCloseTag(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
        this.videoUp.label += inputValue + ','
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 关闭弹框
    handleClose() {
      this.dialogVisible = false
    },
    // 视频
    handleRemove(file, fileList) {
      console.log(file, fileList)
      if (file.status === 'ready') return
      this.videoUp.materialPath = ''
      this.previewVisible = false
    },
    handleSuccess(response, file) {
      console.log(file)
      const { path } = response.data
      this.videoUp.materialPath = path
    },
    handlePreview(file) {
      this.previewVisible = true
    },
    beforeVideoUpload(file) {
      console.log(file)
      const isJPG = file.type === 'video/mp4'
      const isLt2M = file.size / 1024 / 1024 / 10 < 10

      if (!isJPG) {
        this.$message.error('上传视频只能是 mp4 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传视频大小不能超过 100MB!')
      }
      return isJPG && isLt2M
    },
    // 封面
    handlePreviewPictrue(file) {
      this.videoUp.coverImg = file.url
      this.previewDialogVisible = true
    },
    handleRemovePictrue(file) {
      console.log(file)
      if (file.status === 'ready') return
      this.videoUp.coverImg = ''
    },
    handleSuccessPictrue(response) {
      this.videoUp.coverImg = response.data.path
    },
    beforeImgUploadPictrue(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片图片只能是 JPG 或者 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片图片大小不能超过 2MB!')
      }
      return (isPNG || isJPG) && isLt2M
    },
    // 提交
    upResource() {
      console.log(this.videoUp)
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return
        await resourceOfAdd(this.videoUp).then((res) => {
          console.log(res)
          this.$message.success(res.msg)
          this.dialogVisible = false
          this.$nextTick(() => {
            this.$emit('handleChange')
          })
        })
      })
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
  .disUoloadSty {
    .el-upload--picture-card {
      display: none;
    }
  }
}
.preview-video-dialog {
  padding: 1rem;
}
.preview-image-dialog {
  .el-dialog__body {
    padding: 0.5rem;
  }
  img {
    width: 100%;
  }
}
</style>