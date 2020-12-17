<template>
  <div>
    <el-card>
      <div slot="header">
        <span>课件详情</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="goBack"
          >返回</el-button
        >
      </div>
      <el-form :data="courseData">
        <el-form-item label="课件名称" prop="title">
          <span>{{ courseData.title }}</span>
        </el-form-item>
        <el-form-item label="课件内容"></el-form-item>
        <!-- 富文本编辑器组件 -->
        <p v-html="courseData.content"></p>
        <el-form-item label="状态">
          <span v-if="courseData.is_share === 1">共享</span>
          <span v-if="courseData.is_share === 2">私有</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { courseWareDetail } from '@/api/classRoom.js'
export default {
  data() {
    return {
      courseData: [],
    }
  },
  computed: {
    id: function () {
      return this.$route.query.id
    },
  },
  created() {
    this.getCourseWareDetail()
  },
  methods: {
    getCourseWareDetail() {
      courseWareDetail(this.id).then((res) => {
        const { data } = res.data
        this.courseData = data
        console.log(this.courseData)
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="scss">
.ql-editor {
  height: 200px !important;
}
</style>