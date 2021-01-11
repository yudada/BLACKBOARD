<template>
  <div>
    <el-table
      ref="bookDirRef"
      :data="data"
      style="width: 100%"
      row-key="id"
      default-expand-all
      stripe
      border
      :tree-props="{ children: 'child', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="目录" prop="dirName" />
      <el-table-column label="页码" prop="pageNum" width="55" />
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {}
  },
  created() {
    console.log(this.data);
  },
}
</script>

<style lang="scss" scoped>
</style>