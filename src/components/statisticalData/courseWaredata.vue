<template>
  <div>
    <el-col :span="24">
      <el-card shadow="always">
        <div slot="header">
          <div>教师课件</div>
        </div>
        <el-table :data="teacherTableData" stripe border style="width: 100%">
          <el-table-column prop="id" label="编号" width="80"> </el-table-column>
          <el-table-column prop="title" label="课件名称"> </el-table-column>
          <el-table-column prop="teaName" label="分享老师"> </el-table-column>
          <el-table-column prop="influence" label="教学影响">
            <template slot-scope="scope">
              <el-progress
                :percentage="scope.row.influence"
                :color="customColors"
              />
            </template>
          </el-table-column>
          <el-table-column prop="use_people" label="使用人数">
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button class="edit_btn" @click="toCourse(scope.row)">
                <i class="iconfont icon-bianji" />
                体验
              </el-button>
              <el-button class="share_btn">
                <i class="el-icon-share" />
                分享
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'CourseWaredata',
  props: ['teacherTableData'],
  data() {
    return {
      customColors: [
        { color: '#909399', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#5cb87a', percentage: 100 },
      ],
    }
  },
  methods: {
    toCourse(data) {
      this.$router.push({ path: '/course-detail', query: {id:data.id}})
    }
  },
}
</script>

<style lang="scss" scoped>
.edit_btn {
  color: #fff;
  background: linear-gradient(to bottom right, #9853af, #623aa2);
}
.edit_btn:hover,
.edit_btn:focus {
  opacity: 0.7;
}
.share_btn {
  color: #fff;
  background: linear-gradient(to bottom right, #62fb62, #21a544);
}
.share_btn:hover,
.share_btn:focus {
  opacity: 0.7;
}

@media (max-width: 1435px) {
  .share_btn {
    margin: 0 !important;
  }
}
</style>