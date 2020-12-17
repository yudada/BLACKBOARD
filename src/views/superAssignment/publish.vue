<template>
  <div class="publish_main">
    <div class="main_header">
      <h4>发布作业</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">超级作业</a></el-breadcrumb-item>
        <el-breadcrumb-item>发布作业</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="publish_concent">
      <el-row>
        <el-col :span="24">
          <el-card :body-style="{ padding: '40px' }">
            <el-form
              ref="publishFormRef"
              :model="publishForm"
              :rules="publishFormRules"
              label-position="top"
            >
              <el-form-item label="作业名称" prop="exeTitle">
                <el-input
                  placeholder="例：周三课后练习题"
                  v-model="publishForm.exeTitle"
                  class="set_w"
                ></el-input>
              </el-form-item>
              <div class="select_time">
                <el-form-item
                  label="开始时间"
                  prop="exeStartTime"
                  class="select_tim"
                >
                  <el-date-picker
                    v-model="publishForm.exeStartTime"
                    type="datetime"
                    placeholder="选择开始时间"
                    default-time="07:00:00"
                    :picker-options="stratTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    clearable
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item
                  label="结束时间"
                  prop="exeEndTime"
                  class="select_tim"
                >
                  <el-date-picker
                    v-model="publishForm.exeEndTime"
                    type="datetime"
                    placeholder="选择结束时间"
                    default-time="23:59:59"
                    :picker-options="endTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    clearable
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
              <el-form-item label="班级" prop="class_id">
                <el-select
                  clearable
                  v-model="publishForm.class_id"
                  placeholder="请选择班级"
                >
                  <el-option
                    v-for="item in classList"
                    :key="item.class_id"
                    :label="item.className"
                    :value="item.class_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="课本" prop="textbook_id">
                <el-select
                  clearable
                  v-model="publishForm.textbook_id"
                  placeholder="请选择课本"
                >
                  <el-option
                    v-for="item in bookList"
                    :key="item.id"
                    :label="item.bookName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="作业类型" prop="exeType">
                <el-select
                  clearable
                  v-model="publishForm.exeType"
                  placeholder="请选择作业类型"
                >
                  <el-option
                    v-for="item in taskTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="作业内容" prop="contentId">
                <el-button size="small" @click="openContent"
                  >点击选择</el-button
                >
                <span> 已选：{{ publishForm.contentId.length }} 项</span>
              </el-form-item>
              <el-form-item label="状态">
                <el-radio-group v-model="publishForm.status">
                  <el-radio :label="2">草稿准备</el-radio>
                  <el-radio :label="1">正式发布</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <div style="display: flex">
                  <el-button @click="onSubmit" class="cn_btn"
                    >立即发布</el-button
                  >
                  <el-button @click="canceSubmitl">取消</el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>

      <!-- 作业内容弹框 -->
      <el-dialog
        title="请选择内容:"
        :visible.sync="contentDialogVisible"
        width="80%"
        top="5vh"
        :append-to-body="true"
        :close-on-click-modal="false"
        :destroy-on-close="true"
      >
        <el-radio-group v-model="publishForm.exeType" @change="restContent">
          <el-radio :label="1">立体模型控索</el-radio>
          <el-radio :label="2">智慧课本阅读</el-radio>
          <el-radio :label="3">精选题库练习</el-radio>
          <el-radio :label="4">实验操作</el-radio>
        </el-radio-group>
        <div v-if="publishForm.exeType == 1">
          <models @func="getContentId"></models>
        </div>
        <div v-else-if="publishForm.exeType == 2">
          <read @func="getContentId" :bookId="bookId"></read>
        </div>
        <div v-else-if="publishForm.exeType == 3">
          <exercise @func="getContentId"></exercise>
        </div>
        <div v-else>
          <experiment @func="getContentId"></experiment>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Exercise from '../../components/resourceList/exercise'
