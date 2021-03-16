<template>
  <div>
    <!-- 上传资源弹框 -->
    <el-dialog
      title="上传音频"
      :visible.sync="dialogVisible"
      width="50%"
      top="7vh"
      :before-close="handleClose"
      :append-to-body="true"
      custom-class="audio-dialog"
    >
      <el-form ref="form" :model="audioUp" label-width="80px">
        <el-form-item label="音频名称">
          <el-input
            style="width: 60%"
            v-model="audioUp.name"
            placeholder="请输入音频名称"
          />
        </el-form-item>
        <el-form-item label="上传音频">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :accept="acceptAudio"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="audioList"
            list-type="picture"
            :before-upload="beforeAudioUpload"
          >
            <el-button size="small" type="primary">上传音频</el-button>
            <div slot="tip" class="el-upload__tip">支持2MB以内的音频</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="歌手名">
          <el-input style="width: 60%" v-model="audioUp.singer" />
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
            v-model="audioUp.describe"
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
import { resourceOfClassify, resourceOfAdd } from '@/api/classRoom'
export default {
  props: ['visible'],
  data() {
    return {
      dialogVisible: false,
      audioUp: {
        type: 3,
        name: '',
        materialPath: '',
        singer: '',
        classify: '',
        describe: '',
      },
      audioList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
      acceptAudio: '.mp3,.MP3',
      options: [],
    }
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
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeAudioUpload(file) {
      const isJPG = file.type === 'mp3'
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isJPG) {
        this.$message.error('上传音频只能是 mp3 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传音频大小不能超过 20MB!')
      }
      return isJPG && isLt2M
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