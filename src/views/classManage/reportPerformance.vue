<template>
  <div class="reportPerformance_main">
    <div class="main_header">
      <h4>发布成绩</h4>
      <el-button type="text" @click="goBack" class="back_btn">返回</el-button>
    </div>

    <div class="reportPerformance_concent">
      <el-row>
        <el-col :span="24">
          <el-card shadow="always">
            <el-form ref="reportPerformanceFormRef" :model="reportPerformanceForm" :rules="reportPerformanceFormRules" label-position="top">
              <el-form-item label="考试名称" prop="examTitle">
                <el-input clearable placeholder="例：2020年数学期中测试" v-model="reportPerformanceForm.examTitle"></el-input>
              </el-form-item>
              <el-form-item label="科目默认满分" prop="fullPoints">
                <el-input :max="300" :min="0" type="number" clearable placeholder="例：100(只能填写数字)" v-model="reportPerformanceForm.fullPoints"></el-input>
              </el-form-item>
              <el-form-item label="科目名称" prop="examSubject">
                <el-input placeholder="例：数学" v-model="reportPerformanceForm.examSubject"></el-input>
              </el-form-item>
              <el-form-item label="计分方式" prop="achieveType">
                <el-radio-group v-model="reportPerformanceForm.achieveType">
                  <el-radio :label="1">分布式</el-radio>
                  <el-radio :label="2">等第制（不显示平均分）</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="班级" prop="class_id">
                <el-select clearable v-model="reportPerformanceForm.class_id" placeholder="请选择" @change="getStudentInfo(reportPerformanceForm.class_id)">
                  <el-option v-for="item in classList" :key="item.class_id" :label="item.className" :value="item.class_id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="成绩" prop="score_arr">
                <div v-for="item in studentList" :key="item.sid">
                  <el-row>
                    <el-col :span="3">
                      <span><strong>学号: </strong>{{item.stuNum}} </span>
                    </el-col>
                    <el-col :span="3">
                      <span><strong> 姓名: </strong>{{item.stuName}}</span>
                    </el-col>
                    <el-col :span="6">
                      <el-input size="small" :max="300" clearable placeholder="请输入成绩" v-model="item.score"></el-input>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
              <el-form-item>
                <div>
                  <el-button @click="onSubmit" class="cn_btn">立即发布</el-button>
                  <el-button>取消</el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classList: [],
      reportPerformanceForm: {
        class_id: '',
        examTitle: '',
        examSubject: '',
        achieveType: '',
        fullPoints: '',
        sid_arr: [],
        score_arr: []
      },
      // 学生列表
      studentList: [],
      reportPerformanceFormRules: {
        examTitle: [
          { required: true, message: '请输入考试名称！', trigger: 'blur' }
        ],
        fullPoints: [
          { required: true, message: '请输入总分分数！', trigger: 'blur' }
        ],
        examSubject: [
          { required: true, message: '请输入考试科目！', trigger: 'blur' }
        ],
        achieveType: [
          { required: true, message: '请选择计分方式！', trigger: 'blur' }
        ],
        class_id: [
          { required: true, message: '请选择考试班级！', trigger: 'blur' }
        ],
        score_arr: [
          { required: true, message: '请填写学生成绩！', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.getClassInfo();
  },
  methods: {
    // 返回按钮
    goBack() {
      this.$router.push('/performance');
    },
    // 获取班级信息
    async getClassInfo() {
      const { data: res } = await this.$http.get('api/classroom/myList')
      if(res.statusCode !== 200) return this.$message.error('获取班级列表失败！')
      this.classList = res.data;
    },
    // 获取学生信息
    async getStudentInfo(id) {
      this.studentList = [];
      const { data: res } = await this.$http.post('api/student/getName', { class_id: id})
      if(res.statusCode !== 200) return this.$message.error(res.msg)
      this.$message.success('获取学生信息成功！')
      res.data.map(item=> {
        this.studentList.push(Object.assign({},item,{score: ''}))
      })
      console.log(this.studentList);
    },
    // 发布成绩
    onSubmit() {
      this.reportPerformanceForm.sid_arr = Array.from(this.studentList,({sid})=>sid);
      this.reportPerformanceForm.score_arr = Array.from(this.studentList,({score})=>score);
      console.log(this.reportPerformanceForm);
      this.$refs.reportPerformanceFormRef.validate(async valid=>{
        if(!valid) return this.$message.error('请完整填写必要项！')

        const { data: res } = await this.$http.post(`api/classroom/addAchieve`, this.reportPerformanceForm)
        console.log(res);
        if(res.statusCode !== 200) return this.$message.error(res.msg)
        this.$message.success('发布成功！')

        this.$refs.reportPerformanceFormRef.resetFields();
        this.studentList = [];

        this.$router.push('/performance');
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.back_btn {
  color: #fff;
  font-size: 18px;
}
.back_btn:hover {
  color: #fff;
}
.cn_btn {
  width: 30%;
  color: #fff;
  background: linear-gradient(to bottom right,#9853af,#623AA2);
}
.cn_btn:hover, .cn_btn:focus {
  color: #fff;
}
.score_input {
  display: flex;
}
</style>