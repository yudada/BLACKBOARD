<template>
  <div>
    <el-card>
      <div slot="header">
        <span>学生座位</span>
        <!-- <el-button style="float: right" @click="shuffle">shuffle</el-button> -->
      </div>
      <el-row>
        <el-col class="student_box" v-if="studentList[0]">
          <!-- 学生 -->
          <div
            v-for="(student, index) in studentList"
            :key="index"
            class="student_card"
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
                  @change="toggleSelection(studentList)"
                />
              </div>
            </div>
          </div>
        </el-col>
        <el-col v-else class="nostudent">
          <div class="nostudent-card">
            <span @click="goAddStudent">暂无学生 去添加？</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import { studentScreen } from '@/api/classRoom'
export default {
  data() {
    return {
      defaultPic: 'this.src="' + require('@/assets/def_avater.jpg') + '"',
      params: {
        screenStatus: 0,
        sid_arr: [],
      },
    }
  },
  computed: {
    ...mapState(['classInfo', 'studentList', 'checkedBox']),
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
    toggleSelection(studentList) {
      const markList = []
      studentList.map((item) => {
        if (item.isChecked === true) {
          markList.push(item.sid)
        }
      })
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
    // 退出教室，添加学生
    async goAddStudent() {
      const confirmResult = await this.$confirm(
        '即将退出教室，前往添加学生?',
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

      this.$router.push('/editprofile')
      this.$store.commit('setFooter', true)
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
      if (flag === null) {
        this.$store.commit('setCollapse', false)
      } else {
        this.$store.commit('setCollapse', true)
      }
    },
    shuffle: function (subGroupLength) {
      // this.setStudentList(_.shuffle(this.studentList))
      let groupArr = this.group(this.studentList, 5);
      console.log(groupArr)
    },
    group(array, subGroupLength) {
    let index = 0;
    let newArray = [];
    console.log(array.length);
    while(index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
}
  },
}
</script>

<style lang="scss" scoped>
.student_box {
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
}
.nostudent {
  .nostudent-card {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: xx-large;
    span {
      color: #b1afaf;
      cursor: pointer;
    }
  }
}
.flip-list-item-move {
  transition: transform 1s;
}
</style>