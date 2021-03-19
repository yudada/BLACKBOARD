<template>
  <div>
    <!-- 上传资源弹框 -->
    <el-dialog
      title="上传模型"
      :visible.sync="dialogVisible"
      width="50%"
      top="7vh"
      :before-close="handleClose"
      custom-class="model-dialog"
    >
      <el-form ref="form" :model="modelUp" label-width="80px">
        <el-form-item label="模型名称">
          <el-input
            style="width: 60%"
            v-model="modelUp.name"
            placeholder="请输入模型名称"
          />
        </el-form-item>
        <el-form-item label="上传模型">
          <el-upload
            class="upload-demo"
            :accept="accept"
            :action="actionModel"
            :on-change="handleChange"
            :file-list="fileList"
            :before-upload="beforeModelUpload"
          >
            <el-button size="small" type="primary"
              >选择glb或者verg3d的zip文件</el-button
            >
            <div slot="tip" class="el-upload__tip">
              支持20MB以内的glb文件或者50MB以内V3d的zip文件
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传封面">
          <el-upload
            class="upload-img"
            :action="actionImg"
            :accept="acceptImg"
            :headers="headerObj"
            :on-remove="handleRemove"
            :show-file-list="false"
            :before-upload="beforeImgUpload"
            :on-success="handleSuccess"
            :limit="1"
          >
            <img v-if="modelUp.img" :src="modelUp.img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              支持2MB以内的jpg/png模型封面
            </div>
          </el-upload>
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
        resource: '',
        img: '',
        classify: '',
        http: 'http//:',
        describe: '',
      },
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
      accept: '.glb,.GLB,.zip,.ZIP',
      acceptImg: '.jpg,.JPG,.PNG,.png',
      headerObj: {
        ContentType: 'multipart/form-data',
        Authorization: window.sessionStorage.getItem('token'),
      },
    }
  },
  watch: {
    visible: function (n, o) {
      if (n === 'model') {
        this.dialogVisible = true
      }
    },
  },
  computed: {
    actionImg: function () {
      const isDev = process.env.NODE_ENV === 'development'
      return isDev
        ? 'api/api/interactive/uploadAttach'
        : 'https://api.vrbook.vip/api/interactive/uploadAttach'
    },
    actionModel: function () {
      const isDev = process.env.NODE_ENV === 'development'
      return isDev
        ? 'api/api/interactive/uploadAttach'
        : 'https://api.vrbook.vip/api/interactive/uploadAttach'
    },
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    handleChange() {},
    handleRemove() {
      this.modelUp.img = ''
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeModelUpload(file) {
      console.log(file.type)
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('上传模型文件大小不能超过 20MB!')
      }
      return isLt2M
    },
    beforeImgUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传封面图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleSuccess(response) {
      console.log(response)
      if (response.statusCode !== 200) return this.$message.error(response.msg)
      this.modelUp.img = response.data.path
    },
  },
}
</script>

<style lang="scss">
.model-dialog {
  height: 85vh;
  .el-dialog__body {
    max-height: calc(85vh - 40px - 2rem);
    overflow: scroll;
    padding: 1rem;
  }
  .el-form-last {
    text-align: end;
  }
  .upload-img {
    .el-upload {
      width: 8rem;
      height: 8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px dashed #999999;
      border-radius: 3px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>