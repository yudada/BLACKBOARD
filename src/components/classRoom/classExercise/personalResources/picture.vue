<template>
  <div>
    <!-- 上传资源弹框 -->
    <el-dialog
      top="7vh"
      width="50%"
      custom-class="picture-dialog"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :append-to-body="true"
      :close-on-click-modal="false"
      @open="getMediData"
    >
      <el-form
        ref="ruleForm"
        :model="imageUp"
        :rules="rules"
        label-width="80px"
      >
        <!-- 图片名称 -->
        <el-form-item prop="name" label="名称">
          <el-input
            style="width: 60%"
            v-model="imageUp.name"
            placeholder="请输入名称"
          />
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item :prop="media.isEdit ? '' : 'imageArr' " label="上传图片">
          <el-upload
            class="upload-demo"
            list-type="picture-card"
            :action="actionImg"
            :headers="headers"
            :accept="acceptImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeImgUpload"
            :on-success="handleSuccessMulitple"
            :file-list="fileList"
            multiple
          >
            <el-button type="text">添加素材</el-button>
            <div slot="tip" class="el-upload__tip">
              支持10MB以内的jpg/png图片
            </div>
          </el-upload>
        </el-form-item>
        <!-- 分类标签 -->
        <el-form-item label="分类标签">
          <el-tag
            :key="tag + i"
            v-for="(tag,i) in dynamicTags"
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
            style="width: 5rem"
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
        <!-- 跳转链接 -->
        <el-form-item label="跳转链接">
          <el-input
            style="width: 60%"
            v-model="imageUp.url"
            placeholder="http//:"
          />
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="5"
            :maxlength="300"
            :show-word-limit="true"
            v-model="imageUp.description"
          />
        </el-form-item>
        <!-- 提交 -->
        <el-form-item class="el-form-last">
          <el-button size="medium" @click="handleClose"> 取 消 </el-button>
          <el-button size="medium" type="primary" @click="upResource">
            {{ submitText }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 图片预览 -->
    <el-dialog
      :visible.sync="previewDialogVisible"
      width="70%"
      top="5vh"
      :append-to-body="true"
      custom-class="preview-picture-dialog"
    >
      <img :src="previewImage" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { resourceOfAdd, resourceOfEdit } from '@/api/classRoom'
import { deleteResource } from '@/api/index'
export default {
  props: ['visible', 'media'],
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      imageUp: {
        type: 1,
        name: '',
        url: '',
        description: '',
        label: '',
        imageArr: [],
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
        imageArr: [
          { required: true, message: '请添加图片！', trigger: 'blur' },
        ],
      },
      acceptImg: '.jpg,.JPG,.PNG,.png',
      headers: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      previewDialogVisible: false,
      previewImage: '',
      // 分类标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      dialogTitle: '上传图片',
      submitText: '确 认 上 传',
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
        ? 'api/api/common/uploadImg'
        : 'https://api.vrbook.vip/api/common/uploadImg'
    },
  },
  methods: {
    getMediData() {
      if (this.media.isEdit) {
        this.imageUp.name = this.media.name
        this.imageUp.url = this.media.url
        this.imageUp.description = this.media.description
        this.imageUp.label = this.media.label
        this.imageUp.id = this.media.id
        this.dialogTitle = '编辑图片信息'
        this.submitText = '确 认 修 改'
        const fileList = []
        if(this.media.label) this.dynamicTags = this.media.label.split(' ')
        this.media.imageArr.map((v, i) => {
          fileList.push({ name: i, url: v })
        })
        this.fileList = fileList
        console.log(this.fileList)
      } else {
        this.imageUp = {
          type: 1,
          name: '',
          url: '',
          description: '',
          label: '',
          imageArr: [],
        }
        this.submitText = '确 认 上 传'
        this.fileList = []
        this.dynamicTags = []
      }
    },
    handleClose() {
      this.dialogVisible = false
    },
    handlePreview(file) {
      this.previewImage = file.url
      this.previewDialogVisible = true
    },
    handleRemove(file) {
      console.log(file);
      if (file.status === 'ready') return
      this.imageUp.imageArr.splice(this.imageUp.imageArr.indexOf(file.url), 1)
      let path = ''
      if(file.response) {
        path = file.response.data.path
      } else {
        path = file.url
      }
      deleteResource({ url: path }).then((res) => {
        console.log(res)
      })
    },
    handleSuccessMulitple(response) {
      this.imageUp.imageArr.push(response.data.path)
    },
    beforeImgUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片图片只能是 JPG 或者 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片图片大小不能超过 10MB!')
      }
      return (isPNG || isJPG) && isLt2M
    },
    handleCloseTag(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.$nextTick(() => {
        this.imageUp.label = ' '
        this.dynamicTags.map((v) => {
          this.imageUp.label += v + ' '
        })
      })
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue && this.dynamicTags.length < 3) {
        this.dynamicTags.push(inputValue)
        this.imageUp.label += inputValue + ' '
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    upResource() {
      console.log(this.imageUp)
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return
        if (this.media.isEdit) {
          resourceOfEdit(this.imageUp).then(res=>{
            console.log(res)
            this.$message.success(res.msg)
            this.dialogVisible = false
            this.$nextTick(() => {
              this.$emit('handleChange')
            })
          })
        } else {
          resourceOfAdd(this.imageUp).then((res) => {
            console.log(res)
            this.$message.success(res.msg)
            this.dialogVisible = false
            this.$nextTick(() => {
              this.$emit('handleChange')
            })
          })
        }
      })
    },
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
.preview-picture-dialog {
  .el-dialog__body {
    padding: 0;
    background: black;
  }
  img {
    width: 100%;
  }
  .input-new-tag {
    width: 10rem !important;
  }
}
</style>