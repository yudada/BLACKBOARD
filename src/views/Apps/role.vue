<template>
  <div class="role_main">
    <div class="main_header">
      <h4>角色管理</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">系统设置</a></el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="role_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>角色列表</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="addRole">添加新角色</el-button>
            </div>
            <el-table :data="roleTable" stripe border v-loading="loading">
              <el-table-column prop="name" label="角色名称" width="160"></el-table-column>
              <el-table-column prop="module_name" label="权限" :show-overflow-tooltip="true" :formatter="formatterCellval"></el-table-column>
              <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                  <el-button type="text" @click="editRole(scope.row.id)">编辑</el-button>
                  <el-button type="text" @click="removeRole(scope.row.id)" class="delete_btn">删除</el-button>
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
import { roleList, deleteRole } from '@/api/Apps/role.js'
export default {
  data() {
    return {
      roleTable: [],
      total: 0,
      currentPage: 1,
      pageSize: 20,
      loading: true
    }
  },
  created() {
    this.formatterCellval()
    this.getRoleList();
  },
  methods: {
    // 添加角色
    addRole() {
      this.$router.push('/role/addRole');
    },
    // 编辑角色
    editRole(id) {
      this.$router.push({path: '/role/editRole', query: {id: id}});
    },
    // 获取角色列表
    async getRoleList() {
      await roleList().then(res => {
        console.log(res);
        const { data } = res.data;
        this.loading = false;
        this.roleTable = data
      })
    },
    // 删除角色
    async removeRole(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
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

      deleteRole(id).then(res => {
        const {data} = res;
        if(data.statusCode !== 200) return this.$message.error(data.msg)
        this.$message.success(data.msg)
        this.getRoleList();
      })
      
    },
    formatterCellval(row, column, cellValue, index) {
      if (!Boolean(cellValue)) {
          return "— —";
      } else {
          return cellValue;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
