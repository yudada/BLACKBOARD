<template>
  <div class="addPapers_main">
    <div class="main_header">
      <h4>发布试卷</h4>
      <el-button type="text" @click="goBackList" class="goBack"
        >返回列表</el-button
      >
    </div>
    <div class="addPapers_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <el-form
              ref="papersFormRef"
              :model="papersForm"
              :rules="papersFormRules"
              label-position="top"
            >
              <div class="content_form">
                <el-form-item label="试卷标题" prop="exaTitle">
                  <el-input
                    clearable
                    placeholder="例：期中考试测评"
                    v-model="papersForm.exaTitle"
                  />
                </el-form-item>
                <el-form-item label="考试科目" prop="bookid">
                  <el-select
                    clearable
                    v-model="papersForm.bookid"
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
                <el-form-item label="试卷说明" prop="exaRemarks">
                  <el-input clearable v-model="papersForm.exaRemarks" />
                </el-form-item>
                <el-form-item label="考试次数" prop="exaDatinum">
                  <el-select
                    clearable
                    v-model="papersForm.exaDatinum"
                    placeholder="请考试次数"
                  >
                    <el-option
                      v-for="item in 10"
                      :key="item"
                      :label="item + '次'"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="考试开始时间" prop="exaStarttime">
                  <el-date-picker
                    v-model="papersForm.exaStarttime"
                    type="date"
                    placeholder="选择开始时间"
                    :picker-options="stratTime"
                    value-format="yyyy-MM-dd"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="考试结束时间" prop="exaEndtime">
                  <el-date-picker
                    v-model="papersForm.exaEndtime"
                    type="date"
                    placeholder="选择结束时间"
                    :picker-options="stratTime"
                    value-format="yyyy-MM-dd"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="答题时间(分钟)" prop="exaDatitime">
                  <el-input clearable placeholder="请输入数字" v-model="papersForm.exaDatitime" />
                </el-form-item>
                <el-form-item label="试卷题型结构" prop="exaQStructure">
                  <el-button size="mini" @click="selectType">选择题型</el-button>
                  <br>
                  <span> 已选 判断：{{ papersForm.exaQSid.length }} 道、单选：{{ papersForm.exaQSid.length }} 道、 已选多选：{{ papersForm.exaQSid.length }} 道</span>
                  <span> 已选填空：{{ papersForm.exaQSid.length }} 道、主观：{{ papersForm.exaQSid.length }} 道</span>
                </el-form-item>
                <el-form-item label="选择题目" prop="exaQSid">
                  <el-button size="mini" @click="addType">添加题目</el-button
                  ><span> 已选：{{ papersForm.exaQSid.length }} 道题</span>
                </el-form-item>
                <el-form-item label="取分规则" prop="exaJifenfangshi">
                  <el-radio-group v-model="papersForm.exaJifenfangshi">
                    <el-radio :label="1">分布式</el-radio>
                    <el-radio :label="2">等第式（不显示平均分）</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="考题状态" prop="status">
                  <el-radio-group v-model="papersForm.status">
                    <el-radio :label="1">暂时存稿</el-radio>
                    <el-radio :label="2">立即发布</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="发布">
                  <span>
                    <el-button @click="onSubmit()" class="cn_btn"
                      >立即发布</el-button
                    >
                  </span>
                </el-form-item>
              </div>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 添加题型对话框 -->
    <el-dialog
      title="添加题目"
      :visible.sync="queDialogVisible"
      width="80%"
      top="5vh"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <exercise @func="getContentId" />
    </el-dialog>
    <!-- 添加题型对话框 -->
    <el-dialog
      title="添加题型"
      :visible.sync="typeDialogVisible"
      width="80%"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <select-que @func="getQueType" />
    </el-dialog>
  </div>
</template>

<script>
import { papersAdd } from '@/api/classManage'
import exercise from '@/components/resourceList/exercise'
import SelectQue from '../../../components/dialogContent/selectQue.vue'
export default {
  components: { exercise, SelectQue },
  data() {
    return {
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
      papersForm: {
        exaTitle: '',
        bookid: '',
        exaQStructure: '',
        exaJifenfangshi: '',
        exaRemarks: '',
        exaDatitime: '',
        exaDatinum: 1,
        exaStarttime: '',
        exaEndtime: '',
        status: 1,
        exaQSid: [],
      },
      papersFormRules: {
        exaTitle: [
          { required: true, message: '请输入考试标题', trigger: 'blur' },
        ],
        exaStarttime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' },
        ],
        exaEndtime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' },
        ],
        exaJifenfangshi: [{ required: true, message: '请选择计分方式', trigger: 'blur' }],
        bookid: [
          { required: true, message: '请选择课本', trigger: 'blur' },
        ],
        exaRemarks: [
          { required: true, message: '请选择试卷说明', trigger: 'blur' },
        ],
        exaDatitime: [
          { required: true, message: '请填写答题时间(分钟)', trigger: 'blur' },
        ],
        exaQStructure: [
          { required: true, message: '请选择试卷题型结构', trigger: 'blur' },
        ],
        exaDatinum: [
          { required: true, message: '请选择答题次数', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' },
        ],
        exaQSid: [
          { required: true, message: '请选择题目', trigger: 'blur' },
        ],
      },
      typeDialogVisible: false,
      queDialogVisible: false,
      bookList: [],
    }
  },
  created() {
    this.getBookInfo()
  },
  computed: {},
  methods: {
    goBackList() {
      this.$router.go(-1)
    },
    addType() {
      this.queDialogVisible = true
    },
    selectType() {
      this.typeDialogVisible = true
    },
    handleClose() {
      this.typeDialogVisible = false;
      this.queDialogVisible = false;
    },
    // 获取子组件内容
    getContentId(data) {
      this.papersForm.exaQSid = data.contentId
      this.typeDialogVisible = data.contentDialogVisible
      console.log(this.papersForm.exaQSid.length)
    },
    getQueType(data) {
      this.typeDialogVisible = false;
      this.papersForm.exaQStructure = data;
    },
    // 获取课本列表
    async getBookInfo() {
      const { data: res } = await this.$http.get('api/textbook/lists')
      if (res.statusCode !== 200)
        return this.$message.error('获取课本列表失败！')
      this.bookList = res.data
    },
    onSubmit() {
      // this.exaDatinum = parseFloat(this.exaDatinum)
      this.exaDatitime = parseFloat(this.exaDatitime)
      this.papersForm.exaStarttime = this.papersForm.exaStarttime.toString()
      this.papersForm.exaEndtime = this.papersForm.exaEndtime.toString()
      this.$refs.papersFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('请填写必要的表单项！')
        console.log(this.papersForm);
        papersAdd(this.papersForm).then(res => {
          console.log(res);
          this.$message.success('发布作业成功!')
          this.canceSubmitl()
        })
      })
    },
    cancel() {
      this.$refs.papersFormRef.resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.goBack {
  color: #fff;
  font-size: 18px;
}
.goBack:hover {
  color: #fff;
}
.change_inviteCode {
  margin-left: 10px;
}
.content_form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  .el-date-editor, .el-select {
    width: 100%;
  }
  .el-form-item {
    width: 45%;
    margin: 0 20px 20px 20px;
  }
}
.cn_btn {
  width: 80%;
}
</style>
