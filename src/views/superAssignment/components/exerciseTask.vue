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
        <div class="answer-main">
          <div
            style="cursor: pointer"
            v-if="answerList[index].isShow"
            @click="showAnswer(index)"
          >
            <span v-if="item.queAnswer === 'T'">参考答案： 正确</span>
            <span v-else-if="item.queAnswer === 'F'">参考答案： 错误</span>
            <span v-else-if="item.queAnswer">
              参考答案： {{ item.queAnswer }}
            </span>
            <span v-else>暂无参考答案</span>
          </div>
          <div v-if="!answerList[index].isShow">
            <el-button type="text" @click="showAnswer(index)">
              显示答案
            </el-button>
          </div>
          <div class="answer-num">
            <span>正确人数：</span
            ><span @click="checkPersonDetail(1)">{{ item.queRightNum }} </span>
            <span> 错误人数：</span
            ><span @click="checkPersonDetail(2)">{{ item.queWrongNum }} </span>
          </div>
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
        <div class="answer-main">
          <span
            style="cursor: pointer"
            v-if="answerList[index].isShow"
            @click="showAnswer(index)"
          >
            参考答案： {{ item.queAnswer }}
          </span>
          <el-button v-else type="text" @click="showAnswer(index)">
            显示答案
          </el-button>
          <div class="answer-num">
            <span>正确人数：</span
            ><span @click="checkPersonDetail(1)">{{ item.queRightNum }} </span>
            <span> 错误人数：</span
            ><span @click="checkPersonDetail(2)">{{ item.queWrongNum }} </span>
          </div>
        </div>
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
        <div class="answer-main">
          <span
            style="cursor: pointer"
            v-if="answerList[index].isShow"
            @click="showAnswer(index)"
          >
            参考答案： {{ item.queAnswer }}
          </span>
          <el-button v-else type="text" @click="showAnswer(index)">
            显示答案
          </el-button>
          <div class="answer-num">
            <span>正确人数：</span
            ><span @click="checkPersonDetail(1)">{{ item.queRightNum }} </span>
            <span> 错误人数：</span
            ><span @click="checkPersonDetail(2)">{{ item.queWrongNum }} </span>
          </div>
        </div>
      </div>
      <div v-if="item.queType === 4" class="content-exe">
        <el-input v-model="answerList[index].answer"></el-input>
        <br />
        <div class="answer-main">
          <span
            style="cursor: pointer"
            v-if="answerList[index].isShow"
            @click="showAnswer(index)"
          >
            参考答案： {{ item.queAnswer }}
          </span>
          <el-button v-else type="text" @click="showAnswer(index)">
            显示答案
          </el-button>
          <div class="answer-num">
            <span> 正确人数：</span
            ><span @click="checkPersonDetail(1)"> {{ item.queRightNum }} </span>
            <span> 错误人数：</span
            ><span @click="checkPersonDetail(2)">{{ item.queWrongNum }} </span>
          </div>
        </div>
      </div>
      <div v-if="item.queType === 5" class="content-exe">
        <el-input
          type="textarea"
          :rows="5"
          v-model="answerList[index].answer"
        />
        <br />
        <div class="answer-main">
          <span
            style="cursor: pointer"
            v-if="answerList[index].isShow"
            @click="showAnswer(index)"
          >
            参考答案： {{ item.queAnswer }}
          </span>
          <el-button v-else type="text" @click="showAnswer(index)">
            显示答案
          </el-button>
          <div class="answer-num">
            <span>正确人数：</span
            ><span @click="checkPersonDetail(1)">{{ item.queRightNum }} </span>
            <span> 错误人数：</span
            ><span @click="checkPersonDetail(2)">{{ item.queWrongNum }} </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 对错人数对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <el-table :data="answerPersonList" stripe style="width: 100%">
        <el-table-column prop="stuName" label="姓名" />
        <el-table-column prop="answerResult" label="结果">
          <template slot-scope="scope">
            <span v-if="scope.row.answerResult === 0">正确</span>
            <span v-if="scope.row.answerResult === 2">错误</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="答题时间" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { personDetail } from '@/api/superAssignment'
export default {
  props: ['data', 'id'],
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
      dialogVisible: false,
      answerPersonList: [],
      dialogTitle: ''
    }
  },
  created() {
    this.initData()
    this.initQueAnswer()
    console.log(this.data)
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
          try {
            item.queAnswer = decodeURIComponent(
              window.escape(atob(item.queAnswer))
            )
          } catch (e) {
            console.log('已解析')
          }
        }
      })
    },
    showAnswer(index) {
      this.answerList[index].isShow = !this.answerList[index].isShow
    },
    checkPersonDetail(num) {
      if(num === 1) this.dialogTitle = '答题正确学生'
      if(num === 2) this.dialogTitle = '答题错误学生'
      personDetail(this.id, num).then((res) => {
        console.log(res)
        const { data } = res
        this.answerPersonList = data
        this.dialogVisible = true
      })
    },
    handleClose() {
      this.dialogVisible = false
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
    .answer-main {
      display: flex;
      .answer-num {
        margin-left: 1rem;
        span {
          color: #636262;
          line-height: 40px;
          font-size: 14px;
          margin-right: 1px;
        }
        span:nth-child(2) {
          color: #67c23a;
          cursor: pointer;
        }
        span:nth-child(4) {
          color: #f56c6c;
          cursor: pointer;
        }
      }
    }
    span {
      color: #636262;
      line-height: 40px;
      font-size: 14px;
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
    cursor: pointer;
  }
  .el-table {
    max-height: 70vh;
    overflow: scroll;
  }
}
</style>