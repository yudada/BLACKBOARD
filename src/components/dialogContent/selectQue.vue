<template>
  <div>
    <el-form
      label-position="top"
      class="que_form"
    >
      <el-form-item v-for="(item,index) in queTypeForm" :label="item.type" :key="index">
        <el-select filterable clearable v-model="queTypeForm[index].num" :placeholder="'请选择'+ item.type + '数量'">
          <el-option
            v-for="item2 in 100"
            :key="item2"
            :label="'共'+ item2 + '题'"
            :value="item2"
          >
          </el-option>
        </el-select>
        <el-select filterable clearable v-model="queTypeForm[index].score" placeholder="请单道题分数">
          <el-option
            v-for="item2 in 50"
            :key="item2"
            :label="'每道题 ' + item2 + ' 分'"
            :value="item2"
            
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span class="footer">
      <el-button type="primary" class="cn_btn" @click="sendMsgToF">确 定</el-button>
    </span>
  </div>
</template>

<script>
export default {
  props: ['queType'],
  data() {
    return {
      queTypeFormRules: {},
      queTypeForm: [
        { num: '', score: '', type: '判断题'},
        { num: '', score: '', type: '单选题'},
        { num: '', score: '', type: '多选题'},
        { num: '', score: '', type: '填空题'},
        { num: '', score: '', type: '主观题'}
      ]
    }
  },
  created() {
    if(this.queType.length) {
      this.queTypeForm = this.queType;
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
  .el-select  {
    margin: 20px;
  }
}
</style>