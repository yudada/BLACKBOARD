<template>
  <div class="book-res">
    <el-card style="min-height: calc(100vh - 160px)">
      <div slot="header">
        <span>课堂练习</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goList">课堂练习列表</el-button>
      </div>
      <el-tabs
        v-model="activeName"
        type="card"
        :stretch="true"
        @tab-click="handleClick"
      >
        <el-tab-pane label="模型资源" name="one">
          <Models @func="getContentId" :classWork="classWork" />
        </el-tab-pane>
        <el-tab-pane label="精选题库" name="two">
          <Exercise @func="getContentId" :classWork="classWork" />
        </el-tab-pane>
        <el-tab-pane label="实验列表" name="three">
          <Experiment @func="getContentId" :classWork="classWork" />
        </el-tab-pane>
        <el-tab-pane label="课本" name="four">
          <el-select clearable v-model="bookId" placeholder="请选择课本">
            <el-option
              v-for="item in bookList"
              :key="item.id"
              :label="item.bookName"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <Read
            v-if="bookId"
            @func="getContentId"
            :classWork="classWork"
            :bookId="bookId"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { wisdomBookList } from '@/api/wisdomBook'
import { classExerciseAdd } from '@/api/classRoom'
import Experiment from '@/components/resourceList/experiment'
import Exercise from '@/components/resourceList/exercise'
import Read from '@/components/resourceList/read.vue'
import Models from '@/components/resourceList/models.vue'
export default {
  name: 'bookResource',
  components: {
    Experiment,
    Exercise,
    Read,
    Models,
  },
  data() {
    return {
      classWork: true,
      activeName: 'one',
      bookId: '',
      bookList: [],
      addExercise: {
        exeType: 1,
        textbook_id: '',
        model_ids: '',
      },
    }
  },
  created() {
    this.getWisdomBookList()
  },
  methods: {
    getWisdomBookList() {
      wisdomBookList().then((res) => {
        const { data } = res
        this.bookList = data
        this.bookId = data[0].id
      })
    },
    handleClick(tab, event) {
      if (tab.name === 'one') this.addExercise.exeType = 1
      if (tab.name === 'two') this.addExercise.exeType = 3
      if (tab.name === 'three') this.addExercise.exeType = 4
      if (tab.name === 'four') this.addExercise.exeType = 2
    },
    // 获取子组件内容
    getContentId(data) {
      if(data.contentId.length === 0) return this.$message.warning('请选择作业内容！')
      this.addExercise.model_ids = data.contentId
      this.addExercise.textbook_id = this.bookId
      classExerciseAdd(this.addExercise).then((res) => {
        this.$message.success('发布成功！')
        this.goList()
      })
    },
    goList() {
      this.$router.push('/exercise-list')
    }
  },
}
</script>

<style lang="scss" scoped>
.resource_box {
  display: flex;
  flex-wrap: wrap;
  .img_model {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    padding: 0.5rem;
    border: 1px solid rgba(167, 180, 201, 0.2);
    img {
      width: 100%;
    }
  }
}
.el-card {
  cursor: pointer;
  iframe {
    height: 100%;
  }
}
.content_box {
  width: 100%;
  height: 100%;
  border: none;
}
.model_search {
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
</style>

<style lang="scss">
.modle_dialog {
  height: 70%;
  .el-dialog__body {
    height: 100%;
    padding: 0 !important;
    background: rgba(255, 255, 255, 1);
  }
}
.book-res {
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background: linear-gradient(to bottom right, #9853af, #623aa2);
    color: #fff;
  }
}
</style>