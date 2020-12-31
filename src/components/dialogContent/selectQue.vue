<template>
  <div>
    <el-form label-position="top" class="que_form">
      <el-form-item
        v-for="item in queTypeForm"
        :label="item.type"
        :key="item.type"
      >
        <template>
          <el-select
            filterable
            clearable
            v-model="item.num"
            :placeholder="'请选择' + item.type + '数量'"
          >
            <el-option
              v-for="(item2, index) in 100"
              :key="index"
              :label="'共' + item2 + '题'"
              :value="item2"
            />
          </el-select>
          <el-select
            filterable
            clearable
            v-model="item.score"
            placeholder="请单道题分数"
          >
            <el-option
              v-for="(item3, index) in 50"
              :key="index"
              :label="'每道题 ' + item3 + ' 分'"
              :value="item3"
            />
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <span class="footer">
      <el-button class="cn_btn" @click="sendMsgToF">确 定</el-button>
    </span>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: ['queType', 'parperId'],
  data() {
    return {
      queTypeFormRules: {},
      queTypeForm: [
        { num: '', score: '', type: '判断题', select: [] },
        { num: '', score: '', type: '单选题', select: [] },
        { num: '', score: '', type: '多选题', select: [] },
        { num: '', score: '', type: '填空题', select: [] },
        { num: '', score: '', type: '主观题', select: [] },
      ],
    }
  },
  created() {
    if (this.parperId) {
      this.queTypeForm = _.cloneDeep(this.queType)
    }
  },
  methods: {
    sendMsgToF() {
      this.$emit('func', this.queTypeForm)
    },
  },
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: flex-end;
  .cn_btn {
    width: 20%;
  }
}
.que_form {
  display: flex;
  justify-content: center;
  .el-select {
    margin: 20px;
  }
}
</style>