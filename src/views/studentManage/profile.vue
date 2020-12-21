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
              <img src="../../assets/images/faces/male/4.jpeg" alt="" />
              <span>名字</span>
              <el-rate v-model="value1" disabled>本周</el-rate>
              <span>生日： {{ birthday }}</span>
            </div>
            <div class="student_detail">
              <div class="detial_box">
                <div v-for="(item,index) in studentDetail" :key="index">
                  <i class="el-icon-delete"></i>
                  <span>{{ item.title }}： {{ item.data }}</span>
                </div>
              </div>
              <div class="msg_btn">
                <el-button type="warning" icon="el-icon-chat-square"
                  >发送信息</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="19">
          <student-detail />
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
      studentDetail: [
        { title: '读书笔记', data: '456条', icon: 'el-icon-edit' },
        { title: '阅读时长', data: '123分钟', icon: 'el-icon-reading' },
        { title: '练习题型', data: '5套', icon: 'el-icon-copy-document' },
      ],
      studentInfo: {
        userName:'',
        userMobile: '',
        stuName:'',
        sex:'',
        email: '',
        address: '',
        hobby: '',
        qq: '',
        parents: [
          {realName: '', mobile: '', relation: 0, relationName: ''}
        ]
      }
    }
  },
  created() {
    this.getStudentDetail()
  },
  computed: {
    sid: function() {
      return this.$route.query.sid
    }
  },
  methods: {
    backList() {
      this.$router.push('/crypto-currencies')
    },
    getStudentDetail() {
      detailStudent(this.sid).then(res => {
        const {data} = res;
        console.log(data);
      })
    }
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
}
.student_detail {
  .detial_box {
    padding: 1.5rem;
    div {
      padding: 5px;
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
