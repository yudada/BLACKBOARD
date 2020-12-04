<template>
  <div class="classroom_main">
    <div style="margin-top: 1rem"></div>

    <div class="classroom_concent">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-card :body-style="{ padding: 0 }">
            <div slot="header" class="header_text">
              <span>{{ teacher.teaSubject }}</span>
            </div>
            <div class="adviser_card">
              <img src="../../assets/images/faces/female/15.jpeg" alt="" />
              <div class="adviser_info">
                <h3>{{ teacher.teaName }} 老师</h3>
                <div class="info_text">
                  <p v-if="teacher.email">
                    邮箱地址 : <span>{{ teacher.email }}</span>
                  </p>
                  <p v-else>邮箱地址 : <span>暂无</span></p>
                  <p>
                    联系电话 : <span>{{ teacher.mobile }}</span>
                  </p>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="20">
          <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </el-row>
      <!-- 教学工具组件 -->
      <div class="classroom_tool">
        <div>
          <el-dropdown placement="top">
            <el-button type="warning" @click="goCourseWareList">
              超级课件 <i class="el-icon-arrow-up"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" router>
              <el-dropdown-item
                v-for="(tool, index) in subToolList"
                :key="index"
                @click.native="open(tool)"
                >{{ tool.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- 切换列表 -->
      <div class="arrange_seat">
        <div>
          <el-button icon="el-icon-s-grid" type="primary" @click="goStudentSeat"
            >学生座位</el-button
          >
        </div>
      </div>
      <!-- 退出教室 -->
      <div class="outclass">
        <div>
          <el-button
            icon="el-icon-switch-button"
            type="primary"
            @click="outClassRoom"
            >退出教室
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      teacher: {},
      subToolList: [
        { id: 0, name: '创建课件', path: 'create-courseware' },
        { id: 1, name: '课件资源', path: 'bookResource' },
      ],
      // 班级信息
      class_arr: {},
    }
  },
  created() {
    this.getClassInfo()
    this.closeSide()
  },
  methods: {
    ...mapMutations(['setTeacherInfo']),
    closeSide() {
      this.$store.commit('setCollapse', true)
      this.$store.commit('setFooter', false)
    },
    // 获取用户信息
    async getUserInfo() {
      const { data: res } = await this.$http.get(`api/user/info`)
      if (res.statusCode !== 200)
        return this.$message.error('获取用户信息失败！')
      this.class_arr = res.data.class_arr[0]
    },
    // 获取老师信息
    async getClassInfo() {
      const { data: res } = await this.$http.post(`api/teacher/info`)
      if (res.statusCode !== 200) return this.$message.error(res.msg)
      this.teacher = res.data
      this.$store.commit('setTeacherInfo', this.teacher)
    },
    // 退出教室
    async outClassRoom() {
      const confirmResult = await this.$confirm(
        '确定要退出教室吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') {
        return 
      }

      this.$router.push('/home')
      this.$store.commit('setFooter', true);
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
      if (flag === null) {
        this.$store.commit('setCollapse', false)
      } else {
        this.$store.commit('setCollapse', true)
      }
    },
    open(tool) {
      this.$router.push('/' + tool.path).catch((err) => {
        console.log('err')
      })
    },
    goStudentSeat() {
      this.$router.push('/studentSeat').catch((err) => {
        console.log('err')
      })
    },
    goCourseWareList() {
      this.$router.push('/course-wareList').catch((err) => {
        console.log('err')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 1rem;
}
.header_text {
  text-align: center;
  color: #6b3e9e !important;
  font-size: x-large;
  font-weight: 600;
}
.adviser_card {
  text-align: center;
  padding: 20px;
  background: linear-gradient(to left, #9853af, #623aa2);
  img {
    width: 40%;
    border-radius: 100%;
  }
  .adviser_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      color: #fff;
    }
    .info_text {
      color: #fff;
      font-size: 14px;
      span {
        color: #fff;
        font-size: 14px;
        opacity: 0.5;
      }
    }
  }
  i {
    color: #636262;
  }
}

// 课件
.classroom_tool {
  position: fixed;
  top: 85%;
  .el-button--primary {
    background: linear-gradient(to bottom right, #9853af, #623aa2) !important;
  }
}
// 座位
.arrange_seat {
  position: fixed;
  top: 90%;
  .el-button--primary {
    background: linear-gradient(to bottom right, #9853af, #623aa2) !important;
  }
}
// 退出教室
.outclass {
  position: fixed;
  top: 95%;
  .el-button--primary {
    border: #636262;
    background: linear-gradient(to bottom right, #aea9af, #817e85) !important;
  }
}
.outclass:hover {
  position: fixed;
  top: 95%;
  .el-button--primary {
    opacity: 0.8;
    border: #636262;
    background: linear-gradient(to bottom right, #aea9af, #817e85) !important;
  }
}
@media (max-width: 1280px) {
  .el-col-4,
  .el-col-20 {
    width: 100%;
  }
  .card_box {
    display: flex;
    justify-content: space-around;
  }
  .adviser_card {
    display: flex;
    justify-content: space-around;
    img {
      width: 22%;
    }
  }
}
</style>