<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" type="card" :stretch="true">
        <el-tab-pane label="模型资源" name="first">
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
                style="width: 20%"
              >
                <div class="img_model" @click="modelDialogVisible(item)">
                  <img :src="item.modCoverimg" alt="模型图" />
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
        <el-tab-pane label="精选题库" name="second">
          <exercise :hidenBtn="hidenBtn" />
        </el-tab-pane>
        <el-tab-pane label="实验列表" name="third">
          <experiment :hidenBtn="hidenBtn" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import experiment from '@/components/resourceList/experiment'
import exercise from '@/components/resourceList/exercise'
export default {
  name: 'bookResource',
  components: {
    experiment,
    exercise,
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
      activeName: 'first',
      hidenBtn: true,
      modName: '',
    }
  },
  created() {
    this.getModels()
  },
  methods: {
    // 模型
    async getModels() {
      const { data: res } = await this.$http.post(`api/models/lists`, {
        limit: this.pageSize,
        page: this.currentPage,
        modName: this.modName,
      })
      if (res.statusCode !== 200) return this.$message.error(res.msg)
      this.modelsList = res.data.data

      this.total = res.data.total
      this.pageSize = res.data.per_page
      this.currentPage = res.data.current_page
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
    padding: 0.5rem;
    border: 1px solid rgba(167, 180, 201, 0.2);
    img {
      width: 100%;
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
</style>