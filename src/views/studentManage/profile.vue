<template>
  <div class="profile_main">
    <div class="main_header">
      <h4>学生资料</h4>
      <el-button type="text" @click="backList" class="back_btn"
        >返回列表 /</el-button
      >
    </div>
    <div class="profile_concent">
      <el-row :gutter="20" class="mobile_card">
        <el-col :span="5" class="set_width">
          <el-card class="box-card" :body-style="{ padding: 0 }">
            <div slot="header" class="clearfix">
              <span>联系方式</span>
            </div>
            <div class="student_img">
              <img
                v-if="studentInfo.photo"
                :src="studentInfo.photo"
                :onerror="defaultPic"
              />
              <img v-else src="../../assets/def_avater.jpg" alt="" />
              <span>{{ studentInfo.stuName }}</span>
              <el-rate v-model="value1" disabled></el-rate>
              <span v-if="studentInfo.birthday"
                >生日： {{ studentInfo.birthday }}</span
              >
              <span v-else>生日： 暂无信息</span>
            </div>
            <div class="student_detail">
              <div class="detial_box">
                <div >
                  <i class="el-icon-edit"></i>
                  <span> 答题次数： {{ studentInfo.answer_nums }}</span>
                </div>
                <div >
                  <i class="el-icon-reading"></i>
                  <span> 阅读次数: {{ studentInfo.reading_nums }}</span>
                </div>
                <div >
                  <i class="el-icon-copy-document"></i>
                  <span> 浏览模型次数： {{ studentInfo.models_nums }}</span>
                </div>
              </div>
              <div class="msg_btn">
                <el-button type="info" icon="el-icon-chat-square"
                  >发送信息</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="19">
          <student-detail :studentInfo="studentInfo" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { detailStudent } from '@/api/studentManage'
import StudentDetail from './components/studentDetail.vue'
export default {
  components: { StudentDetail },
  data() {
    return {
      value1: 5,
      birthday: '2000-12-01',
      defaultPic: 'this.src="' + require('@/assets/def_avater.jpg') + '"',
      studentInfo: {
        userName: '',
        userPassword: '',
        userMobile: '',
        stuName: '',
        sex: '',
        email: '',
        address: '',
        hobby: '',
        qq: '',
        parentsInfo: [
          { realName: '', mobile: '', relation: 0, relationName: '' },
        ],
      },
    }
  },
  created() {
    this.getStudentDetail()
  },
  computed: {
    sid: function () {
      return this.$route.query.sid
    },
  },
  methods: {
    backList() {
      this.$router.push('/crypto-currencies')
    },
    getStudentDetail() {
      detailStudent(this.sid).then((res) => {
        const { data } = res
        this.studentInfo = data
        if (data.parentsInfo.length < 2) {
          this.setParentsData()
        }
      })
    },
    setParentsData() {
      const parentsNum =  2 - (this.studentInfo.parentsInfo.length)
      for(let i = 0;i<parentsNum;i++) {
        const parentsObj = {
          relation: '',
          realName: '',
          mobile: ''
        }
        this.studentInfo.parentsInfo.push(parentsObj)
      }
      console.log(this.studentInfo);
    },
  },
}
</script>

<style lang="scss" scoped>
.student_img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(to left, #9853af, #623aa2);
  img {
    width: 50%;
    border: 5px solid rgba(167, 180, 201, 0.2);
    border-radius: 50%;
    font-size: 10px;
  }
  span {
    color: #fff;
    margin: 0.5em 0;
  }
  span:nth-child(4) {
    color: #fff;
    margin: 0.5em 0;
    opacity: 0.5;
  }
}
.student_detail {
  .detial_box {
    padding: 1rem;
    div {
      padding: 5px;
      span, i {
        color: #636262;
      }
    }
  }
  .msg_btn {
    display: flex;
    justify-content: center;
    padding: 0.75rem;
    button {
      width: 100%;
      font-size: 16px;
    }
  }
}
.back_btn:hover,
.back_btn {
  color: #fff;
  font-size: large;
}
@media (max-width: 768px) {
  .set_width {
    width: 50% !important;
    margin-bottom: 1rem;
  }
  .mobile_card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 375px) {
  .set_width {
    width: 100% !important;
  }
}
</style>
