<template>
  <div class="footer">
    <div class="btn-list">
      <el-button @click="outClassRoom" class="out">
        <i class="el-icon-switch-button"></i> 退出教室
      </el-button>
      <el-dropdown placement="top" :hide-on-click="false">
        <el-button icon="el-icon-s-grid" @click="goPage('student-seat')">
          学生座位
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="num in 5"
            :key="num"
            @click.native="selectGroupNum(num)"
          >
            <span v-if="num > 1">每组{{ num }}人</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="selectGroupNum(0)">
            <el-popover
              placement="top"
              width="160"
              v-model="selectGroupNumvisible"
            >
              <el-input
                style="margin-bottom: 5px"
                size="mini"
                type="number"
                v-model="groupValue"
              />
              <div style="text-align: right; margin: 0">
                <el-button
                  type="primary"
                  size="mini"
                  @click="selectGroupNum(0)"
                >
                  确定
                </el-button>
              </div>
              <!-- <el-button @click="selectGroupNumvisible = true" type="text" style="color: #636262" slot="reference">
                指定人数
              </el-button> -->
            </el-popover>
          </el-dropdown-item>
          <el-dropdown-item @click.native="selectGroupNum(1)">
            重置分组
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown placement="top">
        <el-button>
          <i class="el-icon-arrow-up" />
          我的课件
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(tool, index) in subToolList"
            :key="index"
            @click.native="goPage(tool.path)"
          >
            {{ tool.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown placement="top">
        <el-button> <i class="el-icon-arrow-up" /> 教学资源 </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="goPage('book-resource')">
            资源列表
          </el-dropdown-item>
          <el-dropdown-item @click.native="goPage('exercise')">
            课堂练习
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click="openRewardsDialog"> 评分 </el-button>
      <el-dropdown placement="top" trigger="click">
        <el-button @click="openCheckedBox"> 多选 </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="opAllStudent(true)">
            全选
          </el-dropdown-item>
          <el-dropdown-item @click.native="opStudent()">
            反选
          </el-dropdown-item>
          <el-dropdown-item @click.native="opAllStudent(false)">
            取消
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click="openHandUPDialog"> 举手 </el-button>
      <el-dropdown placement="top">
        <el-button> <i class="el-icon-arrow-up" /> 控屏 </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="switchScreen('allLock')">
            全锁屏
          </el-dropdown-item>
          <el-dropdown-item @click.native="switchScreen('allUnlock')">
            全解锁
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 评分弹框 -->
    <Presentation />
    <!-- 举手弹框 -->
    <Interaction />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Interaction from '../components/interaction.vue'
import Presentation from '../components/presentation.vue'
import { studentScreen, classScreen } from '@/api/classRoom.js'
export default {
  components: { Interaction, Presentation },
  data() {
    return {
      subToolList: [
        { id: 0, name: '创建课件', path: 'create-courseware' },
        { id: 1, name: '我的课件', path: 'course-wareList' },
      ],
      selectGroupNumvisible: false,
      groupValue: 0,
    }
  },
  created() {},
  computed: {
    ...mapState(['rewardsDialog', 'markList', 'checkedBox', 'studentList']),
    isSeat: function () {
      return this.$route.path === '/student-seat' ? true : false
    },
  },
  methods: {
    ...mapMutations([
      'setRewardsDialog',
      'setHandUPDialog',
      'setCheckedBox',
      'setReload',
      'setMarkList',
      'setGroupNum',
    ]),
    goPage(path) {
      this.$router.push('/' + path).catch((err) => {
        console.log('err')
      })
    },
    selectGroupNum(num) {
      if (num === 0) {
        this.setGroupNum(this.groupValue)
        // this.selectGroupNumvisible = false-
      } else {
        this.setGroupNum(num)
      }
    },
    openHandUPDialog() {
      this.setHandUPDialog(true)
    },
    openRewardsDialog() {
      this.setRewardsDialog(true)
    },
    openCheckedBox() {
      this.setCheckedBox(true)
    },
    // 全选
    opAllStudent(data) {
      let markList = []
      markList = this.studentList.map((item) => item.sid)
      if (data) {
        this.studentList.map((item) => (item.isChecked = true))
        this.setMarkList(markList)
      } else {
        this.setCheckedBox(false)
        this.studentList.map((item) => (item.isChecked = false))
        this.setMarkList([])
      }
      console.log(this.markList)
    },
    // 反选
    opStudent() {
      this.studentList.map((item) => {
        if (item.isChecked === true) {
          item.isChecked = false
        } else if (item.isChecked === false) {
          item.isChecked = true
        }
      })
      const markList = []
      this.studentList.map((item) => {
        if (item.isChecked === true) {
          markList.push(item.sid)
        }
      })
      this.setMarkList(markList)
      console.log(this.markList)
    },
    // 全班控屏
    switchScreen(text) {
      let screenStatus = ''
      if (text === 'allLock') {
        screenStatus = 1
      } else {
        screenStatus = 0
      }
      classScreen(screenStatus).then((res) => {
        this.setReload()
        this.$message.success(res.msg)
      })
    },
    // 退出教室
    async outClassRoom() {
      const confirmResult = await this.$confirm('确定要退出教室吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)

      if (confirmResult !== 'confirm') {
        return
      }
      this.$router.push('/home')
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
      if (flag === null) {
        this.$store.commit('setCollapse', false)
        this.$store.commit('setFooter', true)
      } else {
        this.$store.commit('setCollapse', true)
        this.$store.commit('setFooter', false)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.footer {
  height: 100%;
  display: flex;
  align-items: center;
  .btn-list {
    display: flex;
    padding: 0 10px;
    width: 100%;
    overflow-x: scroll;
    .el-button {
      margin: 0 10px 0 0;
      border: none;
      color: #fff;
      background: linear-gradient(to bottom right, #9853af, #623aa2);
    }
    .el-button:hover {
      opacity: 0.7;
    }
    .out {
      background: linear-gradient(to bottom right, #aea9af, #817e85);
      i {
        color: red;
      }
    }
  }
}
</style>