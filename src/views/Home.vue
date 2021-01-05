<template>
  <div class="home_container">
    <div class="bgc_color"></div>
    <!-- 头部区域 -->
    <el-header>
      <div class="header_logo">
        <div @click="goHome">
          <span v-if="school.schoolName">{{ school.schoolName }}</span>
        </div>
        <i class="el-icon-s-fold" @click="toggleCollapse"></i>
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
                  >{{ item.className }}</el-dropdown-item
                >
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
                >安全退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '0' : '200px'">
        <!-- 侧边栏菜单区域 -->
        <div class="aside_menu">
          <el-menu
            background-color="#25202D"
            text-color="#fff"
            active-text-color="#ad5df3"
            :default-active="$route.path"
            router
            unique-opened
          >
            <NavMenu :navMenus="menuData" />
          </el-menu>
        </div>
      </el-aside>
      <el-main :class="{edu: path}">
        <!-- 路由占位符 -->
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
    <el-footer v-show="isFooter">
      <div class="home_footer">
        Copyright © 2020
        <a href="http://www.11dom.com/" title="维度教育">11dom.com</a>. Designed
        by <a href="#">Riechelr</a> All rights res
      </div>
    </el-footer>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import NavMenu from '../components/SideNavMenu/NavMenu.vue'
import { classList, changeClass, classInfo } from '@/api/index.js'
export default {
  components: {
    NavMenu: NavMenu,
  },
  data() {
    return {
      flag: '',
      menuData: [
        {
          //一级
          entity: {
            id: 0,
            name: '#home',
            icon: 'icon-diannao1',
            alias: '校园大脑',
          },
          //二级
          childs: [
            {
              entity: {
                id: 0,
                name: 'index1',
                icon: 'icon-xuexiao2',
                alias: '全校数据',
              },
            },
            {
              entity: {
                id: 1,
                name: 'index2',
                icon: 'icon-jiangbei',
                alias: '一年级(案例)',
              },
            },
            // {
            //   entity: {
            //     id: 2,
            //     name: 'index3',
            //     icon: 'icon-jiangbei',
            //     alias: '二年级',
            //   },
            // },
            // {
            //   entity: {
            //     id: 3,
            //     name: 'index4',
            //     icon: 'icon-jiangbei',
            //     alias: '三年级',
            //   },
            // },
            {
              entity: {
                id: 4,
                name: 'index5',
                icon: 'icon-shetuanhuodong',
                alias: '兴趣社团(案例)',
              },
            },
          ],
        },
        {
          //一级
          entity: {
            id: 1,
            name: 'wisdomBook',
            icon: 'icon-kebiao',
            alias: '智慧课本',
          },
        },
        {
          //一级
          entity: {
            id: 2,
            name: 'classroom',
            icon: 'icon-ketang',
            alias: '互动课堂',
          },
        },
        {
          //一级
          entity: {
            id: 3,
            name: '#Submenu2',
            icon: 'icon-zuoye',
            alias: '超级作业',
          },
          //二级
          childs: [
            {
              entity: {
                id: 0,
                name: 'publish',
                icon: 'icon-fabu',
                alias: '发布作业',
              },
            },
            {
              entity: {
                id: 1,
                name: 'prepareTask',
                icon: 'icon-xunke',
                alias: 'VR模型',
              },
            },
            {
              entity: {
                id: 2,
                name: 'readTask',
                icon: 'icon-yuedu',
                alias: '课本阅读',
              },
            },
            {
              entity: {
                id: 3,
                name: 'courseware',
                icon: 'icon-kaoqin',
                alias: '精选题库',
              },
            },
            {
              entity: {
                id: 4,
                name: 'exercitation',
                icon: 'icon-shixi-A',
                alias: '仿真实验',
              },
            },
            {
              entity: {
                id: 5,
                name: 'mistakes',
                icon: 'icon-cuoti',
                alias: '错题锦囊',
              },
            },
          ],
        },
        {
          //一级
          entity: {
            id: 4,
            name: 'onlineStudies',
            icon: 'icon-yanjiuzhulu',
            alias: '在线研学',
          },
        },
        {
          //一级
          entity: {
            id: 5,
            name: 'myclass',
            icon: 'icon-banji',
            alias: '我的班级',
          },
        },
        {
          //一级
          entity: {
            id: 6,
            name: '#Uidesign',
            icon: 'icon-banjiguanli',
            alias: '班级管理',
          },
          //二级
          childs: [
            {
              entity: {
                id: 0,
                name: 'classroomList',
                icon: 'icon-cengji',
                alias: '班级列表',
              },
            },
            {
              entity: {
                id: 1,
                name: 'users-list',
                icon: 'icon-yonghuqunzu',
                alias: '班级学生列表',
              },
            },
            {
              entity: {
                id: 2,
                name: 'papers-list',
                icon: 'icon-wenjian',
                alias: '试卷列表',
              },
            },
            {
              entity: {
                id: 3,
                name: 'progress',
                icon: 'icon-tongji',
                alias: '作业统计',
              },
            },
            {
              entity: {
                id: 4,
                name: 'performance',
                icon: 'icon-baogao',
                alias: '成绩报告',
              },
            },
            {
              entity: {
                id: 5,
                name: 'faq',
                icon: 'icon-biji',
                alias: '阅读笔记',
              },
            },
          ],
        },
        {
          //一级
          entity: {
            id: 7,
            name: '#pages',
            icon: 'icon-xueshengliebiao',
            alias: '学生管理',
          },
          //二级
          childs: [
            {
              entity: {
                id: 0,
                name: 'crypto-currencies',
                icon: 'icon-xueshengliebiao',
                alias: '学生列表',
              },
            },
            {
              entity: {
                id: 1,
                name: 'editprofile',
                icon: 'icon-tianjiajiahaoyoutianjiapengyou',
                alias: '添加新学生',
              },
            },
            {
              entity: {
                id: 2,
                name: 'blog',
                icon: 'icon-shenghuo',
                alias: '学生风彩',
              },
            },
          ],
        },
        {
          //一级
          entity: {
            id: 8,
            name: 'drawing',
            icon: 'icon-boshimao',
            alias: '学科工具',
          },
        },
        {
          //一级
          entity: {
            id: 9,
            name: '#Question',
            icon: 'icon-tiku',
            alias: '题库资源',
          },
          //二级
          childs: [
            {
              entity: {
                id: 0,
                name: 'establish',
                icon: 'icon-chuangjianv',
                alias: '创建题库',
              },
            },
            {
              entity: {
                id: 1,
                name: 'expand',
                icon: 'icon-qita',
                alias: '练习题',
              },
            },
            {
              entity: {
                id: 2,
                name: 'textbook',
                icon: 'icon-biaoqian',
                alias: '自检题',
              },
            },
            {
              entity: {
                id: 3,
                name: 'history',
                icon: 'icon-zhiban',
                alias: '历年考题',
              },
            },
          ],
        },
        {
          //一级
          entity: {
            id: 10,
            name: '#Apps',
            icon: 'icon-xitong',
            alias: '系统设置',
          },
          //二级
          childs: [
            {
              entity: {
                id: 0,
                name: 'information',
                icon: 'icon-gerenxinxi',
                alias: '学校资料',
              },
            },
            {
              entity: {
                id: 1,
                name: 'role',
                icon: 'icon-juese',
                alias: '角色管理',
              },
            },
            {
              entity: {
                id: 2,
                name: 'account',
                icon: 'icon-zizhanghaoguanli',
                alias: '账号管理',
              },
            },
            {
              entity: {
                id: 3,
                name: 'operationLog',
                icon: 'icon-caozuorizhi',
                alias: '操作日志',
              },
            },
          ],
        },
      ],
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
          url: 'course-wareList',
        },
        {
          title: '在线研学',
          icon: 'iconfont icon-yanjiuzhulu',
          url: 'onlineStudies',
        },
        { title: '学科工具', icon: 'iconfont icon-gongju', url: 'drawing' },
      ],
      classList: [],
      classInfo: {},
      school: {},
      userInfo: {},
      defaultPic: 'this.src="'+require('../assets/def_avater.jpg')+'"',
      pathArr: [
        {path: '/student-seat'},
        {path: '/book-resource'},
        {path: '/exercise'},
        {path: '/create-courseware'},
        {path: '/course-wareList'},
        {path: '/course-detail'},
        {path: '/models-detail'}
      ]
    }
  },
  computed: {
    ...mapState(['isCollapse', 'isFooter']),
    path: function() {
      const path = this.$route.path 
      let result = false
      this.pathArr.map(item=>{
        if(item.path === path) {
          console.log(item.path, path);
          result = true
          return
        }
      })
      return result
    }
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
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
      if (flag === null) {
        this.$store.commit('setCollapse', false);
      } else {
        this.setFooter(false);
        this.$store.commit('setCollapse', true);
      }
    },
    // 获取班级列表
    async getClassList() {
      await classList(1).then((res) => {
        const { data } = res.data
        console.log(data);
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
        const { data } = res.data
        const classInfo = data.class
        this.classInfo = classInfo
        this.$store.commit('setClassInfo', classInfo)
        this.school = data.school
        this.userInfo = data.userInfo
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
.bgc_color {
  position: absolute;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 191px;
  background: linear-gradient(to left, #9853af, #623aa2);
}
.home_container {
  height: 100%;
}
i:hover {
  cursor: pointer;
}
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
}

.el-aside {
  min-height: 100%;
  background-color: #25202d;
  padding: 10px 0;
  z-index: 1;
  a {
    color: inherit;
    text-decoration: none;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
}
.el-container {
  position: relative;
  min-height: calc(100vh - 120px);
  z-index: 1;
}
.el-main {
  height: 100%;
  padding: 0 30px;
  padding-bottom: 10px;
  overflow: hidden;
}
.el-menu {
  border-right: 0;
}

.el-footer {
  color: #707070;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  a,
  a:hover {
    color: #707070;
    text-decoration: none;
  }
}
.el-backtop {
  background: linear-gradient(to bottom right, #9853af, #623aa2) !important;
  border-radius: 5%;
  color: #fff;
}

@media (max-width: 800px) {
  .el-aside {
    position: absolute;
    z-index: 2;
    height: 100%;
    width: 0;
  }
}
</style>

<style lang="scss">
.aside_menu {
  .el-submenu.is-active .el-submenu__title {
    background: linear-gradient(to left, #9853af, #623aa2);
  }
  .el-submenu__title i {
    color: #fff;
    font-weight: 400;
  }
  .el-menu-item i {
    color: #fff;
  }
  .el-icon-arrow-down:before {
    font-weight: bold;
  }
}
.tool_dropdown {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .el-dropdown-menu__item {
    width: 60px;
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
.edu {
  padding: 0 !important;
}
</style>