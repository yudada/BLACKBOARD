<template>
  <div>
    <el-dropdown>
      <el-button class="el-dro-button">
        <span>窗口</span>
      </el-button>
      <el-dropdown-menu v-show="$store.state.pageCache.length > 0" slot="dropdown">
        <el-dropdown-item
          v-for="(item, index) in $store.state.pageCache"
          :key="index"
          class="tag-view-drop-item"
        >
            <span @click.stop="goPage(item.nameZh, item.nameE, item.queryInfo)">
              {{ item.nameZh }}
            </span>
            <i
              class="el-icon-close"
              @click="removeTab(item.nameZh, item.nameE)"
            />
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    goPage(nameZh, nameE) {
      this.$router.push(nameE).catch((err) => {})
    },
    removeTab(nameZh, nameE) {
      //移除tab
      var obj = {
        nameZh: nameZh,
        nameE: nameE,
        router: this.$router,
      }
      this.$store.commit('removePageCache', obj)
    },
  },
}
</script>

<style lang="scss" scoped>
.tag_views {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 0 5px 0;
  li {
    margin-right: 10px;
    cursor: pointer;
    line-height: 60px;
    list-style: none;
    color: #636262;
  }
  .active {
    color: #fff;
    background: linear-gradient(to bottom right, #9853af, #623aa2);
  }
}

.el-dro-button {
  color: #fff;
  background: linear-gradient(to bottom right, #62fb62, #21a544) !important;
  border: none;
  i{
    margin: 0 5px;
  }
}
.tag-view-drop-item {
  i {
    margin: 0 5px;
  }
}
</style>