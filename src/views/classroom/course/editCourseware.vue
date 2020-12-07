<template>
  <div>
    <el-card class="box-card" v-if="addCoursewareForm">
      <div slot="header" class="clearfix">
        <span>编辑课件</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="goBack"
          >返回</el-button
        >
      </div>
      <el-form
        :model="addCoursewareForm"
        :rules="addCoursewareFormRules"
        ref="addCoursewareFormRef"
      >
        <el-form-item label="课件名称" prop="title">
          <el-input v-model="addCoursewareForm.title"></el-input>
        </el-form-item>
        <el-form-item label="课件内容"></el-form-item>
        <!-- 富文本编辑器组件 -->
        <quill-editor v-model="addCoursewareForm.content"></quill-editor>
        <el-form-item label="状态">
          <el-radio-group v-model="addCoursewareForm.is_share">
            <el-radio v-for="item in radioList" :key="item.value" :label="item.value">{{item.title}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div>
          <el-button class="cn_btn" @click="addCourseware">保存修改</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { courseWareEdit, courseWareDetail } from '@/api/classRoom.js'
export default {
  data() {
    return {
      teacher: {},
      addCoursewareForm: {
        title:'',
        content: '',
        is_share: ''
      },
      addCoursewareFormRules: {
        title: [
          { required: true, message: '请输入课件名称', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入课件内容', trigger: 'blur' },
        ],
        is_share: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      },
      radioList: [
        { value: 1, title: '共享' },
        { value: 2, title: '私人' }
      ]
    }
  },
  computed: {
    ...mapState(['teacherInfo'])
  },
  mounted() {
      this.getCourseWareDetail()
  },
  computed: {
    courseId: function () {
      return this.$route.query.id;
    },
  },
  methods: {
    // 获取课件信息
    getCourseWareDetail() {
      courseWareDetail(this.courseId).then(res =>{
        const {data} = res.data;
        console.log(data);
        this.addCoursewareForm.title = data.title
        this.addCoursewareForm.content = data.content
        this.addCoursewareForm.is_share = data.is_share
      })
    },
    getNowDate() {
        const dt = new Date()
        const y = dt.getFullYear()
        const m = (dt.getMonth() + 1 + '').padStart(2, '0')
        const d = (dt.getDate() + '').padStart(2, '0')

        const hh = (dt.getHours() + '').padStart(2, '0')
        const mm = (dt.getMinutes() + '').padStart(2, '0')
        const ss = (dt.getSeconds() + '').padStart(2, '0')

        return `${y}-${m}-${d}`
    },
    addCourseware() {
      this.addCoursewareForm.is_share = parseFloat(this.addCoursewareForm.is_share)
      this.$refs.addCoursewareFormRef.validate(async valid => {
      if(!valid) return
        console.log(this.addCoursewareForm);
        courseWareEdit(this.addCoursewareForm).then(res => {
        console.log(res.data);
        if(res.data.statusCode !== 200) return this.$message.error(res.data.msg)
        this.$message.success(res.data.msg)
        })
      })
    },
    goBack() {
      this.$router.push('/course-wareList')
    }
  },
}
</script>
<style lang="scss">
.ql-editor {
  height: 200px !important;
}
</style>