<template>
  <div class="classroomList_main">
    <Breadcrumb :navData="navData" />
    
    <div class="classroomList_concent">
      <el-card shadow="always">
        <el-table :data="classRoomList" style="width: 100%" v-loading="loading">
          <el-table-column prop="className" label="班级名称">
          </el-table-column>
          <el-table-column prop="classDeclaration" label="班级学习宣言" :formatter="formatterCellval">
          </el-table-column>
          <el-table-column prop="classInviteCode" label="班级邀请码" :formatter="formatterCellval">
          </el-table-column>
          <el-table-column label="编辑信息" prop="monthRemarks" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="editClassRoomPage(scope.row.class_id)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { classList, changeClass, classInfo, commonConfiguration } from '@/api/index.js'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        childTitle: '班级列表',
        goTo: '创建班级',
        path: '/classroomAdd'
      },
      classRoomList:[],
      loading:false,
      classType: {}
    }
  },
  created() {
    this.getClassRoomList();
    this.getClassTypeList();
  },
  methods: {
    editClassRoomPage() {},
    // 表格无数据显示占位符
    formatterCellval(row, column, cellValue, index) {
      if (!Boolean(cellValue)) {
          return "— —";
      } else {
          return cellValue;
      }
    },
    // 班级类型数据处理
    formatterClassType(row, column, cellValue, index) {

    },
    // 编辑页
    editClassRoomPage(class_id) {
      this.$router.push({ path: '/classroomAdd', query: {class_id: class_id}})
    },
    removeById() {},
    // 获取班级列表
    getClassRoomList() {
      classList().then(res => {
        const {data} = res
        this.classRoomList = data.data;
      })
    },
    // 获取班级类型
    getClassTypeList() {
      commonConfiguration().then(res => {
        const {periodArr} = res.data.data;
        this.classType = periodArr;
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .addClassRoom{
    color: #fff;
    font-size: 18px;
  }
  .addClassRoom:hover {
    color: #fff;
  }
</style>