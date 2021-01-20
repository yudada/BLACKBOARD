<template>
  <div class="public-studies-quetions">
    <el-dialog
      title="在线研学发布题目"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
      :append-to-body="true"
      custom-class="public-dialog"
      top="10vh"
      @opened="getOnlinequestions"
    >
      <Exercise
        @func="getContentId"
        v-if="renderComponent"
        :classWork="true"
        :contentId="studiesParams.que_ids"
      />
    </el-dialog>
  </div>
</template>

<script>
import { onlineAddQuestions, onlinequestions } from '@/api/onlineStudies'
import { answerPerson } from '@/api/onlineStudies'
import Exercise from '../../../components/resourceList/exercise.vue'
export default {
  components: { Exercise },
  props: ['visible', 'data'],
  data() {
    return {
      dialogVisible: false,
      studiesParams: {
        online_id: '',
        que_ids: [],
      },
      renderComponent: true,
    }
  },
  watch: {
    visible: function (newValue, oldValue) {
      if (newValue) {
        this.dialogVisible = newValue
      }
    },
    data: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.renderComponent = false

        this.$nextTick(() => {
          // 在 DOM 中添加 my-component 组件
          this.renderComponent = true
        })
      }
    },
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
      this.$emit('closeDilog', false)
    },
    getOnlinequestions() {
      onlinequestions(this.data).then((res) => {
        const { que_ids } = res.data
        this.studiesParams.que_ids = que_ids
      })
    },
    // 获取子组件内容
    getContentId(data) {
      if (data.contentId.length === 0)
        return this.$message.warning('请选择题目！')
      this.studiesParams.que_ids = data.contentId
      this.studiesParams.online_id = this.data.id
      console.log(this.studiesParams)
      onlineAddQuestions(this.studiesParams).then((res) => {
        console.log(res)
        this.$message.success(res.msg)
        this.handleClose()
      })
    },
  },
}
</script>

<style lang="scss">
.public-dialog {
  .el-dialog__body {
    padding: 0;
    max-height: calc(80vh - 40px);
    overflow: scroll;
  }
}
</style>