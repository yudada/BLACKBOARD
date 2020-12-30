<template>
  <div class="usersList_main">
    <Breadcrumb :navData="navData" />

    <div class="usersList_concent">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card :body-style="{ padding: 0 }">
            <div slot="header" class="header_text">
              <span>班主任</span>
            </div>
            <div class="adviser_card">
              <img
                v-if="adviserInfo.photo"
                :src="adviserInfo.photo"
                :onerror="defaultPic"
              />
              <img
                v-else-if="adviserInfo.sex === '男'"
                src="@/assets/images/male.png"
              />
              <img
                v-else-if="adviserInfo.sex === '女'"
                src="@/assets/images/female.jpg"
              />
              <img v-else-if="!adviserInfo.sex" src="@/assets/images/def.png" />
              <div class="adviser_info">
                <h3>{{ adviserInfo.realName }} 老师</h3>
                <div class="info_text">
                  <p>
                    地址 : <span>{{ adviserInfo.address }}</span>
                  </p>
                  <p>
                    联系电话 : <span>{{ adviserInfo.mobile }}</span>
                  </p>
                </div>
              </div>
            </div>
          </el-card>

          <el-card>
            <div slot="header">
              <span>学科老师</span>
            </div>
            <div v-if="teacherList.length > 0">
              <div
                v-for="(teacher, index) in teacherList"
                :key="index"
                class="teacher_card item"
              >
                <div class="teacher_info">
                  <img
                    v-if="teacher.photo"
                    :src="teacher.photo"
                    :onerror="defaultPic"
                  />
                  <img
                    v-else-if="teacher.sex === '男'"
                    src="@/assets/images/male.png"
                  />
                  <img
                    v-else-if="teacher.sex === '女'"
                    src="@/assets/images/female.jpg"
                  />
                  <img v-else-if="!teacher.sex" src="@/assets/images/def.png" />
                  <div class="info_text">
                    <span>{{ teacher.teaName }}</span>
                    <span>{{ teacher.teaSubject }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <span>暂无老师</span>
            </div>
          </el-card>
        </el-col>

        <el-col :span="18">
          <student-list v-if="classInfo.class_id" :classInfo="classInfo" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { uesrInfo, nowClassInfo } from '@/api/classManage'
import StudentList from './components/studentList'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { StudentList, Breadcrumb },
  data() {
    return {
      navData: {
        title: '班级管理',
        childTitle: '学生列表',
      },
      adviserInfo: {
        realName: '',
        address: '',
        mobile: '',
      },
      classInfo: {},
      teacherList: [],
      defaultPic: 'this.src="' + require('@/assets/def_avater.jpg') + '"',
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      uesrInfo().then((res) => {
        const { userDefaultClass_id } = res.data.user
        this.getClassInfo(userDefaultClass_id)
      })
    },
    // 获取班级信息
    getClassInfo(id) {
      nowClassInfo(id).then((res) => {
        const { classroom, headmaster, teacher } = res.data
        this.adviserInfo = headmaster.teacher_info
        this.classInfo = classroom
        this.teacherList = teacher
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 1rem;
}
.header_text {
  text-align: center;
  color: #6b3e9e !important;
  font-size: x-large;
  font-weight: 600;
}
.adviser_card {
  text-align: center;
  padding: 20px;
  background: linear-gradient(to left, #9853af, #623aa2);
  img {
    width: 120px;
    height: 120px;
    border-radius: 100%;
  }
  .adviser_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      color: #fff;
    }
    .info_text {
      color: #fff;
      font-size: 1rem;
      span {
        color: #fff;
        font-size: 14px;
        opacity: 0.5;
      }
    }
  }
  i {
    color: #636262;
  }
}
.teacher_card {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  .teacher_info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    img {
      width: 3rem;
      border-radius: 100%;
    }
    .info_text {
      display: flex;
      flex-direction: column;
      padding-left: 1rem;
      span:nth-child(1) {
        color: #636262;
        font-size: 1rem;
      }
      span:nth-child(2) {
        color: #afacac;
        font-size: 0.75rem;
      }
    }
  }
}
@media (max-width: 768px) {
  .el-col-6,
  .el-col-18 {
    width: 100%;
  }
}
</style>