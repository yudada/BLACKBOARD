<template>
  <div class="account_main">
    <Breadcrumb :navData="navData" />

    <div class="account_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <div slot="header">
              <span>账号列表</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="addTeacher">添加新老师</el-button>
            </div>
            <el-table :data="roleTable" stripe border>
              <el-table-column type="index" label="序号" width="50px" align="center" />
              <el-table-column prop="teaName" label="姓名" />
              <el-table-column prop="teaPosition" label="职位" />
              <el-table-column prop="mobile" label="联系电话" />
              <el-table-column prop="teaSubject" label="教学学科" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="editTeacher(scope.row.tid)">编辑</el-button>
                  <!-- <el-button type="text" @click="removeTeacher(scope.row.tid)" class="delete_btn">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { accountList } from '@/api/Apps/account.js'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        title: '系统设置',
        childTitle: '账号管理'
      },
      roleTable: [],
      query: '',
      total: 0,
      currentPage: 1,
      pageSize: 20,
      loading: true
    }
  },
  created() {
    this.getAccountList();
  },
  methods: {
    // 获取账号列表
    getAccountList() {
      const data = { limit: this.pageSize, page: this.currentPage }
      accountList(data).then(res => {
        const { current_page,data,total, per_page} = res.data;
        this.roleTable = data;
        this.total = total;
        this.currentPage = current_page;
      })
    },
    // 跳转添加老师页面
    addTeacher() {
      this.$router.push('/account/addTeacher')
    },
    // 跳转编辑老师页面
    editTeacher (tid) {
      this.$router.push({path: '/account/addTeacher', query: {id: tid}})
    },
    // 删除
    async removeTeacher(tid) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该账号, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmResult !== "confirm") {
        return 
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAccountList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAccountList();
    }
  }
}
</script>
