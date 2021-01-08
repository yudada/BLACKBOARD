<template>
  <div class="add-course">
    <el-card class="box-card" v-if="addCoursewareForm">
      <div slot="header" class="clearfix">
        <span>{{ btnText }}</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="goBack"
        >
          返回
        </el-button>
      </div>
      <el-form
        :model="addCoursewareForm"
        :rules="addCoursewareFormRules"
        ref="addCoursewareFormRef"
      >
        <el-form-item label="课件名称" prop="title">
          <el-input v-model="addCoursewareForm.title" />
        </el-form-item>
        <el-form-item label="课件内容">
          <br />
          <!-- 富文本编辑器组件 -->
          <!-- <vue-ueditor-wrap v-model="addCoursewareForm.content" :config="myConfig"></vue-ueditor-wrap> -->
          <quill-editor v-model="addCoursewareForm.content" />
        </el-form-item>
        <el-form-item label="添加附件">
          <br />
          <el-upload
            class="upload-demo"
            ref="upload"
            drag
            :action="upURL"
            :accept="accept"
            multiple
            :auto-upload="false"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="5"
            :on-exceed="handleExceed"
            :headers="headers"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击选取文件</em>
            </div>
          </el-upload>
          <el-button size="small" type="success" @click="handleSubmit">上传附件</el-button>
        </el-form-item>
        <el-form-item label="状态" prop="is_share">
          <el-radio-group v-model="addCoursewareForm.is_share">
            <el-radio
              v-for="item in radioList"
              :key="item.value"
              :label="item.value"
            >
              {{ item.title }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <div style="display: flex; justify-content: center">
          <el-button class="cn_btn" @click="addCourseware">
            {{ saveBtnText }}
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import { mapState } from 'vuex'
import {
  addCourseWareStore,
  courseWareEdit,
  courseWareDetail,
  teacherInfo,
} from '@/api/classRoom.js'
export default {
  components: {
    VueUeditorWrap,
  },
  data() {
    return {
      addCoursewareForm: {
        title: '',
        content: '',
        is_share: 2,
        path: [],
      },
      fileName: [],
      addCoursewareFormRules: {
        title: [{ required: true, message: '请输入课件名称', trigger: 'blur' }],
        content: [
          { required: true, message: '请输入课件内容', trigger: 'blur' },
        ],
        is_share: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      },
      radioList: [
        { value: 1, title: '共享' },
        { value: 2, title: '私人' },
      ],
      fileList: [],
      headers: {
        Authorization: window.sessionStorage.getItem('token')
      },
      accept: '.pdf,.PDF,.xlsx,.word,.xls,.ppt,.PPT,.rar,.RAR,.zip,.ZIP'
      // myConfig: {
      //   // 编辑器不自动被内容撑高
      //   autoHeightEnabled: true,
      //   // 初始容器高度
      //   initialFrameHeight: 240,
      //   // 初始容器宽度
      //   initialFrameWidth: '100%',
      //   serverUrl: this.upURL,
      // },
    }
  },
  computed: {
    courseId: function () {
      return this.$route.query.id
    },
    btnText: function () {
      return this.$route.query.id ? '编辑课件' : '添加课件'
    },
    saveBtnText: function () {
      return this.$route.query.id ? '保存编辑' : '添加课件'
    },
    upURL: function () {
      const isDev = process.env.NODE_ENV === 'development'
      return isDev
        ? 'api/api/interactive/uploadAttach'
        : 'https://api.vrbook.vip/api/interactive/uploadAttach'
    },
  },
  mounted() {
    if (this.$route.query.id) {
      this.getCourseWareDetail()
    } else {
      this.getClassInfo()
    }
  },
  methods: {
    // 获取课件信息
    getCourseWareDetail() {
      courseWareDetail(this.courseId).then((res) => {
        const { content, is_share, path, status, title, fileName } = res.data
        this.addCoursewareForm.title = title
        this.addCoursewareForm.content = content
        this.addCoursewareForm.is_share = is_share
        this.addCoursewareForm.path = path
        this.fileName = fileName
        path.map((item,index)=>{
          let obj = {
          name: fileName[index],
          url: path,
        }
        this.fileList.push(obj)
        })
      })
    },
    // 获取老师信息
    async getClassInfo() {
      teacherInfo().then((res) => {
        const { teaSubject } = res.data
        if (teaSubject === null) teaSubject = ' '
        this.addCoursewareForm.title = teaSubject + '课件 ' + this.getNowDate()
      })
    },
    getNowDate() {
      const dt = new Date()
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')

      return `${y}-${m}-${d}`
    },
    handleSubmit() {
      this.$refs.upload.submit()
    },
    // 添加课件
    addCourseware() {
      this.$refs.addCoursewareFormRef.validate(async (valid) => {
        if (!valid) return
        console.log(this.addCoursewareForm)
        if (!this.courseId) {
          addCourseWareStore(this.addCoursewareForm).then((res) => {
            this.$message.success(res.msg)
            this.$refs.addCoursewareFormRef.resetFields()
            this.addCoursewareForm.content = ''
            this.getClassInfo()
            this.goBack()
          })
        } else {
          courseWareEdit(this.courseId, this.addCoursewareForm).then((res) => {
            this.$message.success(res.data.msg)
            this.goBack()
          })
        }
      })
    },
    goBack() {
      this.$router.push('/course-wareList')
    },
    handleRemove(file, fileList) {
      this.fileName.map((item,index)=>{
        if(item === file.name)  {
          this.fileName.splice(index,1)
          this.addCoursewareForm.path.splice(index,1)
        }
      })
      console.log(this.addCoursewareForm.path,this.fileName);
    },
    handleSuccess(file, fileList) {
      const { data } = file
      this.addCoursewareForm.path.push(data.path)
      console.log(this.addCoursewareForm.path);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
  },
}
</script>

<style lang="scss">
.add-course {
  .ql-editor {
    height: 200px !important;
  }
}
</style>