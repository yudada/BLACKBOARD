<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8" :style="{ height: '100%' }">
        <el-card
          shadow="always"
          :body-style="{ padding: 0 }"
          :style="{ height: '100%' }"
        >
          <div class="card_img">
            <img src="../../assets/images/photos/3.jpeg" alt="" />
          </div>
          <div class="card_info">
            <h3>张玲玲 (一年3班班主任)</h3>
            <p class="card-text">
              优秀课件老师，张玲玲老师（现任一年3班班主任），她用自己智慧的大脑，通过坚持努力的付出，制做出一套又一套优秀的教学课件。
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" :style="{ height: '100%' }">
        <el-card shadow="always" :style="{ height: '100%' }">
          <div slot="header">
            <span>榜样的力量</span>
          </div>
          <div class="card_table">
            <el-table :data="topTabledate" style="width: 100%">
              <el-table-column prop="name" label="姓名">
                <template slot-scope="scope">
                  <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  ></el-avatar>
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="class" label="班级"> </el-table-column>
              <el-table-column prop="addText" label="备注"> </el-table-column>
              <el-table-column prop="top" label="TOP榜单">
                <template slot-scope="scope">
                  <el-dropdown trigger="click">
                    <el-button :class="'top_btn' + scope.row.top"
                      >TOP{{ scope.row.top
                      }}<i class="el-icon-arrow-down el-icon--right"></i
                    ></el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>我的班级</el-dropdown-item>
                      <el-dropdown-item>我的阅读</el-dropdown-item>
                      <el-dropdown-item>我的笔记</el-dropdown-item>
                      <el-dropdown-item>更多</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
}
</script>

<style lang="scss" scoped>
// TOP 按钮
.top_btn1 {
  color: #fff;
  background: linear-gradient(to bottom right, #9853af, #623aa2);
  border-color: #913ad8;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
}
.top_btn1:hover,
.top_btn1:focus {
  color: #fff !important;
  border-color: #fff;
}
.top_btn2 {
  color: #fff;
  background: linear-gradient(to bottom right, #fbc434 0%, #f66b4e 100%);
  border-color: #ef9f49;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
}
.top_btn2:hover,
.top_btn2:focus {
  color: #fff !important;
  border-color: #fff;
}
.top_btn3 {
  color: #fff;
  background: linear-gradient(to bottom right, #62fb62, #21a544);
  border-color: #4ecc48;
}
.top_btn3:hover,
.top_btn3:focus {
  color: #fff !important;
  border-color: #fff;
}
.top_btn4 {
  color: #fff;
  background: linear-gradient(to bottom right, #00f2fe 0%, #1fb2c1 100%);
  border-color: #07cedc;
}
.top_btn4:hover,
.top_btn4:focus {
  color: #fff !important;
  border-color: #fff;
}
</style>