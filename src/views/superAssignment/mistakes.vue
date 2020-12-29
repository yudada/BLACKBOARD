<template>
  <div class="mistakes_main">
    <Breadcrumb :navData="navData" />

    <div class="mistakes_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <el-table :data="wrongList" style="width: 100%;" v-loading="loading">
              <el-table-column type=index>
              </el-table-column>
              <el-table-column prop="queTitle" label="题目" width="350">
              </el-table-column>
              <el-table-column prop="bookName" label="科目">
              </el-table-column>
              <el-table-column prop="queType" label="题型" :formatter="formatterFilter">
              </el-table-column>
              <el-table-column prop="wrong_num" label="错题人数">
              </el-table-column>
              <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="taskPage(scope.row.content_id)">查看</el-button>
                  <el-button type="danger" size="mini" @click="removeById(scope.row.content_id)">删除</el-button>
                </template>
              </el-table-column> -->
            </el-table>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 40, 80, 100]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb.vue'
import { wrongAnswer } from '@/api/superAssignment'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        title: '超级作业',
        childTitle: '错题锦囊'
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
      ]
    }
  },
  created() {
    this.getExercisesList();
  },
  methods: {
    taskPage(id) {
      this.$router.push({path:'/taskDetial',query: {id: id}})
    },
    async getExercisesList() {
      wrongAnswer().then(res => {
        this.loading = false
        const { current_page, per_page, total, data } = res.data;
        this.wrongList = data
        this.currentPage = current_page
        this.pagesize = per_page
        this.total = total
      })
    },
    formatterFilter(row, column, cellValue, index) {
      let data
       this.queTypeList.forEach(item=>{
        if(item.value === cellValue) return data = item.label
      })
      return data
    },
    handleSizeChange(newSize) {
      this.pagesize = newSize;
      this.getExercisesList();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.getExercisesList();
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该作业, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') {
        return 
      }
      const { data: res } = await this.$http.delete(`api/exercises/${id}`)
      if(res.statusCode !== 200) return this.$message.error(res.msg)
      this.getExercisesList();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
