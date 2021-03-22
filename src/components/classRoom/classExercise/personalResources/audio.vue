<template>
  <div>
    <!-- 上传资源弹框 -->
    <el-dialog
      top="7vh"
      width="50%"
      custom-class="audio-dialog"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :append-to-body="true"
      :close-on-click-modal="false"
      @open="getMediData"
    >
      <el-form
        ref="ruleForm"
        :model="audioUp"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item prop="name" label="音频名称">
          <el-input
            style="width: 60%"
            v-model="audioUp.name"
            placeholder="请输入音频名称"
          />
        </el-form-item>
        <el-form-item prop="materialPath" label="上传音频">
          <el-upload
            class="upload-demo"
            list-type="fileList"
            :class="{ disUoloadSty: audioUp.materialPath }"
            :action="actionAudio"
            :accept="acceptAudio"
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-upload="beforeAudioUpload"
            :file-list="fileList"
            :limit="1"
          >
            <el-button size="small" type="primary">上传音频</el-button>
            <div
              v-show="!audioUp.materialPath"
              slot="tip"
              class="el-upload__tip"
            >
              支持100MB以内的音频文件
            </div>
          </el-upload>
          <div style="margin-top: 0.5rem" v-if="previewVisible">
            <audio
              style="outline: none"
              :src="audioUp.materialPath"
              autoplay
              controls
            />
          </div>
        </el-form-item>
        <el-form-item label="音频分类">
          <el-select v-model="audioUp.classify" placeholder="请选择">
            <el-option
              v-for="(item, i) in options"
              :key="i"
              :label="item"
              :value="item"
              v-show="i !== 0"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="5"
            :maxlength="300"
            :show-word-limit="true"
            v-model="audioUp.description"
            placeholder="在此输入..."
          />
        </el-form-item>
        <el-form-item class="el-form-last">
          <el-button size="medium" @click="handleClose">取 消</el-button>
          <el-button size="medium" type="primary" @click="upResource">
           {{ submitText }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { resourceOfClassify, resourceOfAdd, resourceOfEdit } from '@/api/classRoom'
import { deleteResource } from '@/api/index'
export default {
  props: ['visible','media'],
  data() {
    return {
      dialogVisible: false,
      previewVisible: false,
      fileList: [],
      headers: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      audioUp: {
        type: 3,
        name: '',
        materialPath: '',
        classify: '',
        description: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入名称！', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur',
          },
        ],
        materialPath: [
          { required: true, message: '请添加音频文件！', trigger: 'blur' },
        ],
      },
      acceptAudio: '.mp3,.MP3,flac,.FLAC',
      options: [],
      dialogTitle: '上传音频',
      submitText: '确 认 上 传',
    }
  },
  computed: {
    actionAudio: function () {
      const isDev = process.env.NODE_ENV === 'development'
      return isDev
        ? 'api/api/common/uploadMp3'
        : 'https://api.vrbook.vip/api/common/uploadMp3'
    },
  },
  watch: {
    visible: function (n, o) {
      if (n === 'audio') {
        this.dialogVisible = true
      }
    },
  },
  mounted() {
    this.getResourceClassifyList()
  },
  methods: {
    getMediData() {
      if (this.media.isEdit) {
        this.audioUp.name = this.media.name
        this.audioUp.description = this.media.description
        this.audioUp.label = this.media.label
        this.audioUp.materialPath = this.media.materialPath
        this.audioUp.classify = this.media.classify
        this.audioUp.id = this.media.id
        this.dialogTitle = '编辑音频信息'
        this.submitText = '确 认 修 改'
        this.fileList = [{name: this.media.name, url: this.media.materialPath}]
        console.log(this.fileList)
      } else {
        this.audioUp = {
        type: 3,
        name: '',
        materialPath: '',
        classify: '',
        description: '',
      }
        this.submitText = '确 认 上 传'
        this.fileList = []
        this.dynamicTags = []
      }
    },
    getResourceClassifyList() {
      resourceOfClassify().then((res) => {
        const { classify } = res.data
        this.options = classify
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleRemove(file, fileList) {
      if (file.status === 'ready') return
      this.audioUp.materialPath = ''
      this.previewVisible = false
      let path = ''
      if(file.response) {
        path = file.response.data.path
      } else {
        path = file.url
      }
      deleteResource({url: path}).then(res=>{
        console.log(res);
      })
    },
    handleSuccess(response, file) {
      console.log(file)
      const { path } = response.data
      this.audioUp.materialPath = path
    },
    handlePreview(file) {
      this.previewVisible = true
    },
    beforeAudioUpload(file) {
      const isJPG = file.type === 'audio/mpeg'
      const isLt2M = file.size / 1024 / 1024 < 100

      if (!isJPG) {
        this.$message.error('上传音频只能是 mp3 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传音频大小不能超过 100MB!')
      }
      return isJPG && isLt2M
    },
    upResource() {
      console.log(this.audioUp)
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return
        if (this.media.isEdit) {
          resourceOfEdit(this.audioUp).then(res=>{
            console.log(res)
            this.$message.success(res.msg)
            this.dialogVisible = false
            this.$nextTick(() => {
              this.$emit('handleChange')
            })
          })
        } else {
          resourceOfAdd(this.audioUp).then((res) => {
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
.audio-dialog {
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