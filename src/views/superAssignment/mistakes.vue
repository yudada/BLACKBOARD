<template>
  <div class="mistakes_main">
    <Breadcrumb :navData="navData" />

    <div class="mistakes_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <el-table
              :data="wrongList"
              style="width: 100%"
              stripe
              border
              v-loading="loading"
            >
              <el-table-column
                type="index"
                label="序号"
                width="50px"
                align="center"
              />
              <el-table-column prop="queTitle" label="题目" min-width="45%" />
              <el-table-column prop="bookName" label="科目" min-width="30%" />
              <el-table-column
                prop="queType"
                label="题型"
                :formatter="formatterFilter"
                 min-width="10%"
              />
              <el-table-column prop="wrong_num" label="错题人数"  min-width="15%">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="getWrongNum(scope.row.content_id)"
                    >{{ scope.row.wrong_num }}</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 40, 80, 100]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </el-card>
        </el-col>
      </el-row>

      <!-- 作业内容弹框 -->
      <el-dialog
        title="错题记录"
        :visible.sync="contentDialogVisible"
        :append-to-body="true"
        :close-on-click-modal="true"
        custom-class="content-diolog"
        width="30%"
      >
        <el-table
          :data="wrongStudentList"
          style="width: 100%"
          stripe
          border
          v-loading="loading"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50px"
            align="center"
          />
          <el-table-column prop="stuName" label="姓名" />
          <el-table-column prop="created_at" label="时间" />
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb.vue'
import {
  wrongAnswer,
  wrongStudents,
  deleteExercises,
} from '@/api/superAssignment'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        title: '超级作业',
        childTitle: '错题锦囊',
      },
      query: '',
      currentPage: 1,
      pagesize: 20,
      total: 1,
      wrongList: [],
      loading: true,
      queTypeList: [
        { value: 1, label: '判断' },
        { value: 2, label: '单选' },
        { value: 3, label: '多选' },
        { value: 4, label: '填空' },
        { value: 5, label: '主观' },
      ],
      contentDialogVisible: false,
      wrongStudentList: [],
    }
  },
  created() {
    this.getExercisesList()
  },
  methods: {
    getWrongNum(id) {
      const params = {
        content_id: id,
      }
      wrongStudents(params).then((res) => {
        console.log(res)
        const { data } = res
        this.wrongStudentList = data
        this.contentDialogVisible = true
      })
    },
    async getExercisesList() {
      wrongAnswer().then((res) => {
        this.loading = false
        const { current_page, per_page, total, data } = res.data
        this.wrongList = data
        this.currentPage = current_page
        this.pagesize = per_page
        this.total = total
      })
    },
    formatterFilter(row, column, cellValue, index) {
      let data
      this.queTypeList.forEach((item) => {
        if (item.value === cellValue) return (data = item.label)
      })
      return data
    },
    handleSizeChange(newSize) {
      this.pagesize = newSize
      this.getExercisesList()
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getExercisesList()
    }
  },
}
</script>

<style lang="scss">
.content-diolog {
  height: 70vh;
  .el-dialog__body {
    height: calc(100% - 100px);
    overflow: overlay;
  }
}
</style>
