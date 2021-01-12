<template>
  <div class="role_main">
    <Breadcrumb :navData="navData" />

    <div class="role_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>角色列表</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="addRole">添加新角色</el-button>
            </div>
            <el-table :data="roleTable" stripe border v-loading="loading">
              <el-table-column prop="name" label="角色名称" width="160" />
              <el-table-column prop="module_name" label="权限" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span v-for="(item,index) in scope.row.module_name" :key="item + index">{{item}}   </span>
                  <span v-if="scope.row.module_name.length === 0">—— ——</span>
                </template>
              </el-table-column>
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
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        title: '系统设置',
        childTitle: '角色管理'
      },
      roleTable: [],
      total: 0,
      currentPage: 1,
      pageSize: 20,
      loading: true
    }
  },
  created() {
    this.getRoleList();
  },
  methods: {
    // 添加角色
    addRole() {
      this.$router.push('/role/addRole');
    },
    // 编辑角色
    editRole(id) {
      this.$router.push({path: '/role/addRole', query: {id: id}});
    },
    // 获取角色列表
    async getRoleList() {
      await roleList().then(res => {
        const { data } = res;
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
      this.loading = true;
      deleteRole(id).then(res => {
        this.$message.success(res.msg)
        this.getRoleList();
        this.loading = false;
      })
      
    }
  }
}
</script>
