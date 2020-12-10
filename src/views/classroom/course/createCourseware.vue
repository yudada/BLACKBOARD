<template>
  <div>
    <el-card class="box-card" v-if="addCoursewareForm">
      <div slot="header" class="clearfix">
        <span>创建课件</span>
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
        <!-- <vue-ueditor-wrap v-model="addCoursewareForm.content" :config="myConfig"></vue-ueditor-wrap> -->
        <el-form-item label="状态" prop="is_share">
          <el-radio-group v-model="addCoursewareForm.is_share">
            <el-radio v-for="item in radioList" :key="item.value" :label="item.value">{{item.title}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div>
          <el-button class="cn_btn" @click="addCourseware">添加课件</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { addCourseWareStore } from '@/api/classRoom.js'
export default {
  components: {
    VueUeditorWrap
  },
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
      ],
    //   myConfig: {
    //   // 编辑器不自动被内容撑高
    //   autoHeightEnabled: true,
    //   // 初始容器高度
    //   initialFrameHeight: 240,
    //   // 初始容器宽度
    //   initialFrameWidth: '100%',
    //   //serverUrl: 'api/api/common/uploadImg',
    //   //serverUrl: 'http://127.0.0.1',
    //   UEDITOR_HOME_URL: '/UEditor/'
    // }
    }
  },
  computed: {
    ...mapState(['teacherInfo'])
  },
  mounted() {
      this.getClassInfo()
  },
  methods: {
    // 获取老师信息
    async getClassInfo() {
      const { data: res } = await this.$http.post(`api/teacher/info`)
      if(res.statusCode !== 200) return this.$message.error(res.msg)
      this.teacher = res.data;
      this.addCoursewareForm.title = this.teacher.teaSubject + '课件' + this.getNowDate()
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
        addCourseWareStore(this.addCoursewareForm).then(res => {
        const {data} = res
        if(data.statusCode !==200) return this.$message.error(data.msg)
        this.$message.success(data.msg)
        this.$refs.addCoursewareFormRef.resetFields();
        this.addCoursewareForm.content = '';
        this.getClassInfo();
        })
      })
    }, 
    goBack() {
      this.$router.push('/course-wareList')
    },
  }
}
</script>

<style lang="scss">
.ql-editor {
  height: 200px !important;
}
</style>