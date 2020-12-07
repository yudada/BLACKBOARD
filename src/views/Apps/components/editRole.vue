<template>
  <div class="editRole_main">
    <div class="main_header">
      <h4>编辑角色</h4>
      <el-button type="text" @click="goBack" class="back_btn">返回</el-button>
    </div>

    <div class="editRole_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <el-form ref="roleFormRef" :model="roleForm" :rules="roleFormRules" label-position="top">
              <el-form-item label="角色名称" prop="roleName">
                <el-input placeholder="请输入角色名称" v-model="roleForm.roleName" class="set_w"></el-input>
              </el-form-item>
              <el-form-item label="选择权限" prop="module_ids	">
                <el-checkbox v-model="checked" @change="checkedAll">全选</el-checkbox>
                <el-tree
                  :data="rightslist"
                  :props="props"
                  ref="treeRef"
                  :default-checked-keys="defKeys"
                  node-key="id"
                  show-checkbox>
                </el-tree>
              </el-form-item>
              <el-form-item>
                <div>
                  <el-button @click="onSubmit" class="cn_btn">立即保存</el-button>
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
import { rightsList, roleInfo, editRole } from '@/api/Apps/role.js'
export default {
  data() {
    return {
      roleForm: {
        roleName: '',
        module_ids: []
      },
      roleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      props: {
        label: 'moduleName',
        children: 'child'
      },
      rightslist: [],
      checked: false,
      defKeys: []
    }
  },
  created() {
    this.getRolrInfo();
    this.getRightsList();
  },
  methods: {
    // 返回按钮
    goBack() {
      this.$router.push("/role");
    },
    getRolrInfo() {
      roleInfo(this.roleId).then(res => {
        console.log(res.data.data);
        const { name,module_id=[] } = res.data.data;
        this.roleForm.roleName = name;
        this.defKeys = module_id;
      })
    },
    // 获取系统模块列表
    getRightsList() {
      rightsList().then(res => {
        this.rightslist = res.data.data;
      })
    },
    checkedAll() {
      if (this.checked) {
            //全选
            this.$refs.treeRef.setCheckedNodes(this.rightslist);
        }else{
            //取消选中
            this.$refs.treeRef.setCheckedKeys([]);
        }
    },
    onSubmit() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      this.roleForm.module_ids = keys;
      this.$refs.roleFormRef.validate(async valid => {
        if(!valid) return
        console.log(this.roleForm);

        editRole(this.roleId,this.roleForm).then(res => {
          console.log(res);
        })
      })
    }
  },
  computed: {
    roleId: function () {
      return this.$route.query.id;
    },
  }
}
</script>

<style lang="scss" scoped>
.back_btn {
  color: #fff;
  font-size: 18px;
}
.back_btn:hover {
  color: #fff;
}
</style>
