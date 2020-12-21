<template>
  <div>
    <el-card v-if="studentList[0]">
      <div slot="header">
        <span>学生座位</span>
      </div>
      <el-row>
        <el-col class="student_box">
          <div
            v-for="(student, index) in studentList"
            :key="index"
            class="student_card"
          >
            <div class="student_content">
              <div style="position: relative">
                <div class="student_avatar" @click="switchStudentScreen(student)">
                  <div class="avater">
                    <img
                      v-if="student.photo"
                      :src="student.photo"
                      alt=""
                      :onerror="defaultPic"
                    />
                    <img v-else src="@/assets/def_avater.jpg" alt="" />
                  </div>
                  <span v-if="student.stuName">{{ student.stuName }}</span>
                  <span v-else>未知</span>
                  <div class="status_screen" v-if="student.screenStatus === 1">
                    <div class="content_screen">
                      <img src="@/assets/images/screenLock.png" alt="" />
                      <p>点击可解锁</p>
                    </div>
                  </div>
                </div>
                <div class="student_score">
                  <el-tag
                    type="success"
                    size="medium"
                    @click="addScoreMark(student.sid)"
                    >{{ student.addScore }}</el-tag
                  >
                  <el-tag
                    type="danger"
                    size="medium"
                    @click="minusScoreMark(student.sid)"
                    >{{ student.minusScore }}</el-tag
                  >
                </div>
                <el-checkbox
                  v-show="checkedBoxDialog === true"
                  class="student_check"
                  v-model="student.isChecked"
                  @change="toggleSelection(studentList)"
                />
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card v-else class="nostudent">
      <div slot="header">
        <span>学生座位</span>
      </div>
      <div class="nostudent-card">
        <div>
          <span @click="goAddStudent">暂无学生 去添加？</span>
        </div>
      </div>
    </el-card>

    <!-- 打分模块 -->
    <div class="classroom_mark">
      <div class="mark_btn">
        <el-dropdown placement="top" v-show="checkedBoxDialog">
          <el-button>工具</el-button>
          <el-dropdown-menu slot="dropdown" router>
            <!-- <el-dropdown-item
                v-for="(tool, index) in subToolList"
                :key="index"
                @click.native="open(tool)"
                >{{ tool.name }}</el-dropdown-item
              > -->
            <el-dropdown-item @click.native="switchClassScreen"
              >全班控屏</el-dropdown-item
            >
            <el-dropdown-item @click.native="switchMultiplayerScreen"
              >控屏</el-dropdown-item
            >
            <el-dropdown-item @click.native="openRewardsDialog"
              >评分</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-button @click="switchScreen">控屏</el-button> -->
        <!-- <el-button @click="openRewardsDialog">评分</el-button> -->
        <el-button @click="switchCheckedBoxDialog">多选</el-button>
        <el-button @click="handleHandUP">举手</el-button>
      </div>
    </div>
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
            @click="handleTagPlus(item)"
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
            @click="handleTagMinus(item)"
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
            @click="handleTagAll(item)"
            >{{ item.scoreName }}{{ item.scoreNum }}</el-tag
          >
        </div>
      </div>
    </el-dialog>
    <!-- 举手弹框 -->
    <el-dialog
      v-if="studentList[0]"
      title="举手"
      :visible.sync="handUPDialog"
      top="30vh"
      width="40%"
      :append-to-body="true"
      :close-on-click-modal="false"
      closed="closeHandUpDialog"
      custom-class="selectbox_dialog"
    >
      <div class="content_dialog">
        <div class="topbox_dialog">
          <div class="op_content" v-show="changeName === true">
            <el-button
              type="text"
              icon="el-icon-minus"
              @click="numMinus"
            ></el-button>
            <el-input v-model="selectNum"></el-input>
            <el-button
              type="text"
              icon="el-icon-plus"
              @click="numPlus"
            ></el-button>
          </div>
          <div class="name_topbox">
            <div v-if="sclectStuName === true">
              <span>{{ studentList[selectedStudentIndexs[0]].stuName }}</span>
            </div>
            <div v-else class="stuName_box">
              <div v-for="item in sidArr" :key="item.sid">
                <span v-if="sidArr.length > 1">{{ item }},</span>
                <span v-else>{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="btn_content">
          <el-button type="success" @click="startSelect">{{
            btnText
          }}</el-button>
          <el-button type="info" @click="changeSelectNum">切换人数</el-button>
          <el-button
            type="warning"
            @click="openRewardsDialog"
            v-show="!hidenMark"
            >评分</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import {
  studentName,
  scoreTagList,
  score,
  studentScreen,
  classScreen,
} from '@/api/classRoom.js'
import { classInfo } from '@/api/index.js'
export default {
  data() {
    return {
      tagAll: [
        { id: 0, scoreName: '全班扣分 - 1' },
        { id: 1, scoreName: '全班安静 + 1' },
      ],
      studentList: [],
      // 弹框开关
      rewardsDialog: false,
      handUPDialog: false,
      checkedBoxDialog: false,
      // 选择
      checkList: [],
      // 操作标签
      tagAddList: [],
      tagMinusList: [],
      tagAllList: [],
      scoreData: {
        sid_arr: [],
        config_score_id: '',
        scoreSource: '互动课堂',
      },
      // 多选列表
      markList: [],
      //
      selectNum: 1,
      changeName: true,
      studentIndexs: [],
      selectedStudentIndexs: [0],
      intervalId: null,
      hidenMark: true,
      sidArr: [],
      sclectStuName: false,
      defaultPic: 'this.src="' + require('@/assets/def_avater.jpg') + '"',
      studentScreenInfo: {
        sid_arr: [],
        screenStatus: '',
      },
      screenStatusClass: '',
      screenStatusMultiplayer: '',
    }
  },
  computed: {
    ...mapState(['classInfo']),
    btnText() {
      return this.intervalId ? '结束' : `开始`
    },
  },
  created() {
    this.$emit('update:seat', true)
    this.getStudentList()
    this.getTagList()
  },
  methods: {
    // 标签列表
    getTagList() {
      scoreTagList().then((res) => {
        const { scoreArr } = res.data
        scoreArr.map((item) => {
          if (item.type === 1 && item.scoreGlobal === 0) {
            this.tagAddList.push(item)
          } else if (item.type === 2 && item.scoreGlobal === 0) {
            this.tagMinusList.push(item)
          } else if (item.scoreGlobal === 1) {
            this.tagAllList.push(item)
          }
        })
      })
    },
    // 获取学生列表
    async getStudentList() {
      let info = {
        classId: this.classInfo.class_id,
        classType: 1,
      }
      await studentName(info).then((res) => {
        const { data } = res
        this.studentList = this.setList(data)
        this.studentIndexs = this.studentList.map((v, i) => i)
      })
    },
    // 数据处理
    setList(data, checked = false) {
      const result = data.map((item) => {
        return {
          ...item,
          isChecked: checked,
        }
      })
      return result
    },
    // 单独加分
    addScoreMark(sid) {
      this.markList = []
      this.markList.push(sid)
      this.rewardsDialog = true
    },
    // 单独减分
    minusScoreMark(sid) {
      this.markList = []
      this.markList.push(sid)
      this.rewardsDialog = true
    },
    // 多选打分
    toggleSelection(studentList) {
      this.markList = []
      studentList.map((item) => {
        if (item.isChecked === true) {
          this.markList.push(item.sid)
        }
      })

      studentList.map((item) => {
        if (item.isChecked === true && item.screenStatus === 0) {
          this.screenStatusMultiplayer = 0
        } else if (item.isChecked === true && item.screenStatus !== 0) {
          this.screenStatusMultiplayer = 1
        }
      })
    },
    // 打卡打分弹框
    openRewardsDialog() {
      this.rewardsDialog = true
    },
    // 加分
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
      console.log(this.scoreData)
      score(this.scoreData).then((res) => {
        console.log(res)
        if (res.statusCode !== 200) return this.$message.error(res.msg)
        this.$message.success(item.scoreName + ' ' + item.scoreNum)
      })
    },
    // 减分
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
        console.log(res)
        if (res.statusCode !== 200) return this.$message.error(res.msg)
        this.$message.error(item.scoreName + ' ' + item.scoreNum)
      })
    },
    // 全班
    handleTagAll(item) {
      let allStudent = []
      this.studentList.map((item) => {
        allStudent.push(item.sid)
      })
      this.scoreData.sid_arr = allStudent
      this.scoreData.config_score_id = item.id
      score(this.scoreData).then((res) => {
        console.log(res)
        if (item.scoreNum === '+1') {
          this.$message.success(item.scoreName + ' ' + item.scoreNum)
        } else {
          this.$message.error(item.scoreName + ' ' + item.scoreNum)
        }
      })
    },
    // 举手弹框
    handleHandUP() {
      this.changeName = true
      this.handUPDialog = true
    },
    numPlus() {
      if (this.studentList.length > this.selectNum) {
        this.selectNum++
      } else {
        this.$message.error('超过学生人数')
      }
    },
    numMinus() {
      if (this.selectNum > 1) {
        this.selectNum--
        return
      } else {
        this.$message.error('最少一名学生')
      }
    },
    // 随机人数
    changeSelectNum() {
      this.changeName = true
      clearInterval(this.intervalId)
      this.intervalId = null
    },
    // 开始/结束 随机点名
    startSelect() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
        this.hidenMark = false
        this.sclectStuName = false
        this.sidArr = []
        this.setMarjList()
      } else {
        this.changeName = false
        this.hidenMark = true
        this.sclectStuName = true
        this.intervalId = setInterval(() => {
          this.selectedStudentIndexs = this.studentIndexs
            .sort(() => 0.5 - Math.random())
            .slice(0, this.selectNum)
        }, 100)
      }
    },
    // 点名结果打分
    setMarjList() {
      this.markList = []
      for (let item of this.selectedStudentIndexs) {
        this.studentList.forEach((item2, keys) => {
          if (keys === item) {
            this.markList.push(item2.sid), this.sidArr.push(item2.stuName)
          }
        })
      }
    },
    //关闭举手框
    closeHandUpDialog() {
      this.markList = []
      this.sidArr = []
      this.sclectStuName = false
    },
    // 关闭打分弹框
    handleCloseRewardsDialog() {
      this.getStudentList()
      this.rewardsDialog = false
      this.checkedBoxDialog = false
    },
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
    switchCheckedBoxDialog() {
      if (this.checkedBoxDialog === false) {
        this.scoreData.sid_arr = []
        this.markList = []
        this.studentList.map((item) => {
          item.isChecked = false
        })
      }
      this.checkedBoxDialog = !this.checkedBoxDialog
    },
    // 控屏
    switchScreen(data) {
      console.log(data)
      studentScreen(data).then((res) => {
        console.log(res)
        this.$message.success(res.msg)
        this.getStudentList()
      })
    },
    // 学生个人控屏状态
    switchStudentScreen(student) {
      if (student.screenStatus === 0) {
        this.studentScreenInfo.screenStatus = 1
      } else {
        this.studentScreenInfo.screenStatus = 0
      }
      this.studentScreenInfo.sid_arr = []
      this.studentScreenInfo.sid_arr.push(student.sid)
      console.log(this.studentScreenInfo)
      this.switchScreen(this.studentScreenInfo)
    },
    switchMultiplayerScreen() {
      if (this.screenStatusMultiplayer === 0) {
        this.studentScreenInfo.screenStatus = this.screenStatusMultiplayer = 1
      } else {
        this.studentScreenInfo.screenStatus = this.screenStatusMultiplayer = 0
      }

      this.studentScreenInfo.sid_arr = this.markList
      this.switchScreen(this.studentScreenInfo)
      this.checkedBoxDialog = false
    },
    async switchClassScreen() {
      this.studentList.map((item) => {
        if (item.screenStatus === 0) {
          this.screenStatusClass = 0
          return
        } else {
          this.screenStatusClass = 1
        }
      })
      if (this.screenStatusClass === 0) {
        this.studentScreenInfo.screenStatus = 1
        this.screenStatusClass = 1
      } else {
        this.studentScreenInfo.screenStatus = 0
        this.screenStatusClass = 0
      }
      this.studentList.map((item) => {
        this.markList.push(item.sid)
      })
      this.studentScreenInfo.sid_arr = this.markList
      await this.switchScreen(this.studentScreenInfo)
      this.checkedBoxDialog = false
    },
  },
}
</script>

<style lang="scss" scoped>
.student_box {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  .student_card {
    width: 10%;
    margin: 1rem 0.5rem;
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
        position: relative;
        .avater {
          width: 100%;
          padding-bottom: 100%;
          border-radius: 50%;
          overflow: hidden;
          height: 0;
          cursor: pointer;
        }
        .status_screen {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgb(0, 0, 0, 0.5);
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
            }
            p {
              color: #fff;
              font-size: 0.5em;
              font-weight: bold;
            }
          }
        }
        img {
          width: 100%;
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
// 打分模块
.classroom_mark {
  position: fixed;
  right: 0;
  bottom: 5%;
  .mark_btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 5rem;
      height: 5rem;
      margin: 0.5rem;
      border: none;
      color: #fff;
      background: linear-gradient(to bottom right, #9853af, #623aa2) !important;
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
</style>

<style lang="scss">
.selectbox_dialog {
  .el-dialog__body {
    padding: 0;
  }
  .content_dialog {
    background: #f2f2f2;
    .topbox_dialog {
      height: 250px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .op_content {
        display: flex;
        justify-content: center;
        align-items: center;
        .el-input {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          .el-input__inner {
            height: 5rem;
            text-align: center;
            font-size: 3.5rem;
          }
        }
        .el-button {
          color: #636262;
          font-size: xx-large;
          margin: 0 1rem;
          i {
            font-weight: 900;
            font-size: 3rem;
          }
        }
      }
      .name_topbox {
        text-align: center;
        margin: 1rem;
        .stuName_box {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        span {
          font-size: x-large;
        }
      }
    }
    .btn_content {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-button {
        height: 2.5rem;
      }
    }
  }
}
</style>