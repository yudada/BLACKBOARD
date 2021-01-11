<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="data"
      style="width: 100%"
      stripe
      border
    >
      <el-table-column prop="queTitle" label="题目" />
      <el-table-column label="题纲" width="150px" >
        <template slot-scope="scope">
          <span v-if="scope.row.queSubjectType === 1">练习题</span>
          <span v-if="scope.row.queSubjectType === 2">自检题</span>
          <span v-if="scope.row.queSubjectType === 3">历年考题</span>
        </template>
      </el-table-column>
      <el-table-column prop="queType" label="题型" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.queType === 1">判断</span>
          <span v-if="scope.row.queType === 2">单选</span>
          <span v-if="scope.row.queType === 3">多选</span>
          <span v-if="scope.row.queType === 4">填空</span>
          <span v-if="scope.row.queType === 5">主观</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="exeContentId" label="知识点" /> -->
    </el-table>
    <!-- <div>
      <div v-for="item in data" :key="item.id">
        <span>{{item.queTitle}}</span>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {}
  },
  created() {
    console.log(this.data)
  },
}
</script>

<style lang="scss" scoped>
</style>