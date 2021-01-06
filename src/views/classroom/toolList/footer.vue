<template>
  <div class="footer">
    <div class="btn-list">
      <el-button
        icon="el-icon-switch-button"
        @click="outClassRoom"
        class="out"
      />
      <el-button icon="el-icon-s-grid" @click="goPage('student-seat')">
        学生座位
      </el-button>
      <el-dropdown placement="top">
        <el-button>
          <i class="el-icon-arrow-up" />
           我的课件
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(tool, index) in subToolList"
            :key="index"
            @click.native="openTool(tool)"
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
      <el-button @click="openCheckedBox"> 多选 </el-button>
      <el-button @click="openHandUPDialog"> 举手 </el-button>
      <div v-show="isSeat">
        <el-dropdown placement="top">
          <el-button> <i class="el-icon-arrow-up" /> 控屏 </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="switchScreen('allLock')">
              全锁屏
            </el-dropdown-item>
            <el-dropdown-item @click.native="switchScreen('allUnlock')">
              全解锁
            </el-dropdown-item>
            <el-dropdown-item @click.native="switchStudentScreen('lock')">
              批量锁屏
            </el-dropdown-item>
            <el-dropdown-item @click.native="switchStudentScreen('unlock')">
              批量解锁
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
    }
  },
  created() {},
  computed: {
    ...mapState(['rewardsDialog', 'markList','checkedBox']),
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
    ]),
    openTool(tool) {
      this.$router.push('/' + tool.path).catch((err) => {
        console.log('err')
      })
    },
    goPage(path) {
      this.$router.push('/' + path).catch((err) => {
        console.log('err')
      })
    },
    openHandUPDialog() {
      this.setHandUPDialog(true)
    },
    openRewardsDialog() {
      this.setRewardsDialog(true)
    },
    openCheckedBox() {
      if(this.checkedBox) {
        this.setCheckedBox(false)
      } else {
        this.setCheckedBox(true)
      }
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
    // 批量控制学生屏幕
    switchStudentScreen(text) {
      if (this.markList.length === 0) return this.$message.error('请选择学生！')
      let screenStatus = ''
      if (text === 'lock') {
        screenStatus = 1
      } else {
        screenStatus = 0
      }
      const params = {
        screenStatus: screenStatus,
        sid_arr: this.markList,
      }
      console.log(params)
      studentScreen(params).then((res) => {
        this.setCheckedBox(false)
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
    }
  }
}
</style>