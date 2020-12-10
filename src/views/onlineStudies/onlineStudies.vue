<template>
  <div class="courseware_main">
    <div class="courseware_concent">
      <el-row style="margin: 0">
        <el-col :span="24">
          <el-card :body-style="{ padding: '0 4rem', margin: '0' }">
            <div slot="header">
              <span>在线研学</span>
            </div>
            <!-- 导航栏 -->
            <div class="nav_menu">
              <el-menu mode="horizontal" default-active="WZW">
                <el-submenu
                  :index="item.id + ''"
                  v-for="item in menulist"
                  :key="item.id"
                >
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ item.name }}</span>
                  </template>
                  <!-- 二级菜单 -->
                  <el-menu-item
                    :index="subItem.path"
                    v-for="subItem in item.child"
                    :key="subItem.id"
                  >
                    <template slot="title">
                      <i class="el-icon-s-home"></i>
                      <span>{{ subItem.name }}</span>
                    </template>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row>
        <div v-for="item in museumList" :key="item.id">
          <el-col :span="8">
            <el-card>
              <div slot="header">{{ item.teachName }}</div>
              <div @click="openDialogVisible(item)">
                <img :src="item.teachImage" alt="" />
              </div>
            </el-card>
            <el-dialog
              :title="museumInfo.teachName"
              :visible.sync="dialogVisible"
              fullscreen
              :append-to-body="true"
              custom-class="dialog"
            >
              <iframe
                :src="museumInfo.teachUrl"
                frameborder="0"
              ></iframe>
            </el-dialog>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menulist: [
        {
          id: 1,
          name: '名校展示',
          child: [
            { id: 10, path: 'XMU', name: '厦门大学博士馆' },
            { id: 11, path: 'XMOC', name: '海洋学院校园VR' },
            { id: 12, path: 'THU', name: '清华学府' },
            { id: 13, path: 'ZJU', name: '浙江大学' },
          ],
        },
        {
          id: 2,
          name: '人文博馆',
          child: [
            { id: 20, path: 'CRC', name: '中国建设文化馆' },
            { id: 21, path: 'BYM', name: '白银市博物馆全景' },
            { id: 22, path: 'WZW', name: '王芝文艺术馆' },
          ],
        },
        {
          id: 3,
          name: '党建精神',
          child: [
            { id: 30, path: 'CZL', name: '重走长征路' },
            { id: 31, path: 'BYIM', name: '南昌八一馆' },
            { id: 32, path: 'GTHY', name: '古田会议' },
          ],
        },
      ],
      dialogVisible: false,
      museumList: [],
      museumInfo: {},
    }
  },
  created() {
    this.getOnlieList()
  },
  methods: {
    // 获取博物馆列表
    async getOnlieList() {
      const { data: res } = await this.$http.get(`api/online/teach`)
      this.museumList = res.data
      console.log(res);
    },
    openDialogVisible(item) {
      this.museumInfo = item
      console.log(this.museumInfo);
      this.dialogVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 1rem;
  img {
    width: 100%;
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.nav_menu {
  .el-submenu.is-active .el-submenu__title {
    color: #fff !important;
    background: #623aa2;
    i {
      color: #fff;
    }
  }
  .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
    color: #fff !important;
    background: #623aa2;
    i {
      color: #fff;
    }
  }
  .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
    border: none;
  }
}
</style>
