<template>
  <div class="addClassroom_main">
    <Breadcrumb :navData="navData" />

    <div class="addClassroom_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <el-form
              ref="roleFormRef"
              :model="roleForm"
              :rules="roleFormRules"
              label-position="top"
            >
              <el-form-item label="角色名称" prop="roleName">
                <el-input
                  placeholder="请输入角色名称"
                  v-model="roleForm.roleName"
                  class="set_w"
                ></el-input>
              </el-form-item>
              <el-form-item label="选择权限" prop="module_ids	">
                <el-checkbox
                  :indeterminate="allIndeterminate"
                  v-model="checked"
                  @change="checkedAll"
                  >全选</el-checkbox
                >
                <el-tree
                  :data="rightslist"
                  :props="props"
                  ref="treeRef"
                  node-key="id"
                  show-checkbox
                  :default-expand-all="true"
                  :default-checked-keys="defKeys"
                  @check="checkNode"
                >
                </el-tree>
              </el-form-item>
              <el-form-item>
                <el-button @click="onSubmit" class="cn_btn"
                  >{{btnText}}</el-button
                >
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { rightsList, addRole, roleInfo, editRole } from '@/api/Apps/role.js'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        childTitle: '添加角色',
        goTo: '返回列表',
      },
      roleForm: {
        roleName: '',
        module_ids: [],
      },
      roleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
      },
      props: {
        label: 'moduleName',
        children: 'child',
      },
      rightslist: [],
      allNode: [],
      checked: false,
      allIndeterminate: false,
      defKeys: []
    }
  },
  created() {
    this.getRightsList()
    if(this.$route.query.id) {
      this.navData.childTitle = '编辑角色'
      this.getRolrInfo()
    }
  },
  computed: {
    roleId: function () {
      return this.$route.query.id;
    },
    btnText: function () {
      return this.$route.query.id ? '保存编辑' : '立即添加'
    },
  },
  methods: {
    getRolrInfo() {
      roleInfo(this.roleId).then(res => {
        const { name,module_id=[] } = res.data;
        this.roleForm.roleName = name;
        this.defKeys = module_id;
      })
    },
    // 获取系统模块列表
    getRightsList() {
      rightsList().then((res) => {
        this.rightslist = res.data

        // 获取所有节点
        const allNode = []
        this.rightslist.map((item) => {
          allNode.push(item.id)
        })
        for (let item of this.rightslist) {
          item.child.map((chileItem) => {
            allNode.push(chileItem.id)
          })
        }
        this.allNode = allNode
      })
    },
    checkedAll() {
      if (this.checked) {
        //全选
        this.$refs.treeRef.setCheckedNodes(this.rightslist)
      } else {
        //取消选中
        this.$refs.treeRef.setCheckedKeys([])
      }
    },
    // 添加角色
    onSubmit() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ]
      this.roleForm.module_ids = keys
      this.$refs.roleFormRef.validate(async (valid) => {
        if (!valid) return
        if(!this.roleId) {
          addRole(this.roleForm).then((res) => {
          this.$message.success(res.msg)
          this.$refs.treeRef.setCheckedKeys([])
          this.$refs.roleFormRef.resetFields()
        })
        } else {
          editRole(this.roleId, this.roleForm).then((res) => {
          this.$message.success(res.msg)
        })
        }
        
      })
    },
    checkNode(data, keysData) {
      if (this.allNode.length !== keysData.checkedKeys.length) {
        this.checked = false
      } else {
        this.checked = true
      }
    },
  },
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

<style lang="scss">
  .el-tree-node.is-expanded>.el-tree-node__children {
    display: flex;
    flex-wrap: wrap;
  }
</style>
