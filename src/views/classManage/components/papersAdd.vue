<template>
  <div class="addPapers_main">
    <Breadcrumb :navData="navData" />
    <div class="addPapers_concent">
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
            <el-form-item label="答题次数" prop="exaDatinum">
              <el-select
                clearable
                v-model="papersForm.exaDatinum"
                placeholder="请答题次数"
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
              <el-input
                clearable
                type="number"
                placeholder="请输入数字"
                v-model="papersForm.exaDatitime"
              />
            </el-form-item>
            <el-form-item label="试卷题型结构" prop="exaQStructure">
              <el-button class="btn_select" size="mini" @click="selectType">选择题型</el-button>
              <br />
              <span>已选: </span>
              <span
                v-for="(item, index) in papersForm.exaQStructure"
                :key="index"
              >
                <span v-if="item.num">{{ item.type }} {{ item.num }} 道 </span>
                <span v-else>{{ item.type }} 0 道 </span>
              </span>
            </el-form-item>
            <el-form-item label="选择题目" prop="exaQSid">
              <el-button class="btn_select" size="mini" @click="addType">添加题目</el-button
              ><span> 已选：{{ papersForm.exaQSid.length }} 道题</span>
            </el-form-item>
            <el-form-item label="取分规则" prop="exaJifenfangshi">
              <el-radio-group v-model="papersForm.exaJifenfangshi">
                <el-radio :label="1">分布式</el-radio>
                <el-radio :label="2">等第式（不显示平均分）</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="试卷状态" prop="status">
              <el-radio-group v-model="papersForm.status">
                <el-radio :label="2">暂时存稿</el-radio>
                <el-radio :label="1">立即发布</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="发布">
              <span>
                <el-button @click="onSubmit()" class="cn_btn">{{
                  btnText
                }}</el-button>
              </span>
            </el-form-item>
          </div>
        </el-form>
      </el-card>
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
      <Exercise @func="getContentId" :queId="papersForm.exaQSid" />
    </el-dialog>
    <!-- 添加题型对话框 -->
    <el-dialog
      title="添加题型"
      :visible.sync="typeDialogVisible"
      width="80%"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <Select-que @func="getQueType" :queType="papersForm.exaQStructure"  />
    </el-dialog>
  </div>
</template>

<script>
import { papersAdd, parperDetail, papersEdit } from '@/api/classManage'
import Exercise from '@/components/resourceList/exercise'
import SelectQue from '@/components/dialogContent/selectQue.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { Exercise, SelectQue, Breadcrumb },
  data() {
    return {
      navData: {
        childTitle: '发布试卷',
        goTo: '返回列表',
      },
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
        exaQStructure: [
          { num: '', score: '', type: '判断题' },
          { num: '', score: '', type: '单选题' },
          { num: '', score: '', type: '多选题' },
          { num: '', score: '', type: '填空题' },
          { num: '', score: '', type: '主观题' },
        ],
        exaJifenfangshi: '',
        exaRemarks: '',
        exaDatitime: '',
        exaDatinum: 1,
        exaStarttime: '',
        exaEndtime: '',
        status: 2,
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
        exaJifenfangshi: [
          { required: true, message: '请选择计分方式', trigger: 'blur' },
        ],
        bookid: [{ required: true, message: '请选择课本', trigger: 'blur' }],
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
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
        exaQSid: [{ required: true, message: '请选择题目', trigger: 'blur' }],
      },
      typeDialogVisible: false,
      queDialogVisible: false,
      bookList: [],
    }
  },
  created() {
    this.getBookInfo()
    if (this.parperId) {
      this.navData.childTitle = '编辑试卷'
      this.getParpersDetail()
    }
  },
  computed: {
    parperId: function () {
      return this.$route.query.id
    },
    btnText: function () {
      return this.$route.query.id ? '保存修改' : '发布试卷'
    },
  },
  methods: {
    addType() {
      this.queDialogVisible = true
    },
    selectType() {
      this.typeDialogVisible = true
    },
    handleClose() {
      this.typeDialogVisible = false
      this.queDialogVisible = false
    },
    // 获取子组件内容
    getContentId(data) {
      this.papersForm.exaQSid = data.contentId
      this.queDialogVisible = false
      console.log(this.papersForm.exaQSid.length)
    },
    getQueType(data) {
      this.typeDialogVisible = false
      this.papersForm.exaQStructure = data
    },
    // 获取课本列表
    async getBookInfo() {
      const { data: res } = await this.$http.get('api/textbook/lists')
      if (res.statusCode !== 200)
        return this.$message.error('获取课本列表失败！')
      this.bookList = res.data
    },
    // 获取试卷详情
    getParpersDetail() {
      parperDetail(this.parperId).then((res) => {
        console.log(res)
        this.papersForm = res.data
        this.papersForm.exaQStructure.map((item) => {
          if (item.type === 'judge') item.type = '判断题'
          if (item.type === 'single') item.type = '单选题'
          if (item.type === 'multiple') item.type = '多选题'
          if (item.type === 'filling') item.type = '填空题'
          if (item.type === 'subjective') item.type = '主观题'
        })
      })
    },
    // 发布-编辑
    onSubmit() {
      this.papersForm.exaDatinum = parseFloat(this.papersForm.exaDatinum)
      this.papersForm.exaDatitime = parseFloat(this.papersForm.exaDatitime)
      this.papersForm.exaQStructure.map((item) => {
        if (item.type === '判断题') item.type = 'judge'
        if (item.type === '单选题') item.type = 'single'
        if (item.type === '多选题') item.type = 'multiple'
        if (item.type === '填空题') item.type = 'filling'
        if (item.type === '主观题') item.type = 'subjective'
      })
      this.$refs.papersFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('请填写必要的表单项！')
        console.log(this.papersForm)
        if (!this.$route.query.id) {
          // 保存
          papersAdd(this.papersForm).then((res) => {
            if (res.statusCode !== 200) return
            this.$message.success('发布试卷成功!')
            this.papersForm.exaQStructure = [
              { num: '', score: '', type: '判断题' },
              { num: '', score: '', type: '单选题' },
              { num: '', score: '', type: '多选题' },
              { num: '', score: '', type: '填空题' },
              { num: '', score: '', type: '主观题' },
            ]
            this.cancelSubmitl()
          })
        } else {
          // 编辑
          console.log('编辑')
          delete this.papersForm.created_at
          papersEdit(this.parperId,this.papersForm).then((res) => {
            if (res.statusCode !== 200) return
            this.$message.success('编辑试卷成功!')
            this.getParpersDetail();
          })
        }
      })
    },
    cancelSubmitl() {
      this.$refs.papersFormRef.resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
.content_form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  .el-date-editor,
  .el-select {
    width: 100%;
  }
  .el-form-item {
    width: 45%;
    margin: 0 20px 20px 20px;
  }
}
.btn_select {
  color: #fff !important;
  background: linear-gradient(to bottom right, #9853af, #623AA2) !important;
}
.btn_select:hover, .btn_select:focus {
  opacity: 0.8;
}
.cn_btn {
  width: 80%;
}
</style>