import experiment from '../../components/resourceList/experiment'
import models from '../../components/resourceList/models'
import Read from '../../components/resourceList/read.vue'
import { mapState } from 'vuex'
export default {
  components: {
    experiment,
    models,
    Read,
    Exercise,
  },
  data() {
    return {
      // 创建作业表单
      publishForm: {
        exeTitle: '',
        exeStartTime: '',
        exeEndTime: '',
        class_id: '',
        textbook_id: '',
        exeType: '',
        contentId: [],
        status: 2,
      },
      classList: [],
      bookList: [],
      taskTypeList: [
        { value: 1, label: '立体模型控索' },
        { value: 2, label: '智慧课本阅读' },
        { value: 3, label: '精选题库练习' },
        { value: 4, label: '实验操作' },
      ],
      // 创建作业验证规则
      publishFormRules: {
        exeTitle: [
          { required: true, message: '请输入作业名称', trigger: 'blur' },
        ],
        exeStartTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' },
        ],
        exeEndTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' },
        ],
        class_id: [{ required: true, message: '请选择班级', trigger: 'blur' }],
        textbook_id: [
          { required: true, message: '请选择课本', trigger: 'blur' },
        ],
        exeType: [
          { required: true, message: '请选择作业类型', trigger: 'blur' },
        ],
        contentId: [
          { required: true, message: '请选择作业内容', trigger: 'blur' },
        ],
      },
      // 作业内容弹框开关
      contentDialogVisible: false,
      // 日期选择
      stratTime: {
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 8.64e7
        },
      },
      endTime: {
        disabledDate: (time) => {
          return (
            time.getTime() < this.publishForm.exeStartTime ||
            time.getTime() < Date.now() - 8.64e7
          )
        },
      },
      // 模型列表
      modelsList: [],
      bookId: '',
    }
  },
  created() {
    this.getClassInfo()
    this.getBookInfo()
    this.formatDate()
    if (this.classInfo) {
      this.publishForm.class_id = this.classInfo.class_id
    }
  },
  computed: {
    ...mapState(['classInfo']),
  },
  methods: {
    // 获取班级列表
    async getClassInfo() {
      const { data: res } = await this.$http.get('api/classroom/myList')
      if (res.statusCode !== 200)
        return this.$message.error('获取班级列表失败！')
      console.log(res, 1)
      this.classList = res.data
    },
    // 获取课本列表
    async getBookInfo() {
      const { data: res } = await this.$http.get('api/textbook/lists')
      if (res.statusCode !== 200)
        return this.$message.error('获取课本列表失败！')
      console.log(res, 2)
      this.bookList = res.data
    },
    // 获取作业类型
    async getTaskType() {},
    // 发布作业
    async onSubmit() {
      this.$refs.publishFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('请填写必要的表单项！')

        this.publishForm.exeStartTime = this.publishForm.exeStartTime.toString()
        this.publishForm.exeEndTime = this.publishForm.exeEndTime.toString()
        console.log(this.publishForm)
        const { data: res } = await this.$http.post(
          '/api/exercises/store',
          this.publishForm
        )
        console.log(res)
        if (res.statusCode !== 200) return this.$message.error('发布作业失败')
        this.$message.success('发布作业成功!')
        this.canceSubmitl()
      })
    },
    // 重置表单
    canceSubmitl() {
      this.$refs.publishFormRef.resetFields()
    },
    // 切换作业类型清空作业内容
    restContent() {
      this.publishForm.contentId = []
    },
    // 作业弹框
    openContent() {
      this.bookId = this.publishForm.textbook_id
      if (this.publishForm.exeType === 2 && this.bookId.length <= 0) {
        return this.$message.error('请先选择课本！')
      }
      this.contentDialogVisible = true
    },
    // 获取子组件内容
    getContentId(data) {
      this.publishForm.contentId = data.contentId
      this.contentDialogVisible = data.contentDialogVisible
      console.log(this.publishForm.contentId.length)
    },
    formatDate() {
      const dt = new Date()

      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')

      const hh = (dt.getHours() + '').padStart(2, '0')
      const mm = (dt.getMinutes() + '').padStart(2, '0')
      const ss = (dt.getSeconds() + '').padStart(2, '0')

      return  this.publishForm.exeStartTime = `${y}-${m}-${d} 07:00:00` 
    },
  },
}
</script>

<style lang="scss" scoped>
.set_w {
  width: 32%;
}
.content_input:focus {
  border: 1px solid #ad5df3;
}
.select_time {
  display: flex;
  .select_tim {
    margin-right: 20px;
  }
}

@media (max-width: 768px) {
  .set_w {
    width: 60%;
  }
}

@media (max-width: 375px) {
  .set_w {
    width: 100%;
  }
  .select_time {
    display: inherit;
    .select_tim {
      margin-right: 0;
    }
  }
}
</style>
