<template>
  <div class="account_main">
    <Breadcrumb :navData="navData" />

    <div class="account_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>账号列表</span>
              <!-- <el-input placeholder="请选择日期" suffix-icon="el-icon-search" v-model="query" clearable width="180"></el-input> -->
            </div>
            <el-table :data="roleTable" stripe border>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="department" label="部门-职位"></el-table-column>
              <el-table-column prop="tel" label="联系电话"></el-table-column>
              <el-table-column prop="grade" label="	当前负责年段"></el-table-column>
              <el-table-column prop="subject" label="教学学科"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column label="操作">
                <template>
                  <el-button type="text">编辑</el-button>
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
        title: '系统设置',
        childTitle: '操作日志'
      },
      roleTable: [],
      query: ''
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      const roleTable = [];

      for (let i = 0; i<10; i++) {
        const roleObj= {
          name: `林冬梅${i}`,
          department: `教师处--老师${i}`,
          tel: `13899999999`,
          grade: `一年3班班主任`,
          subject: `语文`,
          status: `正常`
        };
        roleTable.push(roleObj);
      }
      this.roleTable = roleTable;
    }
  },
}
</script>

<style lang="scss" scoped>

.clearfix{
  width: 100%;
  .el-input {
    width: 20%;
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

@media (max-width: 768px) {

}

@media (max-width: 375px) {

}
</style>
