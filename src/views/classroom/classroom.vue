<template>
  <div class="classroom_main">
    <el-main>
      <transition name="fade-transform" mode="out-in">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view :key="key" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" :key="key" />
      </transition>
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { studentName, scoreTagList } from '@/api/classRoom.js'
import Footer from './toolList/footer.vue'
import TagView from '../../components/SideNavMenu/tagView.vue'
export default {
  components: { Footer, TagView },
  data() {
    return {
      tagAllList: [],
      studentList: [],
      studentIndexs: [],
      tagAddList: [],
      tagMinusList: [],
    }
  },
  created() {
    this.closeSide()
    this.getStudentList()
    this.getTagList()
  },
  watch: {
    reload: function () {
      this.getStudentList()
    },
    $route: function () {
      this.addTagView()
    },
  },
  computed: {
    ...mapState(['classInfo', 'reload', 'isGroup']),
    key() {
      return this.$route.path
    },
  },
  mounted() {
    window.addEventListener('unload', this.saveState)
    this.addTagView()
  },
  methods: {
    saveState() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    },
    ...mapMutations([
      'setTagAllList',
      'setStudentList',
      'setStudentIndexs',
      'setTagAddList',
      'setTagMinusList',
      'setGroupNum',
      'setIsGroup',
      'setGroupArr',
    ]),
    addTagView() {
      const routeInfo = this.$route
      if (
        routeInfo.path === '/exercise-detail' ||
        routeInfo.path === '/class-exercise-detail'
      )
        return
      var obj = {
        nameZh: routeInfo.meta.title,
        nameE: routeInfo.fullPath,
      }
      this.$store.commit('addPageCache', obj)
    },
    closeSide() {
      this.$store.commit('setCollapse', true)
      this.$store.commit('setFooter', false)
    },
    // 标签列表
    getTagList() {
      scoreTagList().then((res) => {
        const { scoreArr } = res.data
        scoreArr.map((item) => {
          if (item.type === 1 && item.scoreGlobal === 0) {
            this.tagAddList.push(item)
          } else if (item.type === 2 && item.scoreGlobal === 0) {
            this.tagMinusList.push(item)
          } else if (item.scoreGlobal === 1) {
            this.tagAllList.push(item)
          }
        })
        this.setTagAllList(this.tagAllList)
        this.setTagAddList(this.tagAddList)
        this.setTagMinusList(this.tagMinusList)
      })
    },
    // 获取学生列表
    async getStudentList() {
      let info = {
        classId: this.classInfo.class_id,
        classType: 1,
      }
      await studentName(info).then((res) => {
        const { student, is_group, groupLen } = res.data
        this.setGroupNum(groupLen)

        this.studentList = this.setList(student)
        this.studentIndexs = this.studentList.map((v, i) => i)
        this.setStudentList(this.studentList)
        this.setStudentIndexs(this.studentIndexs)

        if (is_group === 1) {
          this.setIsGroup(true)
          let groupArr = this.groupStudentList(this.studentList, groupLen)
          this.setGroupArr(groupArr)
          console.log(groupArr)
        } else {
          this.setIsGroup(false)
        }
      })
    },
    // 数据处理
    setList(data, checked = false) {
      const result = data.map((item) => {
        return {
          ...item,
          isChecked: checked,
        }
      })
      return result
    },
    groupStudentList(array, subGroupLength) {
      let index = 0
      let newArray = []
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)))
      }
      return newArray
    },
  },
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