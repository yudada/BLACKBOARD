<template>
  <div class="account_main">
    <Breadcrumb :navData="navData" />

    <div class="account_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span></span>
              <!-- <el-input placeholder="请选择日期" suffix-icon="el-icon-search" v-model="query" clearable width="180"></el-input> -->
            </div>
            <el-table :data="roleTable" stripe border>
              <el-table-column type="index" label="序号" width="50px" align="center" />
              <el-table-column prop="userName" label="账号" width="100px" />
              <el-table-column prop="realName" label="姓名" width="100px" />
              <el-table-column prop="content" label="操作内容"/>
              <el-table-column prop="ip" label="IP地址" width="150px" />
              <el-table-column prop="created_at" label="操作时间" width="180px" />
            </el-table>
            <el-pagination
              :hide-on-single-page="false"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 40, 100, 9999]"
              :page-size="20"
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
import { operationLog } from '@/api/apps'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        title: '系统设置',
        childTitle: '操作日志',
      },
      roleTable: [],
      query: '',
      // 分页
      currentPage: 1,
      pageSize: 20,
      total: 0,
    }
  },
  created() {
    this.getOperationLog()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getOperationLog()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getOperationLog()
    },
    getOperationLog() {
      const params = {
        limit: this.pageSize
      }
      operationLog(params).then((res) => {
        console.log(res)
        const { current_page, data=[], per_page, total } = res.data;
        this.total = total;
        this.currentPage = current_page;
        this.roleTable = data;
        this.pageSize = parseFloat(per_page);
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.clearfix {
  width: 100%;
  .el-input {
    width: 20%;
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

@media (max-width: 768px) {
}

@media (max-width: 375px) {
}
</style>
