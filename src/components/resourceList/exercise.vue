<template>
  <div style="padding: 20px">
    <el-row :gutter="20" v-if="!selectLimit">
      <el-col :span="6">
        <el-input placeholder="题目搜索" v-model="queTitle">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getExerciseList"
          />
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
          />
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
          />
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-select
          v-model="selectQue"
          placeholder="已选题目"
          @change="handleQue"
          multiple
          collapse-tags
          class="handle-select"
        >
          <el-option
            v-for="item in selectQue"
            :key="item.id"
            :label="item.queTitle"
            :value="item"
          >
            <span class="que-select" v-if="item.queType === queTypeList.value">
              {{ queTypeList.label }}题 {{ item.queTitle }}
            </span>
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
      stripe
      border
    >
      <el-table-column
        type="selection"
        label="全选"
        :reserve-selection="true"
        width="50"
        align="center"
        v-if="!hidenBtn"
      />
      <el-table-column prop="queTitle" label="题目" min-width="55%" />
      <el-table-column label="题纲" min-width="15%">
        <template slot-scope="scope">
          <span v-if="scope.row.queSubjectType === 1">练习题</span>
          <span v-if="scope.row.queSubjectType === 2">自检题</span>
          <span v-if="scope.row.queSubjectType === 3">历年考题</span>
        </template>
      </el-table-column>
      <el-table-column prop="queType" label="题型" min-width="15%">
        <template slot-scope="scope">
          <span v-if="scope.row.queType === queTypeList.value">{{
            queTypeList.label
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="quePracticeSubject"
        label="练题对象"
        min-width="15%"
      />
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
      <el-button
        :class="classWork ? 'pb_btn' : 'cn_btn'"
        @click="sendContentID"
        >{{ btnText }}</el-button
      >
    </span>
  </div>
</template>

<script>
import { practiceSubject, ExerciseLists } from '@/api/components'
import _ from 'lodash'
export default {
  props: ['hidenBtn', 'queId', 'selectLimit', 'contentId', 'classWork'],
  data() {
    return {
      // 分页
      currentPage: 1,
      pageSize: 20,
      total: 0,
      sendMsg: {
        contentId: [],
        type: '',
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
      popQue: '',
      selectQue: [],
    }
  },
  created() {
    this.getQuePracticeSubject()
    if (this.queId && this.queId.length) {
    }
    if (this.selectLimit) {
      this.queType = this.selectLimit.type
      this.sendMsg.contentId = this.selectLimit.select
      this.getExerciseList()
    } else {
      this.getExerciseList()
    }
    if (this.contentId) {
      this.sendMsg.contentId = this.contentId
      this.getExerciseList()
    }
  },
  watch: {
    'selectLimit.type': function (newData, oldData) {
      this.queType = newData
      this.getExerciseList()
    },
    'selectLimit.select': function (newData, oldData) {
      this.sendMsg.contentId = newData
      this.$refs.multipleTable.clearSelection()
      this.loading = true
      this.getExerciseList()
    },
  },
  computed: {
    btnText: function () {
      return this.classWork ? '立即发布' : '确 定'
    },
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getExerciseList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getExerciseList()
    },
    // 练习对象列表
    async getQuePracticeSubject() {
      practiceSubject().then(res=>{
        const { periodArr } = res.data
        this.quePracticeSubjectList = Object.values(periodArr)
      })
    },
    // 获取题库列表
    async getExerciseList() {
      this.loading = true
      let params =  {
          limit: this.pageSize,
          page: this.currentPage,
          queTitle: this.queTitle,
          queType: this.queType,
          quePracticeSubject: this.quePracticeSubject,
        }
      ExerciseLists(params).then(res=>{
        console.log(res);
        const { current_page, data, per_page, total } = res.data
        this.exerciseList = data
        this.total = total
        this.pageSize = parseFloat(per_page)
        this.currentPage = current_page
        this.loading = false
        this.$nextTick(() => {
          this.setChecked()
        })
      })
    },
    // 发送内容
    sendContentID() {
      if (this.selectLimit) {
        const maxQue = this.selectLimit.num
        const selectNum = this.sendMsg.contentId.length
        this.sendMsg.type = this.selectLimit.type
        if (selectNum !== maxQue)
          return this.$message.error(
            '设置' + maxQue + '题，已选' + selectNum + '题，请保持一致！'
          )
      }
      this.$emit('func', this.sendMsg)
    },
    setChecked() {
      this.exerciseList.forEach((row) => {
        if (this.sendMsg.contentId.indexOf(row.id) >= 0) {
          this.$refs.multipleTable.toggleRowSelection(row, true)
        }
      })
    },
    handleSelect(selection) {
      this.selectQue = selection
      this.sendMsg.contentId = _.cloneDeep(selection.map((item) => item.id))
    },
    handleSelectAll(selection) {
      this.selectQue = selection
      this.sendMsg.contentId = selection.map((item) => item.id)
    },
    handleQue() {
      this.$refs.multipleTable.clearSelection()
      this.sendMsg.contentId = this.selectQue.map((item) => item.id)
      this.getExerciseList()
    },
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
.handle-select {
  width: 100%;
  .el-select__tags {
    overflow: hidden;
    .el-tag--info {
      max-width: 80%;
      overflow: hidden;
    }
  }
}
.que-select {
  float: left;
  width: 90%;
  overflow: hidden;
}
</style>