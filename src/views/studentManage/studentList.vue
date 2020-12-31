<template>
  <div class="studentList_main">
    <Breadcrumb :navData="navData" />

    <div class="studentList_concent">
      <el-row>
        <el-col :span="24">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo"
            clearable
            @clear="getStudentList">
            <el-button
            class="search"
              slot="append"
              icon="el-icon-search"
              @click="getStudentList"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-card shadow="always">
            <el-table :data="studentList" style="width: 100%" v-loading="loading" stripe border>
              <el-table-column type="index"  label="序号" />
              <el-table-column prop="className" label="班级" />
              <el-table-column prop="stuNum" label="学号" />
              <el-table-column prop="stuName" label="姓名" />
              <el-table-column prop="sex" label="性别" :formatter="formatterCellval" />
              <el-table-column prop="exercise" label="作业行为" :formatter="formatterCellval" />
              <el-table-column prop="reading" label="阅读行为" :formatter="formatterCellval" />
              <el-table-column prop="comprehensive" label="综合行为" :formatter="formatterCellval" />
              <el-table-column prop="weekRemarks" label="本周评语" :formatter="formatterCellval" />
              <el-table-column prop="monthRemarks" label="本月评语" :formatter="formatterCellval" />
              <!-- <el-table-column label="学习报告" :formatter="formatterCellval">
                <template>
                  <el-button type="text">查看</el-button>
                </template>
              </el-table-column> -->
              <el-table-column label="编辑信息" prop="monthRemarks" width="120">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-view" size="mini" circle @click="editStudentPage(scope.row.sid)"></el-button>
                  <el-button type="danger" size="mini" @click="removeById(scope.row.sid)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 60, 80, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
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
        title: '学生管理',
        childTitle: '学生列表'
      },
      classInfo: {},
      studentList: [],
      studentList: [],
      // 分页信息
      queryInfo: '',
      currentPage: 1,
      pageSize: 20,
      total: 0,
      loading: true
    };
  },
  created() {
    this.getClassInfo();
  },
  methods: {
    // 获取班级信息
    async getClassInfo() {
      const { data: res } = await this.$http.post(`api/student/create`)
      if (res.statusCode !== 200) return this.$message.error(res.msg)
      this.classInfo = res.data
      console.log(res.data);

      this.getStudentList();
    },
    // 获取学生列表
    async getStudentList() {
      const { data: res } = await this.$http.post(`api/student/lists`, { limit: this.pageSize})
      if (res.statusCode !== 200) return this.$message.error(res.msg)
      this.studentList = res.data.data
      this.total = res.data.total;
      this.currentPage = res.data.current_page;
      this.pageSize = res.data.per_page;

      this.loading = false

      console.log(res.data);
    },
    editStudentPage(sid) {
      this.$router.push({path:'./profile', query: {sid:sid}})
    },
    // 分页
    handleSizeChange(newSize) {
    this.pageSize = newSize
    this.getStudentList();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getStudentList();
    },
    // 删除学生
    async removeById(sid) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该学生, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') {
        return 
      }
      console.log(confirmResult);
      const { data: res } = await this.$http.delete(`api/student/${sid}`)
      if(res.statusCode !== 200) return this.$message.error('删除失败！')

      this.$message.success('删除成功！')
      this.getStudentList();
    },
    // 表格无数据显示占位符
    formatterCellval(row, column, cellValue, index) {
      if (!Boolean(cellValue)) {
          return "— —";
      } else {
          return cellValue;
      }
    }
  },
};
</script>