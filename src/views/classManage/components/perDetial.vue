<template>
  <div class="detial_main">
    <Breadcrumb :navData="navData" />

    <div class="detial_concent">
      <el-row>
        <el-col :span="24">
          <el-card shadow="always" :body-style="{ padding: 0 }">
            <el-table :data="detialData" style="width: 100%" stripe border>
              <el-table-column prop="examTitle" label="考试名称">
              </el-table-column>
              <el-table-column prop="className" label="班级">
              </el-table-column>
              <el-table-column prop="examSubject" label="科目">
              </el-table-column>
              <el-table-column prop="examPersonNum" label="参考人数">
              </el-table-column>
              <el-table-column prop="fullPoints" label="总分">
              </el-table-column>
              <el-table-column prop="avgPoints" label="平均分">
              </el-table-column>
              <el-table-column prop="created_at" label="上传时间">
              </el-table-column>
            </el-table>
          </el-card>
          
          <el-card shadow="always">
            <div slot="header">
              <span>学生得分详细</span>
            </div>
            <el-table :data="studentData" style="width: 100%" stripe border>
              <el-table-column type="index" label="编号" width="180">
              </el-table-column>
              <el-table-column prop="stuName" label="姓名">
              </el-table-column>
              <el-table-column prop="stuPoints" label="得分" sortable>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="send" :loading="loading">{{ scope.row.info }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        childTitle: '成绩详情',
        goTo: '返回列表'
      },
      detialData: [],
      studentData: [],
      loading: false
    };
  },
  created() {
    this.getdetail()
  },
  methods: {
    // 返回按钮
    goBack() {
      this.$router.push("/performance");
    },
    // 获取成绩报告详情
    async getdetail() {
      const { data: res } = await this.$http.post(`api/classroom/achievement/${this.id}`);
      if (res.statusCode !== 200) return this.$message.error('获取详细信息失败！')
      console.log(res);
      this.detialData = Array(res.data);
      res.data.student.map(item=>{
        this.studentData.push(Object.assign({}, item, {info: '发送给家长'}))
      })
    },
    // 发送
    send() {
      this.$message.info('功能开发中!')
    }
  },
  computed: {
    id: function () {
      return this.$route.query.id;
    },
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 30px;
}
.back_btn {
  color: #fff;
  font-size: 18px;
}
.back_btn:hover {
  color: #fff;
}
</style>