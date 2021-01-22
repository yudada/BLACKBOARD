<template>
  <div class="establish_main">
    <Breadcrumb :navData="navData" />

    <div class="establish_concent">
      <el-card>
        <el-form
          ref="questionFormRef"
          :rules="questionFormRules"
          :model="questionForm"
          label-width="80px"
          label-position="top"
        >
          <el-form-item label="题纲" prop="queSubjectType">
            <el-radio-group
              v-model="questionForm.queSubjectType"
              class="que_sbj"
            >
              <el-radio :label="1">练习题</el-radio>
              <el-radio :label="2">自检题</el-radio>
              <el-radio :label="3">历年考题</el-radio>
              <div v-show="questionForm.queSubjectType === 3">
                <el-input
                  type="number"
                  v-model="questionForm.queYear"
                  placeholder="请输入年份 例：2022"
                  size="mini"
                  @input="numScope"
                ></el-input>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="题型" prop="queType">
            <el-radio-group
              v-model="questionForm.queType"
              @change="queTypeChange"
            >
              <el-radio :label="1">判断题</el-radio>
              <el-radio :label="2">单选题</el-radio>
              <el-radio :label="3">多选题</el-radio>
              <el-radio :label="4">填空题</el-radio>
              <el-radio :label="5">主观题</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="题目(如果是填写题，请在答案处填写  *?* )"
            prop="queTitle"
          >
            <el-input
              type="textarea"
              v-model="questionForm.queTitle"
              placeholder="例： 经济 *？* 金融， 经济发展 *？* 金融发展， 金融发展 *？* 经济发展。"
            ></el-input>
          </el-form-item>
          <el-form-item label="答案选项">
            <div class="question_content">
              <!-- 判断 -->
              <div v-if="questionForm.queType === 1">
                <el-row>
                  <el-col :span="8">
                    <span>答案(正确为：T 错误为：F)</span>
                    <el-radio-group v-model="answerContent">
                      <el-radio label="T">正确</el-radio>
                      <el-radio label="F">错误</el-radio>
                    </el-radio-group>
                  </el-col>
                </el-row>
              </div>
              <!-- 单选 -->
              <div v-if="questionForm.queType === 2">
                <el-row>
                  <el-col :span="1">
                    <span>答案</span>
                    <el-radio-group v-model="answerContent">
                      <el-radio label="A"></el-radio>
                      <el-radio label="B"></el-radio>
                      <el-radio label="C"></el-radio>
                      <el-radio label="D"></el-radio>
                    </el-radio-group>
                  </el-col>
                  <el-col :span="22">
                    <span>(一行一个选项)</span>
                    <div>
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="questionForm.queOptions"
                      />
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- 多选 -->
              <div v-if="questionForm.queType === 3">
                <el-row>
                  <el-col :span="1">
                    <span>答案</span>
                    <el-checkbox-group v-model="answerContent">
                      <el-checkbox
                        v-for="(item, index) in queAnswerList"
                        :key="index"
                        :label="item.label"
                      ></el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                  <el-col :span="22">
                    <span>(一行一个选项)</span>
                    <div>
                      <el-input
                        type="textarea"
                        :rows="7"
                        v-model="questionForm.queOptions"
                      />
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- 填空 -->
              <div v-if="questionForm.queType === 4">
                <el-input v-model="answerContent"></el-input>
              </div>
              <!-- 主观 -->
              <div v-if="questionForm.queType === 5">
                <el-input
                  type="textarea"
                  :rows="5"
                  v-model="answerContent"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="解题思路">
            <el-input v-model="questionForm.queSolving"></el-input>
          </el-form-item>
          <el-form-item label="知识点">
            <el-button size="small" @click="openContent">点击选择</el-button>
            <span> 已选：{{ questionForm.queKnowledge.length }} 个知识点</span>
          </el-form-item>
          <el-form-item label="习题对象">
            <el-select
              v-model="questionForm.quePracticeSubject"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in quePracticeSubjectList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="questionForm.status">
              <el-radio :label="0">暂存草稿</el-radio>
              <el-radio :label="1">发布显示</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" class="cn_btn">{{btnText}}</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!-- 作业内容弹框 -->
    <el-dialog
      title="请选择内容:"
      :visible.sync="queKnowledgeDialogVisible"
      width="80%"
      top="5vh"
      :append-to-body="true"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <add-quetion @func="fromSun" :bookId="book" :selecdId="questionForm.queKnowledge" />
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb.vue'
import AddQuetion from '../../components/dialogContent/addQuetion.vue'
import { addQuetions, editQuetions, detailQuetions } from '@/api/Question'
export default {
  components: { Breadcrumb, AddQuetion },
  data() {
    return {
      navData: {
        title: '题库资源',
        childTitle: '创建题库',
      },
      questionForm: {
        queSubjectType: '',
        queType: '',
        queTitle: '',
        queSolving: '',
        questionForm: '',
        quePracticeSubject: '',
        status: '',
        queOptions: '',
        queAnswer: '',
        queKnowledge: [],
        queYear: '',
      },
      questionFormRules: {
        queSubjectType: [
          { required: true, message: '请选择题纲', trigger: 'blur' },
        ],
        queType: [{ required: true, message: '请选择题型', trigger: 'blur' }],
        queTitle: [{ required: true, message: '请填写题目', trigger: 'blur' }],
        status: [
          { required: true, message: '请选择发布状态', trigger: 'blur' },
        ],
      },
      quePracticeSubjectList: [],
      answerContent: [],
      queAnswerList: [
        { id: 0, label: 'A' },
        { id: 1, label: 'B' },
        { id: 2, label: 'C' },
        { id: 3, label: 'D' },
        { id: 4, label: 'E' },
        { id: 5, label: 'F' },
        { id: 6, label: 'G' },
      ],
      queKnowledgeDialogVisible: false,
      book: ''
    }
  },
  computed: {
    queId: function () {
      return this.$route.query.id;
    },
    btnText: function() {
      return this.$route.query.id ? '保存编辑' : '立即创建'
    }
  },
  created() {
    this.getQuePracticeSubjec()
    if(this.$route.query.id) {
      this.navData = {
        childTitle: '编辑题库',
        goTo: '返回列表'
      }
      this.getQueById()
    }
  },
  methods: {
    async getQueById() {
     const { data: res } = await this.$http.get(`api/library/${this.queId}`) 
     if(res.statusCode !== 200) return this.$message.error('获取详细信息失败！')
     console.log(res.data);
     this.questionForm = res.data;
     this.book = res.data.textbook_id;
     this.optiongsContent = res.data.queOptions;
     this.questionForm.queKnowledge = res.data.dir_id;
     
     const { queAnswer } = res.data;
     const answerContent = decodeURIComponent(window.escape(atob(queAnswer))).split(',');
     if(answerContent.length > 1) {
       this.answerContent = answerContent
     } else {
       this.answerContent = answerContent.toString();
     }
     console.log(this.answerContent);
    },
    async getQuePracticeSubjec() {
      const { data: res } = await this.$http.get(`api/common/constant`)
      if (res.statusCode !== 200) return this.$message.error(res.msg)
      const { periodArr } = res.data
      this.quePracticeSubjectList = Object.values(periodArr)
    },
    // 发布作业
    onSubmit() {
      this.$refs.questionFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('请完整填写必要项！')
        this.questionForm.queAnswer = this.answerContent.toString()
        console.log(this.questionForm);
        if(this.queId) {
          editQuetions(this.queId, this.questionForm).then(res=>{
            // console.log(res,'编辑');
            this.$message.success(res.msg)
            if(this.questionForm.queSubjectType === 1) this.$router.push('/expand')
            if(this.questionForm.queSubjectType === 2) this.$router.push('/textbook')
            if(this.questionForm.queSubjectType === 3) this.$router.push('/history')
          })
        } else {
          addQuetions(this.questionForm).then(res =>{
            // console.log(res, '保存');
            this.$message.success(res.msg)
            if(this.questionForm.queSubjectType === 1) this.$router.push('/expand')
            if(this.questionForm.queSubjectType === 2) this.$router.push('/textbook')
            if(this.questionForm.queSubjectType === 3) this.$router.push('/history')
          })
        }
      })
    },
    queTypeChange() {
      if(this.questionForm.queType === 4 || this.questionForm.queType === 5) {

        this.answerContent = ''
      } else {
        
        this.answerContent = []
      }
      this.questionForm.queOptions = ''
    },
    // 知识点弹框
    openContent() {
      this.queKnowledgeDialogVisible = true
    },
    // 年份范围
    numScope() {
      if (this.questionForm.queYear > 9999) {
        this.questionForm.queYear = ''
        this.$message.info('超过最大值')
      }
    },
    fromSun(data) {
      this.queKnowledgeDialogVisible = false
      this.questionForm.queKnowledge = data
      console.log(data);
    },
    handleClose() {
      this.queKnowledgeDialogVisible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.question_content {
  width: 95%;
  padding: 1rem;
  background: #efefef;
  .el-radio-group {
    display: flex;
    flex-direction: column;
    .el-radio {
      padding: 0.75rem;
    }
  }
  .el-checkbox-group {
    display: flex;
    flex-direction: column;
  }
  .el-input {
    width: 80%;
  }
}
</style>
<style lang="scss">
.content_dialog {
  .el-table .cell {
    display: flex;
  }
}
.que_sbj {
  display: flex;
  align-items: center;
}
.question_content {
  .el-textarea__inner {
    line-height: 2.4rem;
    font-size: 1rem;
    text-decoration: underline;
  }
}
</style>
