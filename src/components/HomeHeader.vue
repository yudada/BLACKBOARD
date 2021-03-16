<template>
  <el-header>
    <div class="header_logo">
      <div @click="goHome" class="header_icon">
        <span v-if="school.schoolName">{{ school.schoolName }}</span>
      </div>
      <i class="el-icon-s-fold header_icon" @click="toggleCollapse"></i>
    </div>

    <div class="header_search">
      <!-- 全屏 -->
      <div class="header_icon">
        <i @click="toggleFullScreen" class="el-icon-full-screen"></i>
      </div>
      <!-- 选择班级 -->
      <div class="header_icon" v-if="classInfo">
        <el-dropdown>
          <span class="el-dropdown-link">
            <span>{{ classInfo.className }}</span>
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div v-for="item in classList" :key="item.class_id">
              <el-dropdown-item
                icon="iconfont icon-banji"
                @click.native="handleChangeClass(item)"
              >
                {{ item.className }}
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 菜单 -->
      <div class="header_icon">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-s-custom"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width: 300px">
            <!-- 头像 -->
            <div class="user-profile">
              <div class="dropdown user-pro-body">
                <div>
                  <img
                    v-if="userInfo.photo"
                    :src="userInfo.photo"
                    alt="user-img"
                    class="img-circle"
                    :onerror="defaultPic"
                  />
                  <img
                    v-else
                    src="@/assets/def_avater.jpg"
                    alt="user-img"
                    class="img-circle"
                  />
                </div>
                <div class="mb-2">
                  <span class="font-weight-semibold">{{
                    userInfo.teaPosition
                  }}</span>
                  <span class="font-weight-semibold">{{
                    userInfo.realName
                  }}</span>
                </div>
              </div>
            </div>
            <!-- 工具 -->
            <div class="tool_dropdown">
              <el-dropdown-item
                v-for="(tool, index) in toolList"
                :key="index"
                @click.native="goPage(tool)"
              >
                <i :class="tool.icon"></i>
                <span>{{ tool.title }}</span>
              </el-dropdown-item>
            </div>
            <el-dropdown-item
              divided
              icon="el-icon-switch-button"
              @click.native="logout"
              style="text-align: center"
            >
              安全退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { classList, changeClass, classInfo } from '@/api/index'
export default {
  name: 'HomeHeader',
  data() {
    return {
      flag: '',
      classList: [],
      classInfo: {},
      school: {},
      userInfo: {},
      toolList: [
        { title: '用户信息', icon: 'iconfont icon-yonghu', url: 'userInfo' },
        {
          title: '学校资料',
          icon: 'iconfont icon-xuexiao',
          url: 'information',
        },
        { title: '我的班级', icon: 'iconfont icon-banji', url: 'myclass' },
        {
          title: '课件管理',
          icon: 'iconfont icon-banji1',
          url: 'ware-list',
        },
        {
          title: '在线研学',
          icon: 'iconfont icon-yanjiuzhulu',
          url: 'onlineStudies',
        },
        { title: '学科工具', icon: 'iconfont icon-gongju', url: 'drawing' },
      ],
      defaultPic: 'this.src="' + require('../assets/def_avater.jpg') + '"',
    }
  },
  computed: {
    ...mapState(['isCollapse', 'isFooter']),
  },
  created() {
    this.getClassInfo()
    this.getClassList()
    this.isMobile()
  },
  methods: {
    ...mapMutations(['setFooter', 'setCollapse']),
    toggleCollapse() {
      this.flag = this.isCollapse
      this.flag = !this.flag
      this.$store.commit('setCollapse', this.flag)
    },
    goHome() {
      this.isMobile()
      this.$router.push('/home').catch((err) => {})
    },
    async logout() {
      const confirmResult = await this.$confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)

      if (confirmResult !== 'confirm') {
        return
      }
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    isMobile() {
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
    // 获取班级列表
    async getClassList() {
      await classList(1).then((res) => {
        const { data } = res
        this.classList = data
      })
      this.firstLogin()
    },
    // 切换班级
    handleChangeClass(item) {
      changeClass(item.class_id).then((res) => {
        this.getClassInfo()
        location.reload()
      })
    },
    // 切换网页全屏
    toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    },
    // 当前班级
    getClassInfo() {
      classInfo().then((res) => {
        const classInfo = res.data.class
        const { school, userInfo } = res.data
        this.classInfo = classInfo
        this.$store.commit('setClassInfo', classInfo)
        this.school = school
        this.userInfo = userInfo
      })
    },
    goPage(tool) {
      this.$router.push('/' + tool.url).catch((err) => {
        console.log('err')
      })
      this.isMobile()
    },
    firstLogin() {
      if (!this.classList[0].class_id || !this.classList.length) {
        this.$message.info('暂无班级已跳转到创建班级页')
        this.$router
          .push({ path: '/classroomAdd', query: { tip: 'firstAdd' } })
          .catch((err) => {
            console.log('err')
          })
      } else {
        return
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-header {
  position: relative;
  background: rgba(225, 225, 225, 0.01);
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  z-index: 22;
  a {
    color: #fff;
    width: 200px;
  }
  i {
    cursor: pointer;
  }
  .header_logo {
    font-size: 1.2em;
    color: #ffffff;
    font-weight: 600;
    padding: 0 1.5rem;
    width: 250px;
    display: flex;
    justify-content: space-around;
    span {
      cursor: pointer;
      text-align: center;
    }
    i {
      margin-left: 2rem;
    }
  }
  > div {
    display: flex;
    align-items: center;
  }
  .el-input {
    background: rgba(225, 225, 225, 0.08);
    border-radius: 20px;
    color: #fff;
  }
  .header_icon {
    padding: 5px 10px;
  }
  .header_icon:hover {
    background: rgba(0,0,0,.05);
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.tool_dropdown {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
  .el-dropdown-menu__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    i {
      font-size: x-large;
    }
  }
}
.user-profile {
  padding: 0 0 15px;
  display: flex;
  .user-pro-body {
    width: 100%;
    padding: 0 20px;
    display: flex;
  }
  .mb-2 {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      font-weight: 600;
      color: #606266;
    }
    span:nth-child(2) {
      color: #b1afaf;
    }
  }
  .user-pro-body img {
    width: 60px;
    display: block;
    margin: 0 20px 0 0;
    border: 5px solid #eee;
    border-radius: 100%;
  }
}
</style>