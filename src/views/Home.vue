<template>
  <div class="home_container">
    <div class="bgc_color" />
    <Home-header />

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
      <el-main :class="{ edu: path }">
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
import { mapState } from 'vuex'
import NavMenu from '../components/SideNavMenu/NavMenu.vue'
import HomeHeader from '../components/HomeHeader'
import sideMenuData from '../utils/sideMenuData'
export default {
  components: { NavMenu, HomeHeader },
  data() {
    return {
      menuData: sideMenuData,
      pathArr: [
        { path: '/student-seat' },
        { path: '/book-resource' },
        { path: '/exercise' },
        { path: '/create-courseware' },
        { path: '/course-wareList' },
        { path: '/course-detail' },
        { path: '/models-detail' },
        { path: '/class-exercise-detail' },
        { path: '/exercise-list' },
        { path: '/exercise-detail' },
      ],
    }
  },
  computed: {
    ...mapState(['isCollapse', 'isFooter']),
    path: function () {
      const path = this.$route.path
      let result = false
      this.pathArr.map((item) => {
        if (item.path === path) {
          result = true
          return
        }
      })
      return result
    },
  }
}
</script>

<style lang="scss" scoped>
.home_container {
  height: 100%;
    .bgc_color {
    position: absolute;
    top: 0;
    z-index: 0;
    width: 100%;
    height: 191px;
    background: linear-gradient(to left, #9853af, #623aa2);
  }
}

.el-container {
  position: relative;
  min-height: calc(100vh - 120px);
  z-index: 1;
  .el-aside {
    min-height: 100%;
    background-color: #25202d;
    padding: 10px 0;
    z-index: 2;
    a {
      color: inherit;
      text-decoration: none;
      -webkit-transition: all 0.3s;
      -o-transition: all 0.3s;
      transition: all 0.3s;
    }
  }
  .el-main {
    height: 100%;
    padding: 0 30px;
    padding-bottom: 10px;
    overflow: hidden;
  }
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
  .el-menu {
    border-right: 0;
  }
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
.edu {
  padding: 0 !important;
}
</style>