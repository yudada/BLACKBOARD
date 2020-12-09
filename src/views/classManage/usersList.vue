<template>
  <div class="usersList_main">
    <div class="main_header">
      <h4>学生列表</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">班级管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>学生列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="usersList_concent">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card :body-style="{ padding: 0 }">
            <div slot="header" class="header_text">
              <span>班主任</span>
            </div>
            <div class="adviser_card">
              <img src="../../assets/images/faces/female/15.jpeg" alt="" />
              <div class="adviser_info">
                <h3>{{ adviserInfo.realName }} 老师</h3>
                <div class="info_text">
                  <p>
                    地址 : <span>{{ adviserInfo.address }}</span>
                  </p>
                  <p>
                    联系电话 : <span>{{ adviserInfo.mobile }}</span>
                  </p>
                </div>
              </div>
            </div>
          </el-card>

          <el-card v-if="teacherList[0]">
            <div slot="header">
              <span>学科老师</span>
            </div>
            <div>
              <div
                v-for="(teacher, index) in teacherList"
                :key="index"
                class="teacher_card item"
              >
                <div class="teacher_info">
                  <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  ></el-avatar>
                  <div class="info_text">
                    <span>{{ teacher.teaName }}</span>
                    <span>{{ teacher.teaSubject }}</span>
                  </div>
                </div>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <i style="color: #636262"
                      class="el-icon-arrow-down el-icon-circle-plus"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </el-card>
          <el-card v-else>
            <div slot="header">
              <span>学科老师</span>
            </div>
            <div class="teacher_info">
              <div class="info_text">
                <span>暂无老师</span>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="18">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo"
            clearable
            @clear="getStudentList">
            <el-button slot="append" icon="el-icon-search" @click="getStudentList"></el-button>
          </el-input>
          <el-card :body-style="{ padding: 0 }">
            <div slot="header">
              <span>全班</span>
            </div>
            <el-table
              ref="multipleTable"
              :data="studentData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              v-loading="loading">
              <el-table-column type="selection"> </el-table-column>
              <el-table-column width="70">
                <template slot-scope="scope">
                  <el-avatar v-if="!scope.row.photo" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  <el-avatar v-else :src="scope.row.photo"></el-avatar>
                </template>
              </el-table-column>
              <el-table-column label="姓名">
                <template slot-scope="scope">{{ scope.row.stuName }}</template>
              </el-table-column>
              <el-table-column label="阅读" :formatter="formatterCellval">
                <template slot-scope="scope">{{ scope.row.time }}</template>
              </el-table-column>
              <el-table-column label="练习" :formatter="formatterCellval">
                <template slot-scope="scope">{{ scope.row.exercise }}</template>
              </el-table-column>
              <el-table-column label="本周奖评" :formatter="formatterCellval">
                <template slot-scope="scope">{{ scope.row.appraise }}</template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="padding: 10px 20px"
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
export default {
  data() {
    return {
      class_arr: {},
      adviserInfo: {
        realName: "",
        address: "",
        mobile: "",
      },
      teacherList: [],
      queryInfo: "",
      currentPage: 1,
      pageSize: 20,
      total: 0,
      studentData: [],
      loading: true,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      const { data: res } = await this.$http.get(`api/user/info`);
      if (res.statusCode !== 200)
        return this.$message.error("获取用户信息失败！");
      this.class_arr = res.data.class_arr[0];
      this.getClassInfo();
    },
    // 获取班级信息
    async getClassInfo() {
      if(!this.class_arr.class_id || this.class_arr.class_id === null) {
        this.loading = false;
        return
      }
      const { data: res } = await this.$http.get(
        `api/classroom/${this.class_arr.class_id}`
      );
      if (res.statusCode !== 200)
        return this.$message.error("获取班级信息失败");
      console.log(res.data);
      this.teacherList = res.data.teacher;
      this.adviserInfo = res.data.headmaster.teacher_info;

      this.getStudentList();
    },
    // 获取学生列表
    async getStudentList() {
      const { data: res } = await this.$http.get(
        `api/classroom/${this.class_arr.class_id}/students`,
        {
          params: {
            limit: this.pageSize,
            page: this.currentPage,
          },
        }
      );
      if (res.statusCode !== 200)
        return this.$message.error("获取学生列表失败");
        console.log(res.data);
        this.studentData = res.data.data;
        this.total = res.data.total;
        this.currentPage = res.data.current_page;
        this.pageSize = parseInt(res.data.per_page);
        this.loading = false;
    },
    // 表格选择栏
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getStudentList();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.getStudentList();
    },
    // 表格无数据显示占位符
    formatterCellval(row, column, cellValue, index) {
      console.log(cellValue);
      if (!cellValue) {
        return "— —";
      } else {
        return cellValue;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card,
.el-input {
  margin-bottom: 1rem;
}
.header_text {
  text-align: center;
  color: #6b3e9e !important;
  font-size: x-large;
  font-weight: 600;
}
.adviser_card {
  text-align: center;
  padding: 20px;
  background: linear-gradient(to left, #9853af, #623aa2);
  img {
    width: 40%;
    border-radius: 100%;
  }
  .adviser_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      color: #fff;
    }
    .info_text {
      color: #fff;
      font-size: 1rem;
      span {
        color: #fff;
        font-size: 0.75rem;
        opacity: 0.5;
      }
    }
  }
  i {
    color: #636262;
  }
}
.teacher_card {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  .teacher_info {
    display: flex;
    justify-content: space-between;
    .info_text {
      display: flex;
      flex-direction: column;
      padding-left: 1rem;
      span:nth-child(1) {
        color: #636262;
        font-size: 1rem;
      }
      span:nth-child(2) {
        color: #afacac;
        font-size: 0.75rem;
      }
    }
  }
}
@media (max-width: 768px) {
  .el-col-6,
  .el-col-18 {
    width: 100%;
  }
  .adviser_card {
    display: flex;
    justify-content: space-around;
    img {
      width: 22%;
    }
  }
}
</style>