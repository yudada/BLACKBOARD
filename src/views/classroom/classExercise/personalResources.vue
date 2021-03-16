<template>
  <div class="personal-resources">
    <el-card>
      <!-- <div slot="header">我的资源</div> -->
      <el-button
        v-show="activeName !== 'all'"
        type="primary"
        size="medium"
        class="up-resource"
        @click="upResource"
        >上传资源</el-button
      >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="m in categoryList"
          :key="m.name"
          :label="m.title"
          :name="m.name"
        >
          <div class="resources-show-mode">
            <i
              @click="isList = false"
              class="el-icon-s-grid"
              :class="{ 'is-list': !isList }"
            />
            <i
              @click="isList = true"
              class="el-icon-tickets"
              :class="{ 'is-list': isList }"
            />
          </div>
          <el-table :data="resourceData" style="width: 100%" stripe v-loading="loading">
            <el-table-column
              type="index"
              label="序号"
              width="50px"
              align="center"
            />
            <el-table-column prop="name" label="名称" min-width="40%" />
            <el-table-column prop="label" label="标签" min-width="10%" />
            <el-table-column prop="classify" label="分类" min-width="10%" />
            <el-table-column prop="description" label="描述" min-width="10%" />
            <el-table-column prop="url" label="链接" min-width="30%" />
          </el-table>
          <el-pagination
          v-show="total > pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
          <div v-if="m.name === 'model'">
            <Model :visible="opDialog" />
          </div>
          <div v-if="m.name === 'picture'">
            <Picture :visible="opDialog" />
          </div>
          <div v-if="m.name === 'pictureGif'">
            <Picture-gif :visible="opDialog" />
          </div>
          <div v-if="m.name === 'video'">
            <Video :visible="opDialog" />
          </div>
          <div v-if="m.name === 'audio'">
            <Audio :visible="opDialog" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Model from '@/components/classRoom/classExercise/personalResources/model.vue'
import Picture from '@/components/classRoom/classExercise/personalResources/picture.vue'
import Video from '@/components/classRoom/classExercise/personalResources/video.vue'
import Audio from '@/components/classRoom/classExercise/personalResources/audio.vue'
import PictureGif from '@/components/classRoom/classExercise/personalResources/pictureGIF.vue'
import { resourceOfMy } from '@/api/classRoom'
import _ from 'lodash'
export default {
  name: 'personalResources',
  components: { Model, Picture, Video, Audio, PictureGif },
  data() {
    return {
      // 分页
      currentPage: 1,
      pageSize: 20,
      total: 0,
      loading: true,
      activeName: 'picture',
      categoryList: [
        // { id: 0, name: 'all', title: '全部' },
        //id: 0 ,  { name: 'model', title: '模型' },
        { id: 1, name: 'picture', title: '图片' },
        { id: 2, name: 'pictureGif', title: '动图' },
        { id: 4, name: 'video', title: '视频' },
        { id: 3, name: 'audio', title: '音频' },
      ],
      isList: true,
      opDialog: '',
      resourceData: [
        {
          id: 2,
          uid: 1,
          tid: 1,
          type: 1,
          name: '名称',
          materialPath: 'http://www.vrbook.vip',
          coverImg: null,
          classify: null,
          durationTime: 0,
          label: '标签',
          url: null,
          description: '描述',
          useNums: 0,
        },
      ],
    }
  },
  created() {
    this.getMyResource(1)
  },
  methods: {
    upResource() {
      this.opDialog = ''
      this.$nextTick(() => {
        this.opDialog = this.activeName
      })
    },
    handleClick() {
      this.categoryList.map((v) => {
        if (v.name === this.activeName) {
          this.getMyResource(v.id)
        }
      })
    },
    getMyResource(n) {
      resourceOfMy({ type: n }).then((res) => {
        this.loading = false
        const { data } = res.data
        this.resourceData = data
      })
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.handleClick()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.handleClick()
    },
  },
}
</script>

<style lang="scss" scoped>
.personal-resources {
  .resources-show-mode {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .is-list {
      color: #ad5df3;
    }
    i {
      margin: 0 0.5rem;
      font-size: 1.25rem;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.personal-resources {
  .el-card {
    position: relative;
    .el-card__body {
      min-height: calc(100vh - 200px);
    }
    .up-resource {
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 1;
      transition: display 0.3;
    }
  }
}
</style>