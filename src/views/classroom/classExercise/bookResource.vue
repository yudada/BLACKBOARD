<template>
  <div class="book-res">
    <el-card style="min-height: calc(100vh - 160px)">
      <el-tabs v-model="activeName" type="card" :stretch="true">
        <el-tab-pane label="模型资源" name="one">
          <el-row :gutter="20" class="model_search">
            <el-col :span="4" v-if="options.length">
              <el-select
                v-model="modType"
                @change="getModels"
                placeholder="请选择"
              >
                <el-option label="全部" :value="0" />
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-input placeholder="模型搜索" v-model="modName">
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="getModelsByName"
                />
              </el-input>
            </el-col>
          </el-row>
          <Model-list
            :currentPage="currentPage"
            :pageSize="pageSize"
            :total="total"
            :modelsList="modelsList"
            @changePageSie="changePageSize"
            @changeCurrentChange="changePageCurrentChange"
          />
        </el-tab-pane>
        <el-tab-pane label="精选题库" name="two">
          <Exercise :hidenBtn="hidenBtn" />
        </el-tab-pane>
        <el-tab-pane label="实验列表" name="three">
          <Experiment :hidenBtn="hidenBtn" />
        </el-tab-pane>
        <el-tab-pane label="课本" name="four">
          <el-select clearable v-model="bookId" placeholder="请选择课本">
            <el-option
              v-for="item in bookList"
              :key="item.id"
              :label="item.bookName"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <Read v-if="bookId" :hidenBtn="hidenBtn" :bookId="bookId" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Experiment from '@/components/resourceList/experiment'
import Exercise from '@/components/resourceList/exercise'
import Read from '@/components/resourceList/read.vue'
import { wisdomBookList, categoryListBook } from '@/api/wisdomBook'
import { resourceModelsList } from '@/api/classRoom'
import ModelList from '@/components/classRoom/classExercise/modelList.vue'
export default {
  name: 'bookResource',
  components: {
    Experiment,
    Exercise,
    Read,
    ModelList,
  },
  data() {
    return {
      dialogVisible: false,
      modelsList: [],
      // 分页
      currentPage: 1,
      pageSize: 40,
      total: 0,
      dialogContent: {},
      activeName: 'one',
      hidenBtn: true,
      modName: '',
      modType: 0,
      bookId: '',
      bookList: [],
      options: [],
    }
  },
  created() {
    this.getModels()
    this.getCategoryListBook()
    this.getWisdomBookList()
  },
  methods: {
    changePageSize(pageSize) {
      this.pageSize = pageSize
      this.getModels()
    },
    changePageCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.getModels()
    },
    getCategoryListBook() {
      categoryListBook().then((res) => {
        const { data } = res
        this.options = data
      })
    },
    // 模型
    async getModels() {
      resourceModelsList({
        limit: this.pageSize,
        page: this.currentPage,
        modName: this.modName,
        category_id: this.modType,
      }).then((res) => {
        const { data, total, per_page, current_page } = res.data
        this.modelsList = data
        this.total = total
        this.pageSize = parseFloat(per_page)
        this.currentPage = current_page
      })
    },
    getWisdomBookList() {
      wisdomBookList().then((res) => {
        const { data } = res
        this.bookList = data
        this.bookId = data[0].id
      })
    },
    getModelsByName() {
      if (this.modName) {
        this.getModels()
      }
    },
  },
}
</script>

<style lang="scss">
.model_search {
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
.book-res {
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background: linear-gradient(to bottom right, #9853af, #623aa2);
    color: #fff;
  }
}
</style>