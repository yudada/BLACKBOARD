<template>
  <div class="book-res">
    <el-card>
      <el-tabs v-model="activeName" type="card" :stretch="true">
        <el-tab-pane label="模型资源" name="one">
          <div>
            <el-row class="model_search">
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
            <div class="resource_box">
              <div
                v-for="item in modelsList"
                :key="item.id"
                :label="item.id"
                style="width: 10%"
              >
                <div class="img_model" @click="modelDialogVisible(item)">
                  <div class="model-img">
                    <img
                      v-if="item.modCoverimg"
                      :src="item.modCoverimg"
                      alt="模型图"
                    />
                  </div>
                  <span>{{ item.modName }}</span>
                </div>
              </div>
            </div>
            <el-pagination
              :hide-on-single-page="false"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[40, 80, 100, 1000]"
              :page-size="40"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
          <el-dialog
            :title="dialogContent.modName"
            :visible.sync="dialogVisible"
            width="80%"
            :append-to-body="true"
            custom-class="modle_dialog"
          >
            <iframe :src="dialogContent.modLinkAddress" class="content_box" />
          </el-dialog>
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
import { wisdomBookList } from '@/api/wisdomBook'
import { resourceModelsList } from '@/api/classRoom'
export default {
  name: 'bookResource',
  components: {
    Experiment,
    Exercise,
    Read,
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
      bookId: '',
      bookList: [],
    }
  },
  created() {
    this.getModels()
    this.getWisdomBookList()
  },
  methods: {
    // 模型
    async getModels() {
      const params = {
        limit: this.pageSize,
        page: this.currentPage,
        modName: this.modName,
      }
      resourceModelsList(params).then((res) => {
        const { data, total, per_page, current_page } = res.data
        this.modelsList = data
        this.total = total
        this.pageSize = per_page
        this.currentPage = current_page
        console.log(res)
      })
    },
    getWisdomBookList() {
      wisdomBookList().then((res) => {
        const { data } = res
        this.bookList = data
        this.bookId = data[0].id
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getModels()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getModels()
    },
    modelDialogVisible(item) {
      this.dialogVisible = true
      this.dialogContent = item
    },
    getModelsByName() {
      if (this.modName) {
        this.getModels()
      } else {
        return
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.resource_box {
  display: flex;
  flex-wrap: wrap;
  .img_model {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    border: 1px solid rgba(167, 180, 201, 0.2);
    .model-img {
      width: 100%;
      height: 0;
      overflow: hidden;
      padding-bottom: 100%;
      img {
        width: 100%;
        cursor: pointer;
        transition: all 1.5s;
      }
      img:hover {
        transform: scale(1.2);
      }
    }
    span {
      width: 100%;
      overflow: auto;
      text-align: center;
      height: 1.5rem;
    }
  }
}
.el-card {
  cursor: pointer;
  iframe {
    height: 100%;
  }
}
.content_box {
  width: 100%;
  height: 100%;
  border: none;
}
.model_search {
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
</style>

<style lang="scss">
.modle_dialog {
  height: 70%;
  .el-dialog__body {
    height: 100%;
    padding: 0 !important;
    background: rgba(255, 255, 255, 1);
  }
}
.book-res {
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background: linear-gradient(to bottom right, #9853af, #623aa2);
    color: #fff;
  }
}
</style>