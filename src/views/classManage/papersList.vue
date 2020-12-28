<template>
  <div class="papersList_main">
    <Breadcrumb :navData="navData" />
    <div class="papersList_concent">
      <el-card shadow="always">
        <el-table :data="papersList" style="width: 100%" v-loading="loading">
          <el-table-column prop="exaTitle" label="试卷标题"> </el-table-column>
          <el-table-column
            prop="bookName"
            label="考试科目"
            :formatter="formatterCellval"
          >
          </el-table-column>
          <el-table-column
            prop="exaJifenfangshi"
            label="取分规则"
            :formatter="formatterCellval"
          >
          </el-table-column>
          <el-table-column
            prop="exaDatitime"
            label="答题时间(分钟)"
            :formatter="formatterCellval"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="试卷状态"
            :formatter="formatterCellval"
          >
          </el-table-column>
          <el-table-column label="编辑信息" prop="monthRemarks">
            <template slot-scope="scope">
              <el-button type="text" @click="editPapersPage(scope.row.id)"
                >编辑</el-button
              >
              <el-button
                class="delete_btn"
                type="text"
                @click="deletePapers(scope.row.id)"
                >删除</el-button
              >
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
      </el-card>
    </div>
  </div>
</template>

<script>
import { papersList, parperDelete } from '@/api/classManage'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        childTitle: '试卷列表',
        goTo: '发布试卷',
        path: '/papers-add'
      },
      papersList: [],
      queryInfo: {
        stuName: '',
        limit: 20,
      },
      currentPage: 1,
      pageSize: 20,
      total: 0,
      loading: true,
    }
  },
  created() {
    this.getpapersList()
  },
  methods: {
    // 表格无数据显示占位符
    formatterCellval(row, column, cellValue, index) {
      if (!Boolean(cellValue)) {
        return '— —'
      } else {
        return cellValue
      }
    },
    // 查看页
    detailPapersPage(id) {
      this.$router.push({ path: '/home/parpers-detial', query: { id: id } })
    },
    // 编辑页
    editPapersPage(id) {
      this.$router.push({ path: '/papers-add', query: {id: id}})
    },
    // 删除试卷
    async deletePapers(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该作业, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)

      if (confirmResult !== 'confirm') {
        return 
      }
      parperDelete(id).then((res) => {
        console.log(res)
        if(res.statusCode !== 200) return this.$message.error(res.msg)
        this.$message.success("删除成功！")
        this.getpapersList()
      })
    },
    // 分页
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getpapersList()
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getpapersList()
    },
    // 获取试卷列表
    getpapersList() {
      this.loading = true
      papersList(this.pageSize).then((res) => {
        const { data } = res
        const { current_page, total, per_page } = res.data
        this.currentPage = current_page
        this.pageSize = parseFloat(per_page)
        this.total = total
        this.papersList = data.data
        this.loading = false
        console.log(data)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.addPapers {
  color: #fff;
  font-size: 18px;
}
.addPapers:hover {
  color: #fff;
}
</style>