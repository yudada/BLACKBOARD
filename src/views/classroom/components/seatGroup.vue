<template>
  <div class="group-arr">
    <div
      v-for="(item, index) in groupArr"
      :key="index"
      v-show="item.length"
      class="group-arr-item"
      :class="{
        'group-arr-item-2': groupNum === 2,
        'group-arr-item-3': groupNum === 3,
      }"
    >
      <draggable
        v-model="groupArr[index]"
        group="site"
        animation="300"
        dragClass="dragClass"
        ghostClass="ghostClass"
        chosenClass="chosenClass"
        @start="onStart"
        @end="onEnd"
      >
        <transition-group class="student_box" name="list-complete">
          <!-- 学生 -->
          <div
            v-for="(student, index) in item"
            :key="index"
            class="student_card"
            :class="{
              grounp: groupNum > 3,
              grounp2: groupNum === 2,
              grounp3: groupNum === 3,
            }"
          >
            <transition-group name="list-complete">
              <div
                class="student_content list-complete-item"
                :key="student.sid"
              >
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
                    <span v-if="student.stuName">
                      {{ student.stuName }}
                    </span>
                    <span v-else>未知</span>
                  </div>
                  <!-- 评分 -->
                  <div class="student_score">
                    <el-tag
                      type="success"
                      size="medium"
                      @click="addScoreMark(student)"
                    >
                      {{ student.addScore }}
                    </el-tag>
                    <el-tag
                      type="danger"
                      size="medium"
                      @click="minusScoreMark(student)"
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
            </transition-group>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import draggable from 'vuedraggable'
import SeatList from '../components/seatList.vue'
import { studentScreen } from '@/api/classRoom'
import _ from 'lodash'
export default {
  props: ['groupArr'],
  components: { SeatList, draggable },
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
    ...mapState([
      'classInfo',
      'studentList',
      'checkedBox',
      'groupNum',
      'groupNumChange',
    ]),
  },
  methods: {
    ...mapMutations([
      'setMarkList',
      'setRewardsDialog',
      'setReload',
      'setStudentList',
      'setGroupNum',
    ]),
    // 单独加分
    addScoreMark(student) {
      const markList = []
      markList.push(student.sid)
      this.setMarkList(markList)
      this.setRewardsDialog(true)
    },
    // 单独减分
    minusScoreMark(student) {
      const markList = []
      markList.push(student.sid)
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
  .grounp2 {
    width: calc(50% - 20px) !important;
  }
  .grounp3 {
    width: calc(33% - 20px) !important;
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
</style>

<style lang="scss">
.group-arr {
  display: flex;
  flex-wrap: wrap;
  .group-arr-item {
    width: calc(50% - 4rem - 2px);
    margin: 2rem;
    margin-top: 0;
    border: 1px solid #f1f0f0;
    border-radius: 10px;
    .group-arr-item-content {
      .el-row {
        // margin: 0;
        .el-col {
          width: calc(100% - 2rem);
          margin: 0 1rem;
        }
      }
    }
  }
  .group-arr-item-2 {
    width: calc(20% - 4rem - 2px);
  }
  .group-arr-item-3 {
    width: calc(33% - 4rem - 2px);
  }
}
</style>