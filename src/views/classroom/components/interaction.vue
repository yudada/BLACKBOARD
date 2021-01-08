<template>
  <div>
    <!-- 举手弹框 -->
    <el-dialog
      title="随机举手"
      :visible.sync="handUPDialog"
      top="30vh"
      width="40%"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="handleClose"
      custom-class="selectbox_dialog"
    >
      <div class="content_dialog">
        <div class="topbox_dialog">
          <div class="op_content" v-show="changeName">
            <el-button type="text" icon="el-icon-minus" @click="numMinus" />
            <el-input type="number" v-model="selectNum" @change="handleChangeSelectNum" />
            <el-button type="text" icon="el-icon-plus" @click="numPlus" />
          </div>
          <div class="name_topbox">
            <div v-if="sclectStuName">
              <span>{{ studentList[selectedStudentIndexs[0]].stuName }}</span>
            </div>
            <div v-else class="stuName_box">
              <div v-for="item in sidArr" :key="item.sid">
                <span v-if="sidArr.length > 1">{{ item }} ， </span>
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
          >
            评分
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      changeName: true,
      selectNum: 1,
      selectedStudentIndexs: [0],
      markList: [],
      intervalId: null,
      hidenMark: true,
      sidArr: [],
      sclectStuName: false,
    }
  },
  computed: {
    ...mapState(['studentList', 'studentIndexs', 'handUPDialog']),
    btnText() {
      return this.intervalId ? '结束' : `开始`
    },
  },
  watch: {
    handUPDialog: function(newValue, oldValue) {
      if(newValue) {
        this.changeName = true
      }
    }
  },
  created() {},
  methods: {
    ...mapMutations(['setMarkList', 'setHandUPDialog', 'setRewardsDialog']),
    closeHandUpDialog() {
      this.setHandUPDialog(false)
    },
    handleChangeSelectNum(value) {
      // if()
      console.log(typeof value);
      console.log(value);
      if(!value) {
        this.selectNum = 1
      } else if(parseFloat(value) > this.studentList.length) {
        this.selectNum = this.studentList.length
      }
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
      this.setMarkList(this.markList)
    },
    // 关闭举手框
    handleClose() {
      this.markList = []
      this.sidArr = []
      this.sclectStuName = false
      this.hidenMark = true
      this.setHandUPDialog(false)
    },
    openRewardsDialog() {
      this.setRewardsDialog(true)
    },
  },
}
</script>

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