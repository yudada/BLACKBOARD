<template>
  <div class="detial_main">
    <Breadcrumb :navData="navData" />

    <div class="detial_concent">
      <el-row>
        <el-col :span="24">
          <el-card shadow="always" :body-style="{ padding: '0 10px' }">
            <el-table :data="detialData" style="width: 100%">
              <el-table-column prop="examTitle" label="考试名称" />
              <el-table-column prop="className" label="班级" />
              <el-table-column prop="examSubject" label="科目" />
              <el-table-column prop="examPersonNum" label="参考人数" />
              <el-table-column prop="fullPoints" label="总分" />
              <el-table-column prop="avgPoints" label="平均分" />
              <el-table-column prop="created_at" label="上传时间" />
            </el-table>
          </el-card>

          <el-card shadow="always">
            <div slot="header">
              <span>学生得分详细</span>
            </div>
            <el-table :data="studentData" style="width: 100%" stripe border>
              <el-table-column type="index" label="编号" width="50" />
              <el-table-column prop="stuName" label="姓名" />
              <el-table-column prop="stuPoints" label="得分" sortable />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="send" :loading="loading">
                    {{ scope.row.info }}
                  </el-button>
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
import { achievementDetail } from '@/api/classManage'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        childTitle: '成绩详情',
        goTo: '返回列表',
      },
      detialData: [],
      studentData: [],
      loading: false,
    }
  },
  created() {
    this.getdetail()
  },
  computed: {
    id: function () {
      return this.$route.query.id
    }
  },
  methods: {
    // 返回按钮
    goBack() {
      this.$router.push('/performance')
    },
    // 获取成绩报告详情
    async getdetail() {
      achievementDetail(this.id).then((res) => {
        const { student } = res.data
        this.detialData = Array(res.data)
        student.map((item) => {
          this.studentData.push(Object.assign({}, item, { info: '发送给家长' }))
        })
      })
    },
    // 发送
    send() {
      this.$message.info('功能开发中!')
    },
  }
}
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