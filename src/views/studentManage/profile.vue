<template>
  <div class="profile_main">
    <div class="main_header">
      <h4>学生资料</h4>
      <el-button type="text" @click="backList" class="back_btn" >返回列表 /</el-button>
    </div>

    <div class="profile_concent">
      <el-row :gutter="20" class="mobile_card">
        <el-col :span="5" class="iapd_w">
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
                <div v-for="item in studentDetail" :key="item.id">
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
          <el-card>
            <div slot="header" class="clearfix">
              <span>基础信息</span>
            </div>
            <div class="student_info">
              <table class="table_wh">
                <tbody class="table_w">
                  <tr>
                    <td><strong>姓名 :</strong>{{ basiscInfo.name }}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>家庭址址 :</strong>
                      {{ basiscInfo.adderss }}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>兴趣爱好 :</strong>{{ basiscInfo.hobby }}</td>
                  </tr>
                </tbody>
                <tbody class="table_w">
                  <tr>
                    <td><strong>学生微博 :</strong>{{ basiscInfo.weibo }}</td>
                  </tr>
                  <tr>
                    <td><strong>学生邮箱 :</strong>{{ basiscInfo.email }}</td>
                  </tr>
                  <tr>
                    <td><strong>学生电话 :</strong>{{ basiscInfo.tel }}</td>
                  </tr>
                </tbody>
                <tbody class="table_w">
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <strong>家长姓名 :</strong>{{ basiscInfo.parents1 }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>联系电话 :</strong>{{ basiscInfo.parentTel1 }}
                    </td>
                  </tr>
                </tbody>
                <tbody class="table_w">
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <strong>家长姓名 :</strong>{{ basiscInfo.parents2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>联系电话 :</strong>{{ basiscInfo.parentTel2 }}
                    </td>
                  </tr>
                </tbody>
                <tbody class="table_w">
                  <tr>
                    <td>
                      <strong>家长姓名 :</strong>{{ basiscInfo.parents3 }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>联系电话 :</strong>{{ basiscInfo.parentTel3 }}
                    </td>
                  </tr>
                </tbody>
                <tbody class="table_w">
                  <tr>
                    <td>
                      <strong>家长姓名 :</strong>{{ basiscInfo.parents4 }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>联系电话 :</strong>{{ basiscInfo.parentTel4 }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="book_info">
              <el-tabs v-model="activeName"  @tab-click="handleClick" class="book_tab" >
                <el-tab-pane label="智慧课本" name="first">
                  <div class="book_card">
                    <div v-for="book in bookList" :key="book.id" class="book_detail">
                      <div class="subject_img">
                        <img src="../../assets/logo.png" alt="" />
                      </div>
                      <div class="subject_info">
                        <el-button type="text">{{ book.subject }}</el-button>
                        <el-button type="text">已读：{{ book.readed }}</el-button>
                        <el-button type="text">笔记：{{ book.note }} 条</el-button>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="阅读笔记" name="second">
                  <div v-for="item in readList" :key="item.id" class="read_info">
                    <p><i :class="iconsObj[item.id]"></i> {{item.concent}}</p>
                    <span>{{item.uptime}}</span>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="点赞互动" name="third">角色管理</el-tab-pane>
              </el-tabs>
            </div>
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
      value1: 4,
      birthday: "2000-12-01",
      studentDetail: [
        { id: 1, title: "读书笔记", data: "456条", icon: "" },
        { id: 2, title: "阅读时长", data: "123分钟", icon: "" },
        { id: 3, title: "练习题型", data: "5套", icon: "" },
      ],
      activeName: "second",
      bookList: [
        { id: 1, subject: "地理", readed: "60%", note: 36 },
        { id: 2, subject: "地理", readed: "60%", note: 36 },
        { id: 3, subject: "地理", readed: "60%", note: 36 },
        { id: 4, subject: "地理", readed: "60%", note: 36 },
        { id: 5, subject: "地理", readed: "60%", note: 36 },
        { id: 6, subject: "地理", readed: "60%", note: 36 },
        { id: 7, subject: "地理", readed: "60%", note: 36 },
      ],
      basiscInfo: {
        name: "张星伟",
        adderss: "福建省厦门市翔安区新店镇洪琳湖一里美地亚小区五栋501",
        hobby: "阅读，跳绳，画画",
        weibo: "http://weibo.com/zxw",
        email: "zhangxinwei@163.com",
        tel: "13788888888",
        parents1: "张明洁 -爸爸",
        parentTel1: "13699999999",
        parents2: "吴小芳 -妈妈",
        parentTel2: "13511111111",
        parents3: "张铁林 -爷爷",
        parentTel3: "13366666666",
        parents4: "无",
        parentTel4: "无",
      },
      readList: [
        {id: 1, concent: 'John Doe posted a comment in Avengers Initiative project.', uptime: '2020/08/08 12:08' },
        {id: 2, concent: 'John Doe posted a comment in Avengers Initiative project.', uptime: '2020/08/08 12:08' },
        {id: 3, concent: 'John Doe posted a comment in Avengers Initiative project.', uptime: '2020/08/08 12:08' },
        {id: 4, concent: 'John Doe posted a comment in Avengers Initiative project.', uptime: '2020/08/08 12:08' },
        {id: 5, concent: 'John Doe posted a comment in Avengers Initiative project.', uptime: '2020/08/08 12:08' },
        {id: 6, concent: 'John Doe posted a comment in Avengers Initiative project.', uptime: '2020/08/08 12:08' },
        {id: 7, concent: 'John Doe posted a comment in Avengers Initiative project.', uptime: '2020/08/08 12:08' }
      ],
      iconsObj: {
        1: "el-icon-date",
        2: "el-icon-tickets",
        3: "el-icon-office-building",
        4: "el-icon-set-up",
        5: "el-icon-wallet",
        6: "el-icon-wallet",
        7: "el-icon-wallet"
      }
    };
  },
  methods: {
    backList() {
      this.$router.push("/crypto-currencies");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
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
.student_info {
  padding: 0.5rem;
  border: 1px solid rgba(167, 180, 201, 0.2);
  margin-bottom: 0.5rem;
}
.book_tab {
  padding: 0.5rem;
  border: 1px solid rgba(167, 180, 201, 0.2);
}
.book_card {
  display: flex;
  flex-wrap: wrap;
  .book_detail {
    margin: 1rem;
    border: 1px solid rgba(167, 180, 201, 0.2);
    border-radius: 1rem;
    .subject_img {
      padding: 1.5rem;
      border-bottom: 1px solid rgba(167, 180, 201, 0.2);
    }
    .subject_info {
      padding: 1.5rem;
    }
  }
}
.table_wh {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  .table_w {
    color: #636262;
    font-size: 14px;
    width: 40%;
  }

}
table{
  border-collapse: separate;
  border-spacing: 1rem;
}
.read_info{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #636262;
  font-size: 14px;
  padding: 0 1rem;
  i {
    padding-right: 0.5rem;
    color: #623aa2;
    font-size: large;
  }
}
@media (max-width: 768px) {
  .iapd_w{
    width: 50% !important;
    margin-bottom: 1rem;
  }
  .mobile_card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 375px) {
  .iapd_w{
  width: 100% !important;
  }
.table_wh {
  display: inherit;
  width: 100%;
  .table_w {
    color: #636262;
    font-size: 14px;
    width: 100%;
  }

}
}
</style>
