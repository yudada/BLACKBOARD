<template>
  <div>
    <div class="resources-show-mode" :class="{ 'resources-play': isPlayAudio }">
      <audio
        v-if="isPlayAudio"
        style="height: 2rem; outline: none"
        :src="previewAudio"
        controls
        autoplay
      />
      <div>
        <i
          @click="isList = false"
          class="el-icon-s-grid"
          :class="{ 'is-list': !isList }"
          v-show="activeName !== 'audio'"
        />
        <i
          @click="isList = true"
          class="el-icon-tickets"
          :class="{ 'is-list': isList }"
          v-show="activeName !== 'model'"
        />
      </div>
    </div>
    <!-- 列表显示 -->
    <template v-if="isList">
      <el-table
        @row-click="rowClick"
        :data="tableData"
        stripe
        v-loading="loading"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50px"
          align="center"
        />
        <el-table-column prop="name" label="名称" min-width="20%" />
        <el-table-column
          prop="url"
          label="链接"
          min-width="20%"
          :formatter="formatterValue"
        />
        <el-table-column
          prop="label"
          label="标签"
          min-width="10%"
          :formatter="formatterValue"
        />
        <el-table-column
          prop="classify"
          label="分类"
          min-width="10%"
          :formatter="formatterValue"
          v-show="activeName === 'audio'"
        />
        <el-table-column
          prop="description"
          label="描述"
          min-width="10%"
          :formatter="formatterValue"
        />
        <el-table-column label="操作" min-width="10%">
          <template slot-scope="scope">
            <div style="display: flex; align-items: center">
              <el-button
                style="font-size: x-large; padding: 0"
                v-show="activeName === 'audio'"
                type="text"
                @click="handlePlay(scope.row.id)"
              >
                <i
                  :class="
                    scope.row.isPlayAudio
                      ? 'el-icon-video-pause'
                      : 'el-icon-video-play'
                  "
                  :title="scope.row.isPlayAudio ? '停止' : '播放'"
                />
              </el-button>
              <el-button type="text" @click="editById(scope.row.id)">
                编辑
              </el-button>
              <el-button
                type="text"
                @click="removeById(scope.row.id)"
                class="delete_btn"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="query.total > query.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query.total"
      />
    </template>
    <!-- 缩列图显示 -->
    <template v-else>
      <Thumbnail-list :tableData="tableData" :activeName="activeName" />
    </template>
  </div>
</template>

<script>
import _ from 'lodash'
import { resourceOfDelete } from '@/api/classRoom'
import ThumbnailList from './personalResources/thumbnailList.vue'
export default {
  components: { ThumbnailList },
  props: ['data', 'loading', 'query', 'activeName'],
  data() {
    return {
      isList: false,
      isPlayAudio: false,
      previewAudio: '',
      tableData: [],
    }
  },
  watch: {
    data: function (n, o) {
      this.initData()
    },
    activeName: function (n, o) {
      if (n !== 'audio') this.isPlayAudio = false
      this.previewAudio = ''
      if (n === 'audio') return (this.isList = true)
      this.isList = false
    },
  },
  methods: {
    initData() {
      this.tableData = _.cloneDeep(this.data)
      if (this.activeName !== 'audio') return
      this.tableData.map((v) => {
        v.isPlayAudio = false
      })
    },
    // 分页
    handleSizeChange(val) {
      this.$emit('changePageSie', val)
    },
    handleCurrentChange(val) {
      this.$emit('changeCurrentChange', val)
    },
    // 表格数据处理
    formatterValue(row, column, cellValue, index) {
      if (!Boolean(cellValue)) {
        return '— —'
      } else {
        return cellValue
      }
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该资源, 是否继续?',
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
      resourceOfDelete(id).then((res) => {
        this.$message.success(res.msg)
        this.$emit('refreshData')
      })
    },
    editById(id) {
      this.$emit('editById', id)
    },
    handlePlay(id) {
      const tableData = _.cloneDeep(this.tableData)
      tableData.map((v, i) => {
        if (v.id === id) {
          v.isPlayAudio = !v.isPlayAudio
          this.isPlayAudio = v.isPlayAudio
          this.previewAudio = v.materialPath
        }
      })
      this.tableData = tableData
    },
    rowClick(row, column, event) {
      // console.log(row, column, event)
    },
  },
}
</script>

<style lang="scss" scoped>
.resources-show-mode {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 2rem;
  .is-list {
    color: #ad5df3;
  }
  i {
    margin: 0 0.5rem;
    font-size: 1.25rem;
    cursor: pointer;
  }
}
.resources-play {
  justify-content: space-between;
}
::v-deep .el-table {
  width: 100%;
  color: #626362;
}
</style>