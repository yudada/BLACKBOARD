<template>
  <div>
    <el-col :span="24">
      <el-card shadow="always">
        <div slot="header">
          <div>教师课件</div>
        </div>
        <el-table :data="teacherTableData" style="width: 100%">
          <el-table-column prop="id" label="编号" width="80">
          </el-table-column>
          <el-table-column prop="title" label="课件名称"> </el-table-column>
          <el-table-column prop="teaName" label="分享老师"> </el-table-column>
          <el-table-column prop="influence" label="教学影响">
            <template slot-scope="scope">
              <el-progress
                :percentage="scope.row.influence"
                :color="customColors"
              ></el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="use_people" label="使用人数"> </el-table-column>
          <el-table-column>
            <template>
              <el-button class="edit_btn"
                ><i class="el-icon-edit"></i>体验</el-button
              >
              <el-button class="share_btn"
                ><i class="el-icon-share"></i>分享</el-button
              >
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
      percentage: 20,
      customColor: '#409eff',
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
    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#909399'
      } else if (percentage < 70) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
    },
    increase() {
      this.percentage += 10
      if (this.percentage > 100) {
        this.percentage = 100
      }
    },
    decrease() {
      this.percentage -= 10
      if (this.percentage < 0) {
        this.percentage = 0
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.edit_btn,
.edit_btn:hover,
.edit_btn:focus {
  color: #fff;
  background: linear-gradient(to bottom right, #9853af, #623aa2);
}
.share_btn,
.share_btn:hover,
.share_btn:focus {
  color: #fff;
  background: linear-gradient(to bottom right, #62fb62, #21a544);
}

@media (max-width: 768px) {
  .share_btn {
    margin: 0 !important;
  }
}
</style>