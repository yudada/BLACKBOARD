<template>
  <div>
    <!-- <div class="resources-show-mode">
      <i
        @click="isList = false"
        class="el-icon-s-grid"
        :class="{ 'is-list': !isList }"
      />
      <i
        @click="isList = true"
        class="el-icon-tickets"
        :class="{ 'is-list': isList }"
      />
    </div> -->
    <!-- 列表显示 -->
    <div v-if="isList">
      <el-table :data="data" style="width: 100%" stripe v-loading="loading">
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
        />
        <el-table-column
          prop="description"
          label="描述"
          min-width="10%"
          :formatter="formatterValue"
        />
        <el-table-column label="操作" min-width="10%">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="removeById(scope.row.id)"
              class="delete_btn"
            >
              删除
            </el-button>
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
    </div>
    <!-- 缩列图显示 -->
    <div v-else>
      图片
    </div>
  </div>
</template>

<script>
import { resourceOfDelete } from '@/api/classRoom'
export default {
  props: ['data', 'loading', 'query'],
  data() {
    return {
      isList: true,
    }
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.$emit('changePage', val, this.query.pageSize)
    },
    handleCurrentChange(val) {
      this.$emit('changePage', this.query.pageSize, val)
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
        this.handleClick()
        this.$message.success(res.msg)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.personal-resources {
  .resources-show-mode {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .is-list {
      color: #ad5df3;
    }
    i {
      margin: 0 0.5rem;
      font-size: 1.25rem;
      cursor: pointer;
    }
  }
}
</style>