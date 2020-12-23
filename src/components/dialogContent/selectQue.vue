<template>
  <div>
    <el-form
      ref="queTypeFormRef"
      :model="queTypeForm"
      :rules="queTypeFormRules"
      label-position="top"
      class="que_form"
    >
      <el-form-item label="判断题" prop="judge">
        <el-select filterable clearable v-model="queTypeForm.judge.num" placeholder="请选择判断题数量">
          <el-option
            v-for="item in 100"
            :key="item"
            :label="item + '题'"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-select filterable clearable v-model="queTypeForm.judge.score" placeholder="请单题分数">
          <el-option
            v-for="item in 50"
            :key="item"
            :label="item + '分'"
            :value="item"
            
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单选" prop="radio">
        <el-select filterable clearable v-model="queTypeForm.radio.num" placeholder="请选择单选题数量">
          <el-option
            v-for="item in 100"
            :key="item"
            :label="item + '题'"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-select filterable clearable v-model="queTypeForm.radio.score" placeholder="请单题分数">
          <el-option
            v-for="item in 100"
            :key="item"
            :label="item + '分'"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="多选题" prop="checkbox">
        <el-select filterable clearable v-model="queTypeForm.checkbox.num" placeholder="请选择多选题数量">
          <el-option
            v-for="item in 100"
            :key="item"
            :label="item + '题'"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-select filterable clearable v-model="queTypeForm.checkbox.score" placeholder="请单题分数">
          <el-option
            v-for="item in 50"
            :key="item"
            :label="item + '分'"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="填空题" prop="fill">
        <el-select filterable clearable v-model="queTypeForm.fill.num" placeholder="请选择填空题数量">
          <el-option
            v-for="item in 100"
            :key="item"
            :label="item + '题'"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-select filterable clearable v-model="queTypeForm.fill.num" placeholder="请单题分数">
          <el-option
            v-for="item in 50"
            :key="item"
            :label="item + '分'"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主观题" prop="subjectivity">
        <el-select filterable clearable v-model="queTypeForm.subjectivity.num" placeholder="请选择主观题数量">
          <el-option
            v-for="item in 100"
            :key="item"
            :label="item + '题'"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-select filterable clearable v-model="queTypeForm.subjectivity.num" placeholder="请单题分数">
          <el-option
            v-for="item in 50"
            :key="item"
            :label="item + '分'"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span class="footer">
      <el-button type="primary" @click="sendMsgToF">确 定</el-button>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queTypeForm: {
        judge: {
          num: '',
          score: ''
        },
        radio: {
          num: '',
          score: ''
        },
        checkbox: {
          num: '',
          score: ''
        },
        fill: {
          num: '',
          score: ''
        },
        subjectivity: {
          num: '',
          score: ''
        }
      },
      queTypeFormRules: {}
    }
  },
  methods: {
    sendMsgToF() {
      console.log(this.queTypeForm)
      this.$emit('func', this.queTypeForm)
      this.queTypeForm =  {
        judge: {
          num: '',
          score: ''
        },
        radio: {
          num: '',
          score: ''
        },
        checkbox: {
          num: '',
          score: ''
        },
        fill: {
          num: '',
          score: ''
        },
        subjectivity: {
          num: '',
          score: ''
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: flex-end;
}
.que_form {
  display: flex;
  justify-content: center;
  .el-select  {
    margin: 20px;
  }
}
</style>