<template>
  <div class="addClassroom_main">
    <Breadcrumb :navData="navData" />

    <div class="addClassroom_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <el-form
              ref="classFormRef"
              :model="classForm"
              :rules="classFormRules"
              label-position="top"
            >
              <el-form-item label="班级名称" prop="className">
                <el-input
                  clearable
                  placeholder="例：三年四班"
                  v-model="classForm.className"
                  class="set_w"
                />
              </el-form-item>
              <el-form-item label="班级学习宣言">
                <el-input
                  clearable
                  placeholder="例：好好学习 天天向上"
                  v-model="classForm.classDeclaration"
                  class="set_w"
                />
              </el-form-item>
              <el-form-item label="班级类型" prop="classType">
                <el-select
                  clearable
                  v-model="classForm.classType"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in classTypeList"
                    :key="index"
                    :label="item"
                    :value="index"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="班级邀请码">
                <el-input
                  disabled
                  v-model="classForm.classInviteCode"
                  class="set_w"
                />
                <el-tooltip
                  class="change_inviteCode"
                  effect="dark"
                  content="是否更新班级邀请码？"
                  placement="top-start"
                  v-if="classId"
                >
                  <el-checkbox v-model="changeInviteCodeChecked" @change="changeInviteCode" />
                </el-tooltip>
              </el-form-item>
              <el-form-item label="状态">
                <el-radio-group v-model="classForm.status">
                  <el-radio :label="1">显示</el-radio>
                  <el-radio :label="2">隐藏</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="!tip && !classId">
                <div>
                  <el-button @click="onSubmit" class="cn_btn">
                    立即发布
                  </el-button>
                  <el-button @click="cancel">取消</el-button>
                </div>
              </el-form-item>
              <el-form-item v-if="tip">
                <div>
                  <el-button @click="onSubmit('reload')" class="cn_btn">
                    创建并绑定班级
                  </el-button>
                  <el-button @click="cancel">取消</el-button>
                </div>
              </el-form-item>
              <el-form-item v-if="classId">
                <div>
                  <el-button @click="saveEditClassRoom('save')" class="cn_btn">
                    保存修改
                  </el-button>
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
import Breadcrumb from '@/components/breadcrumb.vue'
import {
  classCode,
  classSubject,
  addClassroom,
  classEditInfo,
  editClassRoom,
} from '@/api/classManage'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        childTitle: '创建班级',
        goTo: '返回列表',
      },
      classForm: {
        className: '',
        classDeclaration: '',
        classType: '',
        classInviteCode: '',
        status: 1,
      },
      classTypeList: [],
      classFormRules: {
        className: [
          { required: true, message: '请输入班级名称', trigger: 'blur' },
        ],
        classType: [
          { required: true, message: '请选择班级类型', trigger: 'blur' },
        ],
      },
      changeInviteCodeChecked: false,
      classInviteCode: ''
    }
  },
  created() {
    this.getClassInviteCode()
    this.getClassType()
    if (this.classId) {
      this.navData.childTitle = '修改班级信息'
      this.$nextTick(() => {
        this.getClassRoomInfo()
      })
    }
  },
  computed: {
    tip: function () {
      return this.$route.query.tip
    },
    classId: function () {
      return this.$route.query.class_id
    },
  },
  methods: {
    // 获取班级邀请码
    async getClassInviteCode() {
      classCode().then((res) => {
        const { classInviteCode } = res.data
        this.classForm.classInviteCode = classInviteCode
      })
    },
    // 获取班级类型
    async getClassType() {
      classSubject().then((res) => {
        const { periodArr } = res.data
        this.classTypeList = Object.values(periodArr)
      })
    },
    // 创建班级
    onSubmit(data) {
      this.$refs.classFormRef.validate(async (valid) => {
        if (!valid) return
        await addClassroom(this.classForm).then((res) => {
          this.$message.success('班级创建成功!')
          this.getclassInviteCode()
          if (data === 'reload') {
            location.reload()
            this.$router.push('/home')
          }
        })
      })
    },
    // 获取修改的班级信息
    async getClassRoomInfo() {
      if (this.classId) {
        const id = parseFloat(this.classId)
        classEditInfo(id).then((res) => {
          const { classroom } = res.data
          this.classForm = classroom
          this.classInviteCode = classroom.classInviteCode
        })
      }
    },
    changeInviteCode() {
      const code = this.changeInviteCodeChecked
      if(code) {
        this.getClassInviteCode()
      } else {
        this.classForm.classInviteCode = this.classInviteCode
      }
    },
    // 修改班级
    saveEditClassRoom() {
      this.$refs.classFormRef.validate(async (valid) => {
        if (!valid) return
        const id = parseFloat(this.classId)
        editClassRoom(id, this.classForm).then((res) => {
          this.$message.success(res.msg)
        })
      })
    },
    cancel() {
      this.classForm.classDeclaration = ''
      this.$refs.classFormRef.resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.goBack {
  color: #fff;
  font-size: 18px;
}
.goBack:hover {
  color: #fff;
}
.change_inviteCode {
  margin-left: 10px;
}
.el-select {
  width: 30%;
}
</style>
