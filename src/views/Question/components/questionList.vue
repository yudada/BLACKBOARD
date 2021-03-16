<template>
  <el-row v-if="type">
    <el-col :span="24">
      <el-card>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input placeholder="题目搜索" v-model="queTitle">
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getQueList"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="queType"
              placeholder="题型筛选"
              @change="getQueList()"
              clearable
            >
              <el-option
                v-for="item in queTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="quePracticeSubject"
              placeholder="练习对象筛选"
              @change="getQueList()"
              clearable
            >
              <el-option
                v-for="(item, index) in quePracticeSubjectList"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-table
          :data="questionList"
          style="width: 100%"
          v-loading="loading"
          stripe
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="50px"
            align="center"
          />
          <el-table-column v-if="type === 3" prop="queYear" label="年份" />
          <el-table-column prop="queTitle" label="题目" min-width="30%" />
          <el-table-column
            prop="queType"
            label="题型"
            :formatter="formatterValue"
            min-width="10%"
          />
          <el-table-column
            prop="quePracticeSubject"
            label="练题对象"
            min-width="15%"
            :formatter="formatterValueSubject"
          />
          <el-table-column prop="status" label="状态" min-width="10%">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1">显示</span>
              <span v-if="scope.row.status === 0">暂存</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="20%">
            <template slot-scope="scope">
              <div class="deit_box">
                <el-button type="text" @click="openDetail(scope.row.id)"
                  >查看</el-button
                >
                <el-button
                  type="text"
                  @click="editById(scope.row.id)"
                  class="edit_btn"
                  >编辑</el-button
                >
                <el-button
                  style="
                    color: #ad5df3;
                    padding: 0;
                    border-radius: 50%;
                    width: 2rem;
                    height: 2rem;
                    font-size: 1.25rem;
                    border: none;
                    background: rgba(0, 0, 0, 0);
                  "
                  :title="scope.row.is_collect === 1
                  ? '取消收藏'
                  : '收藏'"
                  @click="setIsCollect(scope.row)"
                  :icon="
                    scope.row.is_collect === 1
                      ? 'el-icon-star-on'
                      : 'el-icon-star-off'
                  "
                />
                <div v-show="scope.row.status === 0">
                  <el-button
                    type="text"
                    @click="removeById(scope.row.id)"
                    class="delete_btn"
                    >删除</el-button
                  >
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { practiceSubject } from '@/api/components'
import { libraryLists, libraryDelete, collectquestions } from '@/api/Question'
export default {
  name: 'questionList',
  props: ['type'],
  data() {
    return {
      questionList: [],
      total: 0,
      currentPage: 1,
      pageSize: 20,
      pageData: [],
      loading: true,
      queTitle: '',
      queType: '',
      queYear: '',
      queTypeList: [
        { value: 1, label: '判断' },
        { value: 2, label: '单选' },
        { value: 3, label: '多选' },
        { value: 4, label: '填空' },
        { value: 5, label: '主观' },
      ],
      quePracticeSubject: '',
      quePracticeSubjectList: [],
    }
  },
  created() {
    this.getQuePracticeSubjec()
    this.getQueList()
  },
  methods: {
    async getQuePracticeSubjec() {
      practiceSubject().then((res) => {
        const { periodArr } = res.data
        this.quePracticeSubjectList = Object.values(periodArr)
      })
    },
    // 获取题库列表
    async getQueList() {
      this.loading = true
      libraryLists({
        limit: this.pageSize,
        page: this.currentPage,
        type: this.type,
        queTitle: this.queTitle,
        queType: this.queType,
        quePracticeSubject: this.quePracticeSubject,
      }).then((res) => {
        const { current_page, data, per_page, total } = res.data
        this.questionList = data
        this.total = total
        this.currentPage = current_page
        this.pageSize = parseFloat(per_page)

        this.loading = false
      })
    },
    setIsCollect(v) {
      collectquestions({
        type: v.is_collect === 1 ? 2 : 1,
        library_id: v.id,
      }).then((res) => {
        this.questionList.map(m=>{
          if(m.id === v.id) {
            v.is_collect === 1 ? m.is_collect = 0 : m.is_collect = 1
          }
        })
        this.$message.success(res.msg)
      })
    },
    openDetail(id) {
      this.$router.push({ path: '/detail', query: { id: id } })
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该题目, 是否继续?',
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
      libraryDelete(id).then((res) => {
        this.$message.success('删除成功！')
        this.getQueList()
      })
    },
    editById(id) {
      this.$router.push({ path: '/establish', query: { id: id } })
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.getQueList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getQueList()
    },
    formatterValue(row, column, cellValue, index) {
      let result = this.queTypeList.map((item) => {
        if (item.value === cellValue) {
          return item.label
        }
      })
      return result
    },
    formatterValueSubject(row, column, cellValue, index) {
      if (!Boolean(cellValue)) {
        return '— —'
      } else {
        return cellValue
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.deit_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.edit_btn {
  padding-left: 10px;
}
</style>
