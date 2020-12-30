<template>
  <div style="padding: 20px">
    <el-row :gutter="20" v-if="!selectLimit">
      <el-col :span="6">
        <el-input placeholder="题目搜索" v-model="queTitle">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getExerciseList"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="queType"
          placeholder="题型筛选"
          @change="getExerciseList"
          clearable
        >
          <el-option
            v-for="item in queTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="quePracticeSubject"
          placeholder="练习对象筛选"
          @change="getExerciseList"
          clearable
        >
          <el-option
            v-for="(item, index) in quePracticeSubjectList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="exerciseList"
      style="width: 100%"
      v-loading="loading"
      @select="handleSelect"
      @select-all="handleSelectAll"
      :row-key="(row) => row.id"
    >
      <el-table-column
        type="selection"
        label="全选"
        :reserve-selection="true"
        width="55"
      />
      <el-table-column prop="queTitle" label="题目" width="300" />
      <el-table-column label="题纲">
        <template slot-scope="scope">
          <span v-if="scope.row.queSubjectType === 1">练习题</span>
          <span v-if="scope.row.queSubjectType === 2">自检题</span>
          <span v-if="scope.row.queSubjectType === 3">历年考题</span>
        </template>
      </el-table-column>
      <el-table-column prop="queType" label="题型">
        <template slot-scope="scope">
          <span v-if="scope.row.queType === 1">判断</span>
          <span v-if="scope.row.queType === 2">单选</span>
          <span v-if="scope.row.queType === 3">多选</span>
          <span v-if="scope.row.queType === 4">填空</span>
          <span v-if="scope.row.queType === 5">主观</span>
        </template>
      </el-table-column>
      <el-table-column prop="quePracticeSubject" label="练题对象" />
      <el-table-column prop="queKnowledge" label="知识点" />
    </el-table>
    <el-pagination
      :hide-on-single-page="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 40, 100, 9999]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <span class="footer" v-show="!hidenBtn">
      <el-button type="primary" @click="sendContentID">确 定</el-button>
    </span>
  </div>
</template>
<script>
export default {
  props: ['hidenBtn', 'queId', 'selectLimit'],
  data() {
    return {
      // 分页
      currentPage: 1,
      pageSize: 20,
      total: 0,
      //
      sendMsg: {
        contentId: [],
        type: '',
        contentDialogVisible: false,
      },
      exerciseList: [],
      loading: true,
      queTitle: '',
      queType: '',
      queTypeList: [
        { value: 1, label: '判断' },
        { value: 2, label: '单选' },
        { value: 3, label: '多选' },
        { value: 4, label: '填空' },
        { value: 5, label: '主观' },
      ],
      quePracticeSubject: '',
      quePracticeSubjectList: [],
      handlcSelect: []
    }
  },
  created() {
    this.getQuePracticeSubjec();
    if(this.queId && this.queId.length) {
       this.handlcSelect = this.queId.map(item=>parseFloat(item));
    }
    if(this.selectLimit) {
      this.queType = this.selectLimit.type
      this.getExerciseList()
    } else {
      this.getExerciseList()
    }
  },
  watch: {
    'selectLimit.type': function(newData, oldData) {
      this.queType = newData
      this.getExerciseList()
    },
    'selectLimit.select': function(newData, oldData) {
      this.handlcSelect = newData
      this.loading = true
      this.getExerciseList()
    }
  },
  methods: {
    handleSizeChange(val) {
      this.handlcSelect = this.sendMsg.contentId 
      this.pageSize = val
      this.getExerciseList()
    },
    handleCurrentChange(val) {
      this.handlcSelect = this.sendMsg.contentId
      this.currentPage = val
      this.getExerciseList()
    },
    // 练习对象列表
    async getQuePracticeSubjec() {
      const { data: res } = await this.$http.get(`api/common/constant`)
      const { periodArr } = res.data
      this.quePracticeSubjectList = Object.values(periodArr)
    },
    // 获取题库列表
    async getExerciseList() {
      const { data: res } = await this.$http.get(`api/library/lists`, {
        params: {
          limit: this.pageSize,
          page: this.currentPage,
          queTitle: this.queTitle,
          queType: this.queType,
          quePracticeSubject: this.quePracticeSubject,
        },
      })
      if (res.statusCode !== 200) return this.$message.error(res.msg)
      this.exerciseList = res.data.data

      this.total = res.data.total
      this.pageSize = res.data.per_page
      this.currentPage = res.data.current_page
      this.loading = false
      this.$nextTick(() => {
        this.setChecked()
      })

    },
    // 发送内容
    sendContentID() {
      if(this.selectLimit) {
        const maxQue = this.selectLimit.num
        const selectNum = this.sendMsg.contentId.length
        this.sendMsg.type = this.selectLimit.type
        if(selectNum !== maxQue) return this.$message.error('设置'+maxQue+'题，已选'+selectNum+'题，请保持一致！')
      }
      this.$emit('func', this.sendMsg)
    },
    setChecked() {
      let num = 0
      this.exerciseList.forEach((item) => {
        let obj = this.handlcSelect.find((ele) => {
          return ele === item.id
        })
        if (obj) {
          num++
          this.$refs.multipleTable.toggleRowSelection(item, true)
        }
      })
      console.log(num);
      if(num === 0) this.$refs.multipleTable.clearSelection()
    },
    handleSelect(selection, row) {
      this.sendMsg.contentId = selection.map(item=>item.id)
    },
    handleSelectAll(selection) {
      this.sendMsg.contentId = selection.map(item=>item.id)
    }
  },
}
</script>

<style lang="scss" scoped>
.el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  .el-checkbox {
    width: 20%;
    margin: 1rem;
    .checknox_content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.5rem;
      img {
        width: 100%;
      }
    }
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
}
</style>

<style lang="scss">
.check_list {
  .el-checkbox {
    .el-checkbox__input {
      position: absolute !important;
      right: 1px !important;
      top: 1px !important;
      .el-checkbox__inner {
        border: 2px solid #dcdfe6;
        border-radius: 50%;
        width: 20px;
        height: 20px;
      }
      .el-checkbox__inner::after {
        height: 12px;
        left: 6px;
        font-weight: 600;
      }
    }
  }
}
</style>