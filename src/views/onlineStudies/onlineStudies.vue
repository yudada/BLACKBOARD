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
              <div slot="header">
                <div class="header-title">
                  <span>{{ item.teachName }}</span>
                  <div>
                    <i class="el-icon-view"></i>
                    <span>观看人数：{{ item.viewCount }}</span>
                  </div>
                </div>
              </div>
              <div @click="openDialogVisible(item)" class="card-img">
                <img :src="item.teachImage" alt="" />
              </div>
              <div class="card-content">
                <el-button
                  :loading="item.loading"
                  type="text"
                  @click="openAnserDialog(item)"
                >
                  答题列表
                </el-button>
                <el-button
                  type="text"
                  @click="openPublishStudiesQuetions(item)"
                >
                  发布题目
                </el-button>
              </div>
            </el-card>
            <!-- 对话框 -->
            <el-dialog
              :title="museumInfo.teachName"
              :visible.sync="dialogVisible"
              fullscreen
              :append-to-body="true"
              custom-class="dialog"
              :destroy-on-close="true"
            >
              <iframe :src="museumInfo.teachUrl" frameborder="0"></iframe>
            </el-dialog>
          </el-col>
        </div>
      </el-row>

      <Answer-list
        :visible="openAnswer"
        :data="studiesData"
        @closeDilog="closeAnswerDialog"
        @closeLoading="closeAnswerLoading"
      />

      <Publish-studies-quetions
        :visible="openPublicQuetions"
        :data="museumInfo"
        @closeDilog="closeAnswerDialog"
      />
    </div>
  </div>
</template>

<script>
import {
  onlineList,
  answerPerson,
  onlineAddQuestions,
} from '@/api/onlineStudies'
import AnswerList from './componts/answerList.vue'
import PublishStudiesQuetions from './componts/publishStudiesQuetions.vue'
export default {
  components: { AnswerList, PublishStudiesQuetions },
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
      openAnswer: false,
      openPublicQuetions: false,
      studiesData: '',
      loading: false,
    }
  },
  created() {
    this.getOnlieList()
  },
  methods: {
    // 获取博物馆列表
    async getOnlieList() {
      onlineList().then((res) => {
        const { data } = res
        data.map(item=>{
          let key = 'loading'
          let value = false
          item[key] = value
        })
        this.museumList = data
        console.log(this.museumList);
      })
    },
    openDialogVisible(item) {
      this.museumInfo = item
      this.dialogVisible = true
    },
    openAnserDialog(item) {
      this.studiesData = item
      this.openAnswer = true
      item.loading = true
    },
    openPublishStudiesQuetions(item) {
      this.museumInfo = item
      this.openPublicQuetions = true
    },
    closeAnswerDialog(data) {
      this.openAnswer = data
      this.openPublicQuetions = data
    },
    closeAnswerLoading(data) {
      this.studiesData.loading = data
    },
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 1rem;
  .header-title {
    display: flex;
    justify-content: space-between;
    i {
      margin-right: 10px;
    }
    span {
      color: #636262;
    }
  }
  .card-img {
    width: 100%;
    // height: 0;
    // padding-bottom: 100%;
    // overflow: hidden;
    img {
      width: 100%;
      cursor: pointer;
    }
  }
  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
