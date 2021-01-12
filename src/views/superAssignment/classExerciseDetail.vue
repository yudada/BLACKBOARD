<template>
  <div class="courseware_main">
    <Breadcrumb :navData="navData" v-if="!tip" />

    <div class="courseware_concent">
      <el-card>
        <div slot="header" v-if="tip">
          <span>作业详情</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="goBack"
          >
            返回
          </el-button>
        </div>
        <span style="line-height: 40px; color: #636262" v-if="exeType === 2"> {{bookName}}</span>
        <Models-task :data="taskDetail" v-if="exeType === 1" />
        <Wisdom-read-task :data="taskDetail" v-if="exeType === 2" />
        <Exercise-task :data="taskDetail" v-if="exeType === 3" />
        <Experiment-task :data="taskDetail" v-if="exeType === 4" />
      </el-card>
    </div>
  </div>
</template>

<script>
import { classExerciseDetail } from '@/api/superAssignment'
import Breadcrumb from '@/components/breadcrumb.vue'
import ModelsTask from './components/modelsTask.vue'
import WisdomReadTask from './components/wisdomReadTask.vue'
import ExperimentTask from './components/experimentTask.vue'
import ExerciseTask from './components/exerciseTask.vue'
export default {
  components: {
    Breadcrumb,
    ModelsTask,
    WisdomReadTask,
    ExperimentTask,
    ExerciseTask,
  },
  data() {
    return {
      navData: {
        childTitle: '作业详情',
        goTo: '返回',
      },
      tableData: [],
      taskDetail: [],
      exeType: 0,
      bookName: ''
    }
  },
  computed: {
    tip: function () {
      return this.$route.query.tip ? true : false
    },
    exeId: function () {
      return this.$route.query.id
    },
  },
  created() {
    this.getClassExerciseDetail()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getClassExerciseDetail() {
      classExerciseDetail(this.exeId).then((res) => {
        const {
          bookName,
          class_id,
          created_at,
          detail,
          exeEndTime,
          exeStartTime,
          exeTitle,
          exeType,
          status,
          textbook_id,
          tid,
        } = res.data
        this.tableData.push(res.data)
        this.taskDetail = detail
        this.exeType = exeType
        this.bookName = bookName
      })
    },
    formatterValue(row, column, cellValue, index) {
      if (cellValue === 1) return 'VR模型控索'
      if (cellValue === 2) return '智慧课本阅读'
      if (cellValue === 3) return '精选题库练习'
      if (cellValue === 4) return '仿真实验'
    },
    formatterValue2(row, column, cellValue, index) {
      if (cellValue === 1) return '已发布'
      if (cellValue === 2) return '草稿'
    }
  },
}
</script>