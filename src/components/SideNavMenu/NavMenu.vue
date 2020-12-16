<template>
  <div class="navMenu">

    <template v-for="navMenu in navMenus">
        <!-- 最后一级菜单 -->
      <el-menu-item v-if="!navMenu.childs&&navMenu.entity" :key="navMenu.entity.id" :index="'/' + navMenu.entity.name"  @click="isMobile">
        <i :class="'iconfont' + ' ' + navMenu.entity.icon"></i>
        <span slot="title">{{navMenu.entity.alias}}</span>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu v-if="navMenu.childs&&navMenu.entity" :key="navMenu.entity.id" :index="'/' + navMenu.entity.name"  @click="isMobile">
        <template slot="title">
          <i :class="'iconfont' + ' ' + navMenu.entity.icon"></i>
          <span> {{navMenu.entity.alias}}</span>
        </template>
        <!-- 递归 -->
        <NavMenu :navMenus="navMenu.childs"></NavMenu>
      </el-submenu>
    </template>

  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {
        activePath: ''
      }
    },
    methods: {
      isMobile() {
        let flag = navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
        if (flag === null) {
          this.$store.commit('setCollapse', false)
        } else {
          this.$store.commit('setCollapse', true)
          this.$store.commit('isFooter', false)
        }
      }
    }
  }
</script>

<style scoped>
i {
  margin-right: 0.5rem;
  width: 18px;
}
</style>
