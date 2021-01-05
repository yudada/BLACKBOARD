<template>
  <div class="classroom_main">
    <el-main>
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </div>
</template>
<script>
import Footer from './toolList/footer.vue'
export default {
  components: { Footer },
  data() {
    return {
      
    }
  },
  created() {
    this.closeSide()
  },
  methods: {
    closeSide() {
      this.$store.commit('setCollapse', true)
      this.$store.commit('setFooter', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.classroom_main {
  width: 100%;
  .el-main {
    margin-bottom: 60px;
  }
  .el-footer {
    width: 100%;
    position: fixed;
    padding: 0;
    bottom: 0;
    background: white;
    z-index: 2;
  }
}
</style>