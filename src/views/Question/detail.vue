<template>
  <div class="detial_main">
    <Breadcrumb :navData="navData" />

    <div class="detial_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <el-form ref="questionListRef" label-width="80px" label-position="left">
              <el-form-item label="练习对象">
                <span><strong>{{questionList.quePracticeSubject}}</strong></span>
              </el-form-item>
              <el-form-item label="题纲">
                <div v-if="questionList.queSubjectType === 1">
                  <span><strong>练习题</strong></span>
                </div>
                <div v-if="questionList.queSubjectType === 2">
                  <span><strong>自检题</strong></span>
                </div>
                <div v-if="questionList.queSubjectType === 3">
                  <span><strong>历年考题</strong></span>
                </div>
              </el-form-item>
              <el-form-item label="题型">
                <div v-if="questionList.queType === 1">
                  <span><strong>判断</strong></span>
                </div>
                <div v-if="questionList.queType === 2">
                  <span><strong>单选</strong></span>
                </div>
                <div v-if="questionList.queType === 3">
                  <span><strong>多选</strong></span>
                </div>
                <div v-if="questionList.queType === 4">
                  <span><strong>填空</strong></span>
                </div>
                <div v-if="questionList.queType === 5">
                  <span><strong>主观</strong></span>
                </div>
              </el-form-item>
              <el-form-item label="知识点">
                <span><strong>{{questionList.queKnowledge}}</strong></span>
              </el-form-item>
              <el-form-item label="解题思路">
                <span><strong>{{questionList.queSolving}}</strong></span>
              </el-form-item>
              <el-form-item label="题目">
                <span><strong>{{questionList.queTitle}}</strong></span>
              </el-form-item>
              <el-form-item label="选项" v-show="questionList.queType !== 1">
                <div v-for="(item, index) in queOptions" :key="index">
                    <span><strong>{{ item[0] }} : {{item[1]}}</strong></span>
                </div>
              </el-form-item>
              <el-form-item label="答案">
                <span><strong>{{queAnswer}}</strong></span>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        childTitle: '题库详情',
        goTo: '返回列表'
      },
      questionList: {},
      queOptions:[],
      queAnswer: ''
    };
  },
  created() {
      this.getdetail();
  },
  methods: {
    async getdetail() {
      const { data: res } = await this.$http.get(`api/library/${this.id}`);
      if (res.statusCode !== 200) return this.$message.error('获取详细信息失败！')
      this.questionList = res.data;
      this.queOptions = Object.entries(res.data.queOptions);
      this.queAnswer = decodeURIComponent(window.escape(atob(res.data.queAnswer)));
    },
  },
  computed: {
    id: function () {
      return this.$route.query.id;
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
}

@media (max-width: 375px) {
}
</style>
