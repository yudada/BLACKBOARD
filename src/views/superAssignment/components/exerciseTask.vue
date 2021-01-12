<template>
  <div class="exe-task">
    <div v-for="(item, index) in data" :key="item.id">
      <div class="title-exe">
        <span>{{ index + 1 }}. </span>
        <span> ({{ queTypeList[item.queType].title }})</span>
        <span> {{ item.queTitle }} </span>
      </div>
      <div v-if="item.queType === 1" class="content-exe">
        <el-radio-group v-model="answerList[index].answer">
          <el-radio label="T">正确</el-radio>
          <el-radio label="F">错误</el-radio>
        </el-radio-group>
        <div v-if="answerList[index].isShow">
          <span v-if="item.queAnswer === 'T'">参考答案： 正确</span>
          <span v-else-if="item.queAnswer === 'F'">参考答案： 错误</span>
          <span v-else-if="item.queAnswer">
            参考答案： {{ item.queAnswer }}
          </span>
          <span v-else>暂无参考答案</span>
        </div>
        <div v-if="!answerList[index].isShow">
          <el-button type="text" @click="showAnswer(index)">显示答案</el-button>
        </div>
      </div>
      <div v-if="item.queType === 2" class="content-exe">
        <el-radio-group v-model="answerList[index].answer">
          <el-radio
            v-for="(childItem, index) in item.queOptions"
            :key="index"
            :label="index"
          >
            <span>{{ index }} {{ childItem }}</span>
          </el-radio>
        </el-radio-group>
        <span v-if="answerList[index].isShow">
          参考答案： {{ item.queAnswer }}
        </span>
        <el-button v-else type="text" @click="showAnswer(index)">
          显示答案
        </el-button>
      </div>
      <div v-if="item.queType === 3" class="content-exe">
        <el-checkbox-group v-model="answerList[index].checkboxT">
          <el-checkbox
            v-for="(childItem, index) in item.queOptions"
            :key="index"
            :label="index"
            shape="square"
          >
            <span>{{ index }} {{ childItem }}</span>
          </el-checkbox>
        </el-checkbox-group>
        <span v-if="answerList[index].isShow">
          参考答案： {{ item.queAnswer }}
        </span>
        <el-button v-else type="text" @click="showAnswer(index)">
          显示答案
        </el-button>
      </div>
      <div v-if="item.queType === 4" class="content-exe">
        <el-input v-model="answerList[index].answer"></el-input>
        <br /><span v-if="answerList[index].isShow">
          参考答案： {{ item.queAnswer }}
        </span>
        <el-button v-else type="text" @click="showAnswer(index)">
          显示答案
        </el-button>
      </div>
      <div v-if="item.queType === 5" class="content-exe">
        <el-input
          type="textarea"
          :rows="5"
          v-model="answerList[index].answer"
        ></el-input>
        <br /><span v-if="answerList[index].isShow">
          参考答案： {{ item.queAnswer }}
        </span>
        <el-button v-else type="text" @click="showAnswer(index)">
          显示答案
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      queTypeList: [
        { value: 0, title: '？？？' },
        { value: 1, title: '判断题' },
        { value: 2, title: '单选题' },
        { value: 3, title: '多选题' },
        { value: 4, title: '填空题' },
        { value: 5, title: '主观题' },
      ],
      answerList: [],
    }
  },
  created() {
    this.initData()
    this.initQueAnswer()
  },
  methods: {
    initData() {
      const answerList = []
      for (let i = 0; i < this.data.length; i++) {
        const queAnswer = {
          answer: '',
          checkboxT: [],
          isShow: false,
        }
        answerList.push(queAnswer)
      }
      this.answerList = answerList
    },
    initQueAnswer() {
      this.data.map((item) => {
        if (item.queAnswer) {
          item.queAnswer = decodeURIComponent(
            window.escape(atob(item.queAnswer))
          )
        }
      })
    },
    showAnswer(index) {
      this.answerList[index].isShow = true
    },
  },
}
</script>

<style lang="scss" scoped>
.exe-task {
  .title-exe {
    margin: 10px 0;
    span {
      font-size: large;
      color: #636262;
    }
    span:nth-child(2) {
      opacity: 0.7;
    }
  }
  .content-exe {
    span {
      color: #636262;
      margin: 10px 0;
      line-height: 40px;
    }
  }
  .el-radio-group,
  .el-checkbox-group {
    font-size: 0;
    display: flex;
    flex-direction: column;
  }
  .el-checkbox,
  .el-radio {
    font-size: large;
  }
  .el-input,
  .el-textarea {
    width: 50%;
  }
}
</style>