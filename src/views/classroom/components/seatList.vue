<template>
      <transition-group class="student_box">
        <!-- 学生 -->
        <div
          v-for="(student, index) in studentList"
          :key="index"
          class="student_card"
          :class="{ grounp: groupNum === 5 }"
        >
          <div class="student_content">
            <div style="position: relative">
              <div class="student_avatar">
                <!-- 头像 -->
                <el-tooltip
                  effect="dark"
                  content="点击头像可更改屏幕状态"
                  placement="top"
                  :open-delay="1000"
                >
                  <div class="avater" @click="switchStudentScreen(student)">
                    <img
                      v-if="student.photo"
                      :src="student.photo"
                      alt=""
                      :onerror="defaultPic"
                    />
                    <img v-else src="@/assets/def_avater.jpg" alt="" />
                    <!-- 控屏状态 -->
                    <div
                      class="status_screen"
                      v-if="student.screenStatus === 1"
                    >
                      <div class="content_screen">
                        <img src="@/assets/images/screenLock.png" alt="" />
                        <p>点击可解锁</p>
                      </div>
                    </div>
                  </div>
                </el-tooltip>
                <span v-if="student.stuName">{{ student.stuName }}</span>
                <span v-else>未知</span>
              </div>
              <!-- 评分 -->
              <div class="student_score">
                <el-tag
                  type="success"
                  size="medium"
                  @click="addScoreMark(student.sid)"
                >
                  {{ student.addScore }}
                </el-tag>
                <el-tag
                  type="danger"
                  size="medium"
                  @click="minusScoreMark(student.sid)"
                >
                  {{ student.minusScore }}
                </el-tag>
              </div>
              <!-- 复选 -->
              <el-checkbox
                v-show="checkedBox"
                class="student_check"
                v-model="student.isChecked"
                @change="toggleSelection(studentList, student)"
              />
            </div>
          </div>
        </div>
      </transition-group>
</template>

<script>
import draggable from 'vuedraggable'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import { studentScreen } from '@/api/classRoom'
export default {
  components: { draggable },
  props: ['studentList', 'groupNum'],
  data() {
    return {
      defaultPic: 'this.src="' + require('@/assets/def_avater.jpg') + '"',
      params: {
        screenStatus: 0,
        sid_arr: [],
        drag: false,
      },
    }
  },
  computed: {
    ...mapState(['classInfo', 'checkedBox']),
  },
  methods: {
    ...mapMutations([
      'setMarkList',
      'setRewardsDialog',
      'setReload',
      'setStudentList',
    ]),
    // 单独加分
    addScoreMark(sid) {
      const markList = []
      markList.push(sid)
      this.setMarkList(markList)
      this.setRewardsDialog(true)
    },
    // 单独减分
    minusScoreMark(sid) {
      const markList = []
      markList.push(sid)
      this.setMarkList(markList)
      this.setRewardsDialog(true)
    },
    // 多选
    toggleSelection(studentList, student) {
      console.log(student)
      const markList = []
      studentList.map((item) => {
        if (item.isChecked === true) {
          markList.push(item.sid)
        }
      })
      console.log(markList)
      this.setMarkList(markList)
    },
    handleCheckAllChange() {
      this.studentList.map((item) => (item.isChecked = true))
    },
    // 学生控屏
    switchStudentScreen(student) {
      this.params.sid_arr = []
      console.log(this.params)
      if (student.screenStatus === 0) {
        this.params.screenStatus = 1
      } else {
        this.params.screenStatus = 0
      }
      this.params.sid_arr.push(student.sid)
      studentScreen(this.params).then((res) => {
        this.$message.success(res.msg)
        this.setReload()
      })
    },
    //开始拖拽事件
    onStart() {
      this.drag = true
    },
    //拖拽结束事件
    onEnd() {
      this.drag = false
    },
  },
}
</script>

<style lang="scss" scoped>
.student_box {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  .student_card {
    width: calc(10% - 20px);
    margin: 10px 0.5rem;
    border: 1px solid #ebeef5;
    .student_content {
      position: relative;
      padding: 0.25rem;
      height: 100%;
      z-index: 1;
      .student_status {
        position: absolute;
        margin: 0;
      }
      .student_avatar {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .avater {
          width: 100%;
          padding-bottom: 100%;
          overflow: hidden;
          height: 0;
          cursor: pointer;
          position: relative;
          img {
            width: 100%;
            // border-radius: 50%;
          }
          .status_screen {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgb(0, 0, 0, 0.5);
            top: 0;
            cursor: pointer;
            .content_screen {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              img {
                width: 35%;
                margin-top: 1em;
                border-radius: 0 !important;
              }
              p {
                color: #fff;
                font-size: 0.5em;
                font-weight: bold;
              }
            }
          }
        }
        span {
          color: #636262;
          font-size: 14px;
          min-height: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .student_score {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-tag {
          cursor: pointer;
          margin: 0;
          border: 0;
          width: 48%;
          text-align: center;
        }
      }
      .student_check {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: rgb(0, 0, 0, 0.1);
      }
    }
  }
  .grounp {
    width: calc(20% - 20px) !important;
  }
}

/*定义要拖拽元素的样式*/
.ghostClass {
  background-color: blue !important;
}
.chosenClass {
  background-color: red !important;
  opacity: 1 !important;
}
.dragClass {
  background-color: blueviolet !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}
.itxst {
  margin: 10px;
}
.title {
  padding: 6px 12px;
}
.col {
  width: 40%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
}
.col + .col {
  margin-left: 10px;
}

.item {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
}
.item:hover {
  background-color: #fdfdfd;
  cursor: move;
}
.item + .item {
  border-top: none;
  margin-top: 6px;
}
</style>