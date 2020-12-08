<template>
  <div class="establish_main">
    <div class="main_header">
      <h4>创建题库</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">题库资源</a></el-breadcrumb-item>
        <el-breadcrumb-item>创建题库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="establish_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <el-form ref="questionFormRef" :rules="questionFormRules" :model="questionForm" label-width="80px" label-position="top">
              <el-form-item label="提纲" prop="queSubjectType">
                <el-radio-group v-model="questionForm.queSubjectType" class="que_sbj">
                  <el-radio :label="1">练习题</el-radio>
                  <el-radio :label="2">自检题</el-radio>
                  <el-radio :label="3">历年考题</el-radio>
                  <div v-show="questionForm.queSubjectType === 3">
                    <el-input type="number" v-model="questionForm.queYear" placeholder="请输入年份 例：2022" size="mini" @input="numScope"></el-input>
                  </div>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="题型" prop="queType">
                <el-radio-group v-model="questionForm.queType" @change="queTypeChange">
                  <el-radio :label="1">判断</el-radio>
                  <el-radio :label="2">单选</el-radio>
                  <el-radio :label="3">多选</el-radio>
                  <el-radio :label="4">填空</el-radio>
                  <el-radio :label="5">主观题</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="题目" prop="queTitle">
                <el-input type="textarea" v-model="questionForm.queTitle" placeholder="如果是填写题，请在答案处填写  *?* "></el-input>
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
                      <el-col :span="16">
                        <span>内容</span>
                        <div>
                          <el-input v-model="optiongsContent.A"></el-input>
                          <el-input v-model="optiongsContent.B"></el-input>
                          <el-input v-model="optiongsContent.C"></el-input>
                          <el-input v-model="optiongsContent.D"></el-input>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <span>答案</span>
                        <el-radio-group v-model="answerContent">
                          <el-radio label="A"></el-radio>
                          <el-radio label="B"></el-radio>
                          <el-radio label="C"></el-radio>
                          <el-radio label="D"></el-radio>  
                        </el-radio-group>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 多选 -->
                  <div v-if="questionForm.queType === 3">
                    <el-row>
                      <el-col :span="16">
                        <span>内容</span>
                        <div>
                          <el-input v-model="optiongsContent.A"></el-input>
                          <el-input v-model="optiongsContent.B"></el-input>
                          <el-input v-model="optiongsContent.C"></el-input>
                          <el-input v-model="optiongsContent.D"></el-input>
                          <el-input v-model="optiongsContent.E"></el-input>
                          <el-input v-model="optiongsContent.F"></el-input>
                          <el-input v-model="optiongsContent.G"></el-input>      
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <span>答案</span>
                        <el-checkbox-group v-model="answerContent">
                          <el-checkbox v-for="(item, index) in queAnswerList" :key="index" :label="item.label"></el-checkbox>
                        </el-checkbox-group>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 填空 -->
                  <div v-if="questionForm.queType === 4">
                    <el-row>
                      <el-col :span="16">
                        <span>内容</span>
                        <div>
                          <el-input v-model="optiongsContent.A"></el-input>
                          <el-input v-model="optiongsContent.B"></el-input>
                          <el-input v-model="optiongsContent.C"></el-input>
                          <el-input v-model="optiongsContent.D"></el-input>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <span>答案</span>
                        <el-radio-group v-model="answerContent">
                          <el-radio label="A"></el-radio>
                          <el-radio label="B"></el-radio>
                          <el-radio label="C"></el-radio>
                          <el-radio label="D"></el-radio>  
                        </el-radio-group>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 主观 -->
                  <div v-if="questionForm.queType === 5">
                      <el-input type="textarea" :rows="5" v-model="answerContent[0]"></el-input>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="解题思路">
                <el-input v-model="questionForm.queSolving"></el-input>
              </el-form-item>
              <el-form-item label="知识点">
                <el-button size="small" @click="openContent">点击选择</el-button>
                <span> 已选：{{questionForm.queKnowledge.length}} 个知识点</span>
              </el-form-item>
              <el-form-item label="习题对象">
                <el-select v-model="questionForm.quePracticeSubject" placeholder="请选择">
                  <el-option v-for="(item, index) in quePracticeSubjectList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-radio-group v-model="questionForm.status">
                  <el-radio :label="0">暂存草稿</el-radio>
                  <el-radio :label="1">发布显示</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button @click="onSubmit" class="cn_btn">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 作业内容弹框 -->
    <el-dialog  title="请选择内容:" :visible.sync="queKnowledgeDialogVisible" width="80%" top="5vh" :append-to-body="true" :close-on-click-modal="false" :destroy-on-close="true">
      <div class="content_dialog">
        <el-select clearable v-model="book" placeholder="请选择课本"  @change="getbookInfo(book)">
          <el-option v-for="item in bookList" :key="item.id" :label="item.bookName + item.subName" :value="item.id"></el-option>
        </el-select>
        <el-table
          ref="bookDirRef"
          :data="bookDir"
          style="width: 100%"
          row-key="id"
          default-expand-all
          :tree-props="{children: 'child', hasChildren: 'hasChildren'}">
          <el-table-column width="55">
            <template #header>
              <el-checkbox
              v-model="checkAll"
              @change="toggleAllSeclection">
              </el-checkbox>
            </template>
            <template #default='{row}'>
              <el-checkbox v-model="row.isChecked"
              @change="toggleSelection(row)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="目录" prop="dirName">
          </el-table-column>
          <el-table-column label="页码" prop="pageNum" width="55">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="queKnowledgeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="queKnowledgeDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        queYear: ''
      },
      questionFormRules: {
        queSubjectType: [
          { required: true, message: '请选择提纲', trigger: 'blur' }
        ],
        queType: [
          { required: true, message: '请选择题型', trigger: 'blur' }
        ],
        queTitle: [
          { required: true, message: '请填写题目', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择发布状态', trigger: 'blur' }
        ]
      },
      quePracticeSubjectList: [],
      optiongsContent: {
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: ''
      },
      answerContent: [],
      queAnswerList: [
        { id: 0, label: 'A' },
        { id: 1, label: 'B' },
        { id: 2, label: 'C' },
        { id: 3, label: 'D' },
        { id: 4, label: 'E' },
        { id: 5, label: 'F' },
        { id: 6, label: 'G' }
      ],
      queKnowledgeDialogVisible: false,
      book:'',
      bookList: [],
      bookInfo: {},
      bookDir: [],
      checkAll: false
    }
  },
  created() {
    this.getQuePracticeSubjec();
  },
  methods: {
    async getQuePracticeSubjec() {
      const { data: res } = await this.$http.get(`api/common/constant`)
      if(res.statusCode !== 200) return this.$message.error(res.msg)
      const {periodArr} =res.data;
      this.quePracticeSubjectList = Object.values(periodArr)
    },
    // 发布作业
    onSubmit() {
      this.$refs.questionFormRef.validate(async valid=> {
        if(!valid) return this.$message.error('请完整填写必要项！')

        const data = this.optiongsContent;
        for ( let key in data ){
          if ( data[key] === '' ){
            delete data[key]
          }
        }
        this.questionForm.queOptions = data;
        this.questionForm.queAnswer = this.answerContent.toString();
        const { data: res } = await this.$http.post(`api/library/store`, this.questionForm)
        if (res.statusCode !== 200) return this.$message.error('添加题目失败！')
        this.$message.success('添加题目成功!')

        this.questionForm.queKnowledge = [];
        this.$refs.questionFormRef.resetFields();
      })
    },
    queTypeChange() {
      this.optiongsContent = { A: '', B: '', C: '', D: '', E: '', F: '', G: '' },
      this.answerContent = [];
    },
    // 知识点弹框
    openContent() {
      this.queKnowledgeDialogVisible = true;
      this.getbookList();
    },
    // 获取课本列表
    async getbookList() {
      const { data: res } = await this.$http.get('api/textbook/lists')
      if (res.statusCode !== 200) return this.$messsage.error('获取课本列表失败！')
      this.bookList = res.data
    },
    // 获取课本信息
    async getbookInfo() {
      const bookId = this.book
      const { data: res } = await this.$http.get(`api/textbook/${bookId}`);
      if (res.statusCode !== 200) return this.$message.error(res.msg);
      this.bookInfo = res.data;

      this.bookDir = this.setChecked(res.data.textbook_dir)
    },
    // 知识点部分
    // 数据初始化
    setChecked(bookDir, checked = false) {
      const result = bookDir.map(item=>{
        const { child = [] } = item;
        return {
          ...item,
          isChecked: checked,
          child: this.setChecked(child, checked )
        }
      })
      return result
    },
    // 全选
    toggleAllSeclection() {
      const { checkAll, bookDir } = this;
      this.bookDir = this.setChecked(bookDir, checkAll);
      const father = [];
      const children = [];
      this.bookDir.map(item=>{
        if(item.isChecked == true) {
          father.push(item.id)
        }
      });
      for(let item of this.bookDir) {
        item.child.map(childItem=> {
          if(childItem.isChecked ==true) {
            children.push(childItem.id)
          }
        })
      }
      this.questionForm.queKnowledge = [...father,...children]
      console.log(this.questionForm.queKnowledge = [...father,...children]);
    },
    // 选择
    toggleSelection(row) {
      this.questionForm.queKnowledge = [];
      const { child = [], isChecked } = row;
      if(child.length) {
        row.child.forEach(item=> {
          item.isChecked = isChecked;
        });
      } else {
        const { bookDir } = this;
        for(let item of bookDir){
          if(item.id === row.parent_id){
            const checked = item.child.filter(childItem => childItem.isChecked);
            const checkedCount = checked.length;
            item.isChecked = checkedCount > 0;
            break;
          }
        }
      };
      const { bookDir } = this;
      const father = [];
      const children = [];
      bookDir.map(item=>{
        if(item.isChecked == true) {
          father.push(item.id)
        }
      });
      for(let item of bookDir) {
        item.child.map(childItem=> {
          if(childItem.isChecked == true) {
            children.push(childItem.id)
          }
        })
      }
      this.questionForm.queKnowledge = [...father,...children];

      const checked = bookDir.filter(item=> item.isChecked)
      if( bookDir.length === checked.length) {
        this.checkAll = true;
        return
      }
      return this.checkAll = false;
    },
    // 年份范围
    numScope() {
      if (this.questionForm.queYear > 9999) {
        this.questionForm.queYear = '';
        this.$message.info('超过最大值')
      }
    }
  },  
}
</script>

<style lang="scss" scoped>
.question_content{
  width: 60%;
  padding: 1rem;
  background: #efefef;
  .el-radio-group {
    display: flex;
    flex-direction: column;
    .el-radio{
      padding: 0.75rem ;
    }
  }
  .el-checkbox-group{
    display: flex;
    flex-direction: column;
  }
  .el-input {
    width: 80%;
  }
}

  .card_img {
    img {
      width: 100%;
    }
  }
  .card_info {
    padding: 1rem;
    .ava {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 2rem 0 1rem 0;
      .ava_img {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 25%;
          border-radius: 100%;
          margin-right: 1rem;
        }
        .info {
          p {
            margin: 0;
          }
        }
      }
      .ava_info {
        display: flex;
        justify-content: space-between;
        i {
          margin: 0.5rem;
        }
      }
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
</style>
