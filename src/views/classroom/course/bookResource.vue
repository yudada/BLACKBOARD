<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" type="card" :stretch="true">
        <el-tab-pane label="模型资源" name="first">
          <div>
            <div class="resource_box">
              <div
                v-for="item in modelsList"
                :key="item.id"
                :label="item.id"
                style="width: 18%"
              >
                <div class="img_model" @click="modelDialogVisible(item)">
                  <img :src="item.modImage" alt="模型图" />
                  <span>{{ item.modName }}</span>
                </div>
              </div>
            </div>
            <el-pagination
              :hide-on-single-page="false"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[8, 20, 40, 80]"
              :page-size="8"
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
            <iframe
              :src="dialogContent.modLinkAddress"
              class="content_box"
            ></iframe>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="精选题库" name="second">
          <exercise :hidenBtn="hidenBtn"></exercise>
        </el-tab-pane>
        <el-tab-pane label="实验列表" name="third">
          <experiment :hidenBtn="hidenBtn"></experiment>
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
    exercise
  },
  data() {
    return {
      dialogVisible: false,
      modelsList: [],
      // 分页
      currentPage: 1,
      pageSize: 8,
      total: 0,
      dialogContent: {},
      activeName: 'first',
      hidenBtn: true
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
      })
      if (res.statusCode !== 200) return this.$message.error(res.msg)
      this.modelsList = res.data.data

      this.total = res.data.total
      this.pageSize = res.data.per_page
      this.currentPage = res.data.current_page
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getModelsList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getModelsList()
    },
    modelDialogVisible(item) {
      this.dialogVisible = true
      this.dialogContent = item
    }
  },
}
</script>

<style lang="scss" scoped>
.resource_box {
  display: flex;
  .img_model {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    padding: 0.5rem;
    border: 1px solid rgba(167, 180, 201, 0.2);
    img {
      width: 80%;
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