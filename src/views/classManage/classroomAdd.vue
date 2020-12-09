<template>
  <div class="addClassroom_main">
    <div class="main_header">
      <h4>创建班级</h4>
        <el-button type="text" @click="goBackList" class="goBack">返回列表</el-button>
    </div>

    <div class="addClassroom_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <el-form ref="classFormRef" :model="classForm" :rules="classFormRules" label-position="top">
              <el-form-item label="班级名称" prop="className">
                <el-input clearable placeholder="例：三年四班" v-model="classForm.className" class="set_w"></el-input>
              </el-form-item>
              <el-form-item label="班级学习宣言">
                <el-input clearable placeholder="例：好好学习 天天向上" v-model="classForm.classDeclaration" class="set_w"></el-input>
              </el-form-item>
              <el-form-item label="班级类型" prop="classType">
                <el-select clearable v-model="classForm.classType" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in classTypeList"
                    :key="index"
                    :label="item"
                    :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="班级邀请码">
                <el-input disabled v-model="classForm.classInviteCode" class="set_w"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-radio-group v-model="classForm.status">
                  <el-radio :label="1">显示</el-radio>
                  <el-radio :label="2">隐藏</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="!tip">
                <div>
                  <el-button @click="onSubmit" class="cn_btn">立即发布</el-button>
                  <el-button @click="cancel">取消</el-button>
                </div>
              </el-form-item>
              <el-form-item v-else>
                <div>
                  <el-button @click="bindingClassRoom" class="cn_btn">创建并绑定班级</el-button>
                  <el-button @click="cancel">取消</el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classForm: {
        className: '',
        classDeclaration: '',
        classType: '',
        classInviteCode: '',
        status: 1
      },
      classTypeList: [],
      classFormRules: {
        className: [
          { required: true, message: '请输入班级名称', trigger: 'blur' }
        ],
        classType: [
          { required: true, message: '请选择班级类型', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getclassInviteCode();
    this.getClassType();
  },
  computed: {
    tip: function() {
      return this.$route.query.tip;
    }
  },
  methods: {
    // 获取班级邀请码
    async getclassInviteCode() {
      const { data: res } = await this.$http.post('api/classroom/create')
      if (res.statusCode !== 200) return this.$message.error('获取邀请码失败！')
      this.classForm.classInviteCode = res.data.classInviteCode;
    },
    // 获取班级类型
    async getClassType() {
      const { data: res } = await this.$http.get(`api/common/constant`)
      if(res.statusCode !== 200) return this.$message.error(res.msg)
      const {periodArr} =res.data;
      this.classTypeList = Object.values(periodArr)
    },
    // 创建班级
    onSubmit() {
      this.$refs.classFormRef.validate(async valid => {
        if (!valid) return
        console.log(this.classForm);
        const { data: res } = await this.$http.post('api/classroom/store', this.classForm)
        if(res.statusCode !== 200) return this.$message.error('创建失败!');
        this.$message.success('班级创建成功!')

        this.cancel();
        this.getclassInviteCode();
      })
    },
    cancel() {
      this.$refs.classFormRef.resetFields();
    },
    goBackList() {
      this.$router.go(-1)
    },
    // 首次创建并绑定
    async bindingClassRoom() {
      await this.onSubmit();
      this.$router.push('/home')
    }
  },
}
</script>

<style lang="scss" scoped>
  .goBack{
    color: #fff;
    font-size: 18px;
  }
  .goBack:hover {
    color: #fff;
  }
</style>
