<template>
  <div class="add-course">
    <Breadcrumb
      v-if="this.$route.path === '/ware-list/create-courseware'"
      :navData="navData"
    />

    <el-card class="box-card" v-if="addCoursewareForm">
      <div
        slot="header"
        class="clearfix"
        v-if="this.$route.path === '/create-courseware'"
      >
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
          <vue-ueditor-wrap
            v-model="addCoursewareForm.content"
            :config="myConfig"
          />
        </el-form-item>
        <el-form-item label="添加附件">
          <br />
          <el-upload
            class="upload-demo"
            ref="upload"
            drag
            action="https://api.vrbook.vip/api/interactive/uploadAttach"
            :accept="accept"
            multiple
            :auto-upload="true"
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
            <div class="el-upload__tip" slot="tip">
              只能上传{{ accept2 }}文件
            </div>
          </el-upload>
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
import '@/assets/css/editor.scss'
import Breadcrumb from '@/components/breadcrumb.vue'
import VueUeditorWrap from 'vue-ueditor-wrap'
import {
  addCourseWareStore,
  courseWareEdit,
  courseWareDetail,
  teacherInfo,
} from '@/api/classRoom.js'
export default {
  components: {
    VueUeditorWrap,
    Breadcrumb,
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
        Authorization: window.sessionStorage.getItem('token'),
      },
      accept:
        '.pdf,.PDF,.xlsx,.doc,.DOC,.xls,.ppt,.PPT,.rar,.RAR,.zip,.ZIP,pptx,.PPTX,docx,.DOCX',
      accept2: 'pdf/xlsx/doc/docx/xls/ppt/rar/zip',
      myConfig: {
        initialFrameHeight: 240,
        serverUrl: 'https://api.vrbook.vip/api/editor/upload',
        initialContent: '在此输入',
      },
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
    navData: function () {
      let navData = {
        childTitle: this.btnText,
        goTo: '返回列表',
      }
      return navData
    },
  },
  watch: {
    courseId:function(n,o) {
      this.getCourseWareDetail()
    }
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
        path.map((item, index) => {
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
            this.$router.push('/course-wareList')
          })
        } else {
          courseWareEdit(this.courseId, this.addCoursewareForm).then((res) => {
            this.$message.success(res.msg)
            this.$refs.addCoursewareFormRef.resetFields()
            this.addCoursewareForm.content = ''
            this.getClassInfo()
            this.$router.push('/course-wareList')
          })
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    handleRemove(file, fileList) {
      this.fileName.map((item, index) => {
        if (item === file.name) {
          this.fileName.splice(index, 1)
          this.addCoursewareForm.path.splice(index, 1)
        }
      })
      console.log(this.addCoursewareForm.path, this.fileName)
    },
    handleSuccess(file, fileList) {
      const { data } = file
      this.addCoursewareForm.path.push(data.path)
      console.log(this.addCoursewareForm.path)
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
.edui-toolbar {
  line-height: 1rem;
}
</style>