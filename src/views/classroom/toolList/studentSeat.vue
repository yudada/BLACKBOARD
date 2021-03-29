<template>
  <div>
    <el-card>
      <div slot="header">
        <div class="header-card">
          <span>学生座位</span>
          <el-button
            :loading="loading"
            v-if="isGroup"
            @click="saveGroup"
          >
            保存分组
          </el-button>
          <el-tooltip content="切换教学模式" placement="left">
            <el-button @click='changeMode'>
              <i class='el-icon-s-tools'></i>
            </el-button>
          </el-tooltip>
        </div>
      </div>
      <el-row>
        <el-col v-if="studentList[0]">
          <div class="group-arr" v-if="isGroup">
            <Seat-group :groupArr="groupArr" />
          </div>
          <div v-else class="student_box">
            <Seat-list :studentList="studentList" />
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
import SeatList from '../components/seatList.vue'
import SeatGroup from '../components/seatGroup.vue'
import { saveStudentGroup } from '@/api/classRoom'
export default {
  components: { SeatList, SeatGroup },
  data() {
    return {
      groupParams: {
        groupLen: '',
        group: [],
      },
      loading: false,
    }
  },
  computed: {
    ...mapState([
      'studentList',
      'checkedBox',
      'groupNum',
      'groupNumChange',
      'isGroup',
      'groupArr',
    ]),
  },
  watch: {
    groupNumChange: function (newdata, olddata) {
      this.shuffle()
    },
  },
  methods: {
    ...mapMutations([
      'setStudentList',
      'setGroupNum',
      'setGroupNumChange',
      'setGroupArr',
    ]),
    shuffle: function () {
      if (this.isGroup) {
        this.setStudentList(_.shuffle(this.studentList))
        let groupArr = this.group(this.studentList, this.groupNum)
        this.setGroupArr(groupArr)
      }
    },
    group(array, subGroupLength) {
      let index = 0
      let newArray = []
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)))
      }
      return newArray
    },
    saveGroup() {
      this.loading = true
      this.groupParams.group = []
      this.groupArr.map((item, index) => {
        let group = item.map((s) => s.sid)
        this.groupParams.group = [...this.groupParams.group, ...group]
      })
      this.groupParams.groupLen = this.groupNum
      console.log(this.groupParams)
      saveStudentGroup(this.groupParams).then((res) => {
        this.$message.success('保存成功!')
        this.loading = false
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
    changeMode () {
      this.$store.commit('changeMode', false)
      this.$router.push('/black-board')
    }
  },
}
</script>

<style lang="scss" scoped>
.header-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-button {
    color: #fff;
    background: linear-gradient(to bottom right, #9853af, #623aa2);
  }
}
.nostudent {
  .nostudent-card {
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: x-large;
    span {
      color: #b1afaf;
      cursor: pointer;
    }
  }
}
</style>