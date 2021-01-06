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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import Footer from './toolList/footer.vue'
import {
  studentName,
  scoreTagList,
  score,
  studentScreen,
  classScreen,
} from '@/api/classRoom.js'
import { classInfo } from '@/api/index.js'
export default {
  components: { Footer },
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
    reload: function(newReload, oldReload) {
      this.getStudentList()
    }
  },
  computed: {
    ...mapState(['classInfo', 'reload'])
  },
  methods: {
    ...mapMutations([
      'setTagAllList',
      'setStudentList',
      'setStudentIndexs',
      'setTagAddList',
      'setTagMinusList',
    ]),
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
        const { data } = res
        this.studentList = this.setList(data)
        this.studentIndexs = this.studentList.map((v, i) => i)
        this.setStudentList(this.studentList)
        this.setStudentIndexs(this.studentIndexs)
        console.log('刷新班级列表');
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