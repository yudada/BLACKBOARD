<template>
  <div>
    <el-dialog
      :title="data.teachName+'答题列表'"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <el-table :data="tableData" class="answer-table" v-loading="loading" border stripe>
        <el-table-column type="index" label="序号" width="50px" align="center" />
        <el-table-column prop="stuName" label="学生姓名" />
        <el-table-column prop="created_at" label="答题时间" />
        <el-table-column prop="answerCount" label="答题数量" align="center" />
        <el-table-column prop="accuracy" label="正确率"  align="center" >
          <template slot-scope="scope">
            <span>{{scope.row.accuracy}}%</span>
          </template>
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
        :total="total"
      />
    </el-dialog>
  </div>
</template>

<script>
import { answerPerson } from '@/api/onlineStudies'
export default {
  props: ['visible', 'data'],
  data() {
    return {
      dialogVisible: false,
      loading: true,
      tableData: [],
      queryInfo: {
        limit: 20,
      },
      total: 0,
      pageSize: 20,
      currentPage: 1
    }
  },
  watch: {
    visible: function (newValue, oldValue) {
      if (newValue) {
        this.getAnswerPerson()
      }
    },
  },
  created() {},
  methods: {
    handleClose() {
      this.dialogVisible = false
      this.$emit('closeDilog', false)
    },
    getAnswerPerson() {
      this.queryInfo.limit = this.pageSize
      answerPerson(this.data.id, this.queryInfo).then((res) => {
        const { current_page, data, per_page, total } = res.data
        this.tableData = data
        this.total = total
        this.currentPage = current_page
        this.pageSize = parseFloat(per_page)
        this.loading = false
        this.dialogVisible = true
        this.$emit('closeLoading', false)
      })
    },
    // 分页
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getAnswerPerson()
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getAnswerPerson()
    },
  },
}
</script>

<style lang="scss" scoped>
.answer-table {
  width: 100%;
  max-height: 60vh;
  overflow: scroll;
}
.el-pagination {
  margin-bottom: 0;
}
</style>