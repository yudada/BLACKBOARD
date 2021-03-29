<template>
  <div class="publish_main">
    <Breadcrumb :navData="navData" />

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
                />
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
                  />
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
                  />
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
                  <el-button @click="onSubmit" class="cn_btn">
                    {{ btnText }}
                  </el-button>
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
        top="6vh"
        :append-to-body="true"
        :close-on-click-modal="false"
        custom-class="content-diolog"
      >
        <el-radio-group
          v-model="publishForm.exeType"
          @change="restContent"
          style="padding: 20px 0 0 20px"
        >
          <el-radio
            v-for="item in taskTypeList"
            :key="item.value"
            :label="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
        <div v-if="publishForm.exeType == 1">
          <Models @func="getContentId" :contentId="publishForm.contentId" />
        </div>
        <div v-else-if="publishForm.exeType == 2">
          <Read
            @func="getContentId"
            :contentId="publishForm.contentId"
            :bookId="bookId"
          />
        </div>
        <div v-else-if="publishForm.exeType == 3">
          <Exercise @func="getContentId" :contentId="publishForm.contentId" />
        </div>
        <div v-else>
          <Experiment @func="getContentId" :contentId="publishForm.contentId" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Exercise from '@/components/resourceList/exercise'
import Experiment from '@/components/resourceList/experiment'
import Models from '@/components/resourceList/models'
import Read from '@/components/resourceList/read.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import { mapState } from 'vuex'
import {
  addExercises,
  exercisesDetail,
  editExercises,
} from '@/api/superAssignment'
import { classroomList } from '@/api/classManage'
import { wisdomBookList } from '@/api/wisdomBook'
export default {
  components: {
    Experiment,
    Models,
    Read,
    Exercise,
    Breadcrumb,
  },
  data() {
    return {
      navData: {
        title: '超级作业',
        childTitle: '发布作业',
      },
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
        { value: 1, label: 'VR模型控索', path: '/prepareTask' },
        { value: 2, label: '智慧课本阅读', path: '/readTask' },
        { value: 3, label: '精选题库练习', path: '/courseware' },
        { value: 4, label: '仿真实验', path: '/exercitation' },
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
    this.$nextTick(() => {
      this.navData = {
        childTitle: '编辑作业',
        goTo: '返回列表',
      }
      this.getExercisesDetail()
    })
    if (this.classInfo) {
      this.publishForm.class_id = this.classInfo.class_id
      this.formatDate()
      this.formatDate2()
    }
  },
  computed: {
    ...mapState(['classInfo']),
    exeId: function () {
      return this.$route.query.id
    },
    btnText: function () {
      return this.$route.query.id ? '保存修改' : '立即发布'
    },
  },
  methods: {
    // 获取编辑作业信息
    getExercisesDetail() {
      if (!this.exeId) return
      exercisesDetail(this.exeId).then((res) => {
        const {
          class_id,
          contentId = [],
          exeTitle,
          exeStartTime,
          exeEndTime,
          textbook_id,
          exeType,
          status,
        } = res.data
        this.publishForm.class_id = class_id
        this.publishForm.contentId = contentId
        this.publishForm.exeTitle = exeTitle
        this.publishForm.exeStartTime = exeStartTime
        this.publishForm.exeEndTime = exeEndTime
        this.publishForm.textbook_id = textbook_id
        this.publishForm.exeType = exeType
        this.publishForm.status = status
      })
    },
    // 获取班级列表
    async getClassInfo() {
      classroomList().then((res) => {
        const { data } = res
        this.classList = data
      })
    },
    // 获取课本列表
    async getBookInfo() {
      wisdomBookList().then((res) => {
        const { data } = res
        this.bookList = data
      })
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
        if (!this.exeId) {
          await addExercises(this.publishForm).then((res) => {
            console.log(res)
            this.$message.success(res.msg)
            this.taskTypeList.forEach((v) => {
              if (v.value === this.publishForm.exeType) this.$router.push(v.path)
              this.canceSubmitl()
            })
          })
        } else {
          await editExercises(this.exeId, this.publishForm).then((res) => {
            this.$message.success(res.msg)
            this.taskTypeList.forEach((v) => {
              if (v.value === this.publishForm.exeType)
                this.$router.push(v.path)
            })
          })
        }
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
      this.contentDialogVisible = false
      console.log(this.publishForm.contentId.length)
    },
    formatDate() {
      const dt = new Date()
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      return (this.publishForm.exeStartTime = `${y}-${m}-${d} 07:00:00`)
    },
    formatDate2() {
      const dt = new Date()
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      return (this.publishForm.exeEndTime = `${y}-${m}-${d} 23:59:59`)
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

<style lang="scss">
.content-diolog {
  max-height: 88vh;
  overflow: scroll;
  .el-dialog__body {
    padding: 0;
  }
}
</style>
