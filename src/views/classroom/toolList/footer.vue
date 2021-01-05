<template>
  <div class="footer">
    <el-button icon="el-icon-switch-button" @click="outClassRoom" class="out">
      退出教室
    </el-button>
    <el-button icon="el-icon-s-grid" @click="goPage('student-seat')">
      学生座位
    </el-button>
    <el-dropdown placement="top">
      <el-button>
        <i class="el-icon-arrow-up" />
        我的课件
      </el-button>
      <el-dropdown-menu slot="dropdown" router>
        <el-dropdown-item
          v-for="(tool, index) in subToolList"
          :key="index"
          @click.native="openTool(tool)"
        >
          {{ tool.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button @click="goPage('book-resource')"> 教学资源 </el-button>
    <div v-show="false">
      <el-button> 工具 </el-button>
      <el-button> 多选 </el-button>
      <el-button> 举手 </el-button>
      <el-button> 控屏 </el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
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
    isSeat: function () {
      return this.$route.path === '/student-seat' ? true : false
    }
  },
  methods: {
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
  },
}
</script>

<style lang="scss" scoped>
.footer {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .el-button {
    margin: 0 10px 0 0;
    border: none;
    color: #fff;
    background: linear-gradient(to bottom right, #9853af, #623aa2);
  }
  .el-button:focus,.el-button:hover {
    opacity: 0.7;
  }
  .out {
    background: linear-gradient(to bottom right, #aea9af, #817e85);
  }
}
</style>