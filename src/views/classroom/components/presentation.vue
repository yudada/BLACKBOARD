<template>
  <div>
    <!-- 评分弹框 -->
    <el-dialog
      title="奖励"
      :visible.sync="rewardsDialog"
      top="30vh"
      width="50%"
      :append-to-body="true"
      :close-on-click-modal="false"
      :before-close="handleCloseRewardsDialog"
    >
      <div>
        <div class="tag_dialog">
          <el-tag
            effect="dark"
            type="success"
            v-for="item in tagAddList"
            :key="item.id"
            size="medium"
            @click="handleTagPlusDebounce(item)"
            >{{ item.scoreName }}{{ item.scoreNum }}</el-tag
          >
        </div>
        <div class="tag_dialog">
          <el-tag
            effect="dark"
            type="danger"
            v-for="item in tagMinusList"
            :key="item.id"
            size="medium"
            @click="handleTagMinusDebounce(item)"
            >{{ item.scoreName }}{{ item.scoreNum }}</el-tag
          >
        </div>
        <div class="tag_dialog">
          <el-tag
            effect="dark"
            type="warning"
            v-for="item in tagAllList"
            :key="item.id"
            size="medium"
            @click="handleTagAllDebounce(item)"
          >
            {{ item.scoreName }}{{ item.scoreNum }}
          </el-tag>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import {
  studentName,
  scoreTagList,
  score,
  studentScreen,
  classScreen,
} from '@/api/classRoom.js'
export default {
  data() {
    return {
      scoreData: {
        sid_arr: [],
        config_score_id: '',
        scoreSource: '互动课堂',
      },
    }
  },
  computed: {
    ...mapState([
      'studentList',
      'tagAllList',
      'tagAddList',
      'tagMinusList',
      'markList',
      'rewardsDialog',
      'reload',
    ]),
  },
  methods: {
    ...mapMutations([
      'setMarkList',
      'setRewardsDialog',
      'setReload',
      'setHandUPDialog',
      'setCheckedBox',
    ]),
    // 加分
    handleTagPlusDebounce: _.debounce(function (item) {
      this.handleTagPlus(item)
    }, 300),
    handleTagPlus(item) {
      this.scoreData.sid_arr = this.markList
      this.scoreData.config_score_id = item.id
      if (this.scoreData.sid_arr.length < 1) {
        let allStudent = []
        this.studentList.map((item) => {
          allStudent.push(item.sid)
        })
        this.scoreData.sid_arr = allStudent
      }
      score(this.scoreData).then((res) => {
        if (res.statusCode !== 200) return this.$message.error(res.msg)
        this.$message.success(item.scoreName + ' ' + item.scoreNum)
      })
    },
    // 减分
    handleTagMinusDebounce: _.debounce(function (item) {
      this.handleTagMinus(item)
    }, 300),
    handleTagMinus(item) {
      this.scoreData.sid_arr = this.markList
      this.scoreData.config_score_id = item.id
      if (this.scoreData.sid_arr.length < 1) {
        let allStudent = []
        this.studentList.map((item) => {
          allStudent.push(item.sid)
        })
        this.scoreData.sid_arr = allStudent
      }
      console.log(this.scoreData)
      score(this.scoreData).then((res) => {
        if (res.statusCode !== 200) return this.$message.error(res.msg)
        this.$message.error(item.scoreName + ' ' + item.scoreNum)
      })
    },
    // 全班
    handleTagAllDebounce: _.debounce(function (item) {
      this.handleTagAll(item)
    }, 300),
    handleTagAll(item) {
      let allStudent = []
      this.studentList.map((item) => {
        allStudent.push(item.sid)
      })
      this.scoreData.sid_arr = allStudent
      this.scoreData.config_score_id = item.id
      score(this.scoreData).then((res) => {
        if (item.scoreNum === '+1') {
          this.$message.success(item.scoreName + ' ' + item.scoreNum)
        } else {
          this.$message.error(item.scoreName + ' ' + item.scoreNum)
        }
      })
    },
    // 关闭打分弹框
    handleCloseRewardsDialog() {
      this.setRewardsDialog(false)
      // this.setHandUPDialog(false)
      this.setCheckedBox(false)
      this.setReload()
    },
  },
}
</script>

<style lang="scss" scoped>
.tag_dialog {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  .el-tag {
    cursor: pointer;
    margin: 0.25rem;
  }
}
</style>