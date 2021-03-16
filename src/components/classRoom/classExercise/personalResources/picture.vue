<template>
  <div>
    <!-- 上传资源弹框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      top="7vh"
      :before-close="handleClose"
      :append-to-body="true"
      custom-class="picture-dialog"
    >
      <div slot="title">
        <div class="dialog-title">
          <span
            @click="isMulitple = false"
            :class="{ isMulitple: isMulitple }"
            style="padding-right: 0.5rem; border-right: 1px solid #999"
          >
            上传图片
          </span>
          <span
            @click="isMulitple = true"
            :class="{ isMulitple: !isMulitple }"
            style="padding-left: 0.5rem"
            >批量上传</span
          >
        </div>
      </div>
      <el-form ref="form" :model="imageUp" label-width="80px">
        <el-form-item label="图片名称">
          <el-input
            style="width: 60%"
            v-model="imageUp.name"
            placeholder="请输入图片名称"
          />
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            action="api/api/interactive/uploadAttach"
            :accept="acceptImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="imgList"
            list-type="picture"
            :before-upload="beforeImgUpload"
            :headers="headers"
            :on-change="handleChange"
            :on-success="handleSuccess"
            multiple
          >
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">
              支持2MB以内的jpg/png图片
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类标签">
          <el-input
            style="width: 60%"
            v-model="imageUp.classify"
            placeholder="最多支持3个"
          />
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-input
            style="width: 60%"
            v-model="imageUp.http"
            placeholder="最多支持3个"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="5"
            :maxlength="300"
            :show-word-limit="true"
            v-model="imageUp.describe"
            placeholder="最多支持3个"
          />
        </el-form-item>
        <el-form-item class="el-form-last">
          <el-button size="medium" @click="dialogVisible = false">
            取 消
          </el-button>
          <el-button
            size="medium"
            type="primary"
            @click="upResource"
          >
            确 定
          </el-button>
        </el-form-item>
      </el-form>
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
      imageUp: {
        type: 1,
        name: '',
        img: '',
        classify: '',
        http: 'http//:',
        describe: '',
      },
      imgList: [],
      acceptImg: '.jpg,.JPG,.PNG,.png',
      isMulitple: false,
      headers: {
        Authorization: window.sessionStorage.getItem('token'),
      },
    }
  },
  watch: {
    visible: function (n, o) {
      if (n === 'picture') {
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
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      // console.log(file)
    },
    handleChange(file) {
      console.log(file)
      const { name, url } = file
      this.imgList.push({
        name: name,
        url: url,
      })
    },
    handleSuccess(response) {
      console.log(response)
    },
    beforeImgUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片图片只能是 JPG 或者 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片图片大小不能超过 2MB!')
      }
      return isPNG && isJPG && isLt2M
    },
    upResource() {
      resourceOfAdd(this.imageUp).then(res=>{
        console.log(res);
      })
    }
  },
}
</script>

<style lang="scss">
.picture-dialog {
  .el-dialog__header {
    .dialog-title {
      color: #fff;
      cursor: pointer;
      .isMulitple {
        transition: color 0.3s;
        color: #999999;
      }
    }
  }
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