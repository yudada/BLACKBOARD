<template>
  <div>
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
              <td><strong>家长姓名 :</strong>{{ basiscInfo.parents1 }}</td>
            </tr>
            <tr>
              <td><strong>联系电话 :</strong>{{ basiscInfo.parentTel1 }}</td>
            </tr>
          </tbody>
          <tbody class="table_w">
            <tr>
              <td></td>
            </tr>
            <tr>
              <td><strong>家长姓名 :</strong>{{ basiscInfo.parents2 }}</td>
            </tr>
            <tr>
              <td><strong>联系电话 :</strong>{{ basiscInfo.parentTel2 }}</td>
            </tr>
          </tbody>
          <tbody class="table_w">
            <tr>
              <td><strong>家长姓名 :</strong>{{ basiscInfo.parents3 }}</td>
            </tr>
            <tr>
              <td><strong>联系电话 :</strong>{{ basiscInfo.parentTel3 }}</td>
            </tr>
          </tbody>
          <tbody class="table_w">
            <tr>
              <td><strong>家长姓名 :</strong>{{ basiscInfo.parents4 }}</td>
            </tr>
            <tr>
              <td><strong>联系电话 :</strong>{{ basiscInfo.parentTel4 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="book_info">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="book_tab">
          <el-tab-pane label="智慧课本" name="first">
            <div class="book_card">
              <div v-for="book in bookList" :key="book.id" class="book_detail">
                <div class="subject_img">
                  <img src="@/assets/logo.png" alt="" />
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
              <p><i :class="iconsObj[item.id]"></i> {{ item.concent }}</p>
              <span>{{ item.uptime }}</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="点赞互动" name="third">角色管理</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'second',
      bookList: [
        { id: 1, subject: '地理', readed: '60%', note: 36 },
        { id: 2, subject: '地理', readed: '60%', note: 36 },
        { id: 3, subject: '地理', readed: '60%', note: 36 },
        { id: 4, subject: '地理', readed: '60%', note: 36 },
        { id: 5, subject: '地理', readed: '60%', note: 36 },
        { id: 6, subject: '地理', readed: '60%', note: 36 },
        { id: 7, subject: '地理', readed: '60%', note: 36 },
      ],
      basiscInfo: {
        name: '张星伟',
        adderss: '福建省厦门市翔安区新店镇洪琳湖一里美地亚小区五栋501',
        hobby: '阅读，跳绳，画画',
        weibo: 'http://weibo.com/zxw',
        email: 'zhangxinwei@163.com',
        tel: '13788888888',
        parents1: '张明洁 -爸爸',
        parentTel1: '13699999999',
        parents2: '吴小芳 -妈妈',
        parentTel2: '13511111111',
        parents3: '张铁林 -爷爷',
        parentTel3: '13366666666',
        parents4: '无',
        parentTel4: '无',
      },
      readList: [
        {
          id: 1,
          concent: 'John Doe posted a comment in Avengers Initiative project.',
          uptime: '2020/08/08 12:08',
        },
        {
          id: 2,
          concent: 'John Doe posted a comment in Avengers Initiative project.',
          uptime: '2020/08/08 12:08',
        },
        {
          id: 3,
          concent: 'John Doe posted a comment in Avengers Initiative project.',
          uptime: '2020/08/08 12:08',
        },
        {
          id: 4,
          concent: 'John Doe posted a comment in Avengers Initiative project.',
          uptime: '2020/08/08 12:08',
        },
        {
          id: 5,
          concent: 'John Doe posted a comment in Avengers Initiative project.',
          uptime: '2020/08/08 12:08',
        },
        {
          id: 6,
          concent: 'John Doe posted a comment in Avengers Initiative project.',
          uptime: '2020/08/08 12:08',
        },
        {
          id: 7,
          concent: 'John Doe posted a comment in Avengers Initiative project.',
          uptime: '2020/08/08 12:08',
        },
      ],
      iconsObj: {
        1: 'el-icon-date',
        2: 'el-icon-tickets',
        3: 'el-icon-office-building',
        4: 'el-icon-set-up',
        5: 'el-icon-wallet',
        6: 'el-icon-wallet',
        7: 'el-icon-wallet',
      },
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(1)
    },
  },
}
</script>

<style lang="scss" scoped>
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
table {
  border-collapse: separate;
  border-spacing: 1rem;
}
.read_info {
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

@media (max-width: 375px) {
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