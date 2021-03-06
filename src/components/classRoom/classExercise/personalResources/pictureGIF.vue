<template>
  <div>
    <!-- 上传资源弹框 -->
    <el-dialog
      width="50%"
      top="7vh"
      custom-class="picture-gif-dialog"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :append-to-body="true"
      :close-on-click-modal="false"
      @open="getMediData"
    >
      <!-- 名称 -->
      <el-form ref="ruleForm" :model="gifUp" :rules="rules" label-width="120px">
        <el-form-item prop="name" label="名称">
          <el-input
            style="width: 60%"
            v-model="gifUp.name"
            placeholder="请输入名称"
          />
        </el-form-item>
        <!-- 上传GIF图片 -->
        <el-form-item prop="materialPath" label="上传GIF图片">
          <el-upload
            class="upload-demo"
            list-type="picture-card"
            :class="{ disUoloadSty: gifUp.materialPath }"
            :action="actionGif"
            :accept="acceptImg"
            :headers="headers"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-upload="beforeImgUpload"
            :file-list="fileList"
          >
            <el-button type="text">上传图片</el-button>
            <div v-show="!gifUp.materialPath" slot="tip" class="el-upload__tip">
              支持 15MB 以内的gif图片
            </div>
          </el-upload>
        </el-form-item>
        <!-- 分类标签 -->
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
            v-model="gifUp.url"
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
            v-model="gifUp.description"
            placeholder="最多支持3个"
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
      headers: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      gifUp: {
        type: 2,
        name: '',
        materialPath: '',
        url: '',
        description: '',
        label: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          {
            min: 1,
            max: 25,
            message: '长度在 1 到 25 个字符',
            trigger: 'blur',
          },
        ],
        materialPath: [
          { required: true, message: '请添加Gif图片', trigger: 'blur' },
        ],
      },
      acceptImg: '.gif,.GIF',
      isMulitple: false,
      // 分类标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      fileList: [],
      dialogTitle: '上传图片',
      submitText: '确 认 上 传',
    }
  },
  computed: {
    actionGif: function () {
      const isDev = process.env.NODE_ENV === 'development'
      return isDev
        ? 'api/api/common/uploadGif'
        : 'https://api.vrbook.vip/api/common/uploadGif'
    },
  },
  watch: {
    visible: function (n, o) {
      if (n === 'pictureGif') {
        this.dialogVisible = true
      }
    },
  },
  methods: {
    getMediData() {
      if (this.media.isEdit) {
        this.gifUp.name = this.media.name
        this.gifUp.url = this.media.url
        this.gifUp.description = this.media.description
        this.gifUp.label = this.media.label
        this.gifUp.materialPath = this.media.materialPath
        if (this.media.label) this.dynamicTags = this.media.label.split(' ')
        this.gifUp.id = this.media.id
        this.dialogTitle = '编辑图片信息'
        this.submitText = '确 认 修 改'
        this.fileList = [{name: this.media.name, url: this.media.materialPath}]
      } else {
        this.gifUp = {
          type: 2,
          name: '',
          materialPath: '',
          url: '',
          description: '',
          label: '',
        }
        this.submitText = '确 认 上 传'
        this.fileList = []
        this.dynamicTags = []
      }
    },
    // 分类标签
    handleCloseTag(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.$nextTick(() => {
        this.gifUp.label = ''
        this.dynamicTags.map((v) => {
          this.gifUp.label += v + ' '
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
        this.gifUp.label += inputValue + ' '
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 关闭弹框
    handleClose() {
      this.dialogVisible = false
    },
    handleRemove(file) {
      console.log(file)
      if (file.status === 'ready') return
      this.gifUp.materialPath = ''
      let path = ''
      if (file.response) {
        path = file.response.data.path
      } else {
        path = file.url
      }
      deleteResource({ url: path }).then((res) => {
        console.log(res)
      })
    },
    beforeImgUpload(file) {
      const isGJF = file.type === 'image/gif'
      const isLt5M = file.size / 1024 / 1024 < 15

      if (!isGJF) {
        this.$message.error('上传图片图片只能是 gif 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片图片大小不能超过 15MB!')
      }
      return isGJF && isLt5M
    },
    handleSuccess(response, file) {
      const { path } = response.data
      this.gifUp.materialPath = path
    },
    upResource() {
      console.log(this.gifUp)
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return
        if (this.media.isEdit) {
          resourceOfEdit(this.gifUp).then((res) => {
            console.log(res)
            this.$message.success(res.msg)
            this.dialogVisible = false
            this.$nextTick(() => {
              this.$emit('handleChange')
            })
          })
        } else {
          resourceOfAdd(this.gifUp).then((res) => {
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