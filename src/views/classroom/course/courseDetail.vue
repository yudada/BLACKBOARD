<template>
  <div>
    <Breadcrumb :navData="navData" v-if="this.$route.path === '/ware-list/course-detail'" />
    <el-card>
      <div slot="header"  v-if="this.$route.path === '/course-detail'">
        <span>课件详情</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="goBack"
          >返回</el-button
        >
      </div>
      <el-form :data="courseData" label-position="left" label-width="100px">
        <el-form-item label="课件名称" prop="title">
          <span>{{ courseData.title }}</span>
        </el-form-item>
        <el-form-item label="附件" prop="path">
          <a
            v-for="(item, index) in courseData.path"
            :key="item"
            :href="baseUel+item"
            target="_blank"
            style="color: #ad5df3"
          >
            {{ courseData.fileName[index] }} ,
          </a>
        </el-form-item>
        <el-form-item label="课件内容">
          <p v-html="courseData.content"></p>
        </el-form-item>
        <el-form-item label="状态">
          <span v-if="courseData.is_share === 1">共享</span>
          <span v-if="courseData.is_share === 2">私有</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb.vue'
import { courseWareDetail } from '@/api/classRoom.js'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        childTitle: '课件详情',
        goTo: '返回列表'
      },
      courseData: [],
      baseUel: 'https://view.officeapps.live.com/op/view.aspx?src='
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
        const { data } = res
        this.courseData = data
        console.log(this.courseData)
      })
    },
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss">
.ql-editor {
  height: 200px !important;
}
</style>