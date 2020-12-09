<template>
  <div class="classroomList_main">
    <div class="main_header">
      <h4>班级列表</h4>
      <el-button type="text" @click="addClassRoomPage" class="addClassRoom">创建班级</el-button>
    </div>
    <div class="classroomList_concent">
      <el-card shadow="always">
        <el-table :data="classRoomList" style="width: 100%" v-loading="loading">
          <el-table-column prop="className" label="班级名称">
          </el-table-column>
          <el-table-column prop="exercise" label="班级学习宣言" :formatter="formatterCellval">
          </el-table-column>
          <el-table-column prop="reading" label="班级类型" :formatter="formatterCellval">
          </el-table-column>
          <el-table-column prop="comprehensive" label="班级邀请码" :formatter="formatterCellval">
          </el-table-column>
          <el-table-column prop="weekRemarks" label="状态" :formatter="formatterCellval">
          </el-table-column>
          <el-table-column label="编辑信息" prop="monthRemarks" width="120">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="editClassRoomPage"></el-button>
              <el-button type="danger" size="mini" @click="removeById(scope.row.sid)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { classList, changeClass, classInfo} from '@/api/index.js'
export default {
  data() {
    return {
      classRoomList:[],
      loading:false
    }
  },
  created() {
    this.getClassRoomList()
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
    editClassRoomPage() {},
    removeById() {},
    getClassRoomList() {
      classList().then(res => {
        console.log(res);
      })
    },
    addClassRoomPage() {
      this.$router.push('/classroomAdd')
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