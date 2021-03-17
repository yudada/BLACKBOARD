<template>
  <div class="personal-resources">
    <el-card>
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
          <Resource-list
            :loading="loading"
            :data="resourceData"
            :query="query"
            @changePage="changePage"
          />
          <div v-if="m.name === 'model'">
            <Model :visible="opDialog" @handleChange="handleClick" />
          </div>
          <div v-if="m.name === 'picture'">
            <Picture :visible="opDialog" @handleChange="handleClick" />
          </div>
          <div v-if="m.name === 'pictureGif'">
            <Picture-gif :visible="opDialog" @handleChange="handleClick" />
          </div>
          <div v-if="m.name === 'video'">
            <Video :visible="opDialog" @handleChange="handleClick" />
          </div>
          <div v-if="m.name === 'audio'">
            <Audio :visible="opDialog" @handleChange="handleClick" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import _ from 'lodash'
import { resourceOfMy } from '@/api/classRoom'
import Model from '@/components/classRoom/classExercise/personalResources/model.vue'
import Picture from '@/components/classRoom/classExercise/personalResources/picture.vue'
import Video from '@/components/classRoom/classExercise/personalResources/video.vue'
import Audio from '@/components/classRoom/classExercise/personalResources/audio.vue'
import PictureGif from '@/components/classRoom/classExercise/personalResources/pictureGIF.vue'
import ResourceList from '../../../components/classRoom/classExercise/resourceList.vue'
export default {
  name: 'personalResources',
  components: { Model, Picture, Video, Audio, PictureGif, ResourceList },
  data() {
    return {
      activeName: 'video',
      categoryList: [
        // { id: 0, name: 'all', title: '全部' },
        //id: 0 ,  { name: 'model', title: '模型' },
        { id: 1, name: 'picture', title: '图片' },
        { id: 2, name: 'pictureGif', title: '动图' },
        { id: 3, name: 'audio', title: '音频' },
        { id: 4, name: 'video', title: '视频' },
      ],
      opDialog: '',
      resourceData: [],
      loading: true,
      query: {
        total: 0,
        pageSize: 20,
        currentPage: 1,
      },
    }
  },
  mounted() {
    this.handleClick()
  },
  methods: {
    upResource() {
      this.opDialog = ''
      this.$nextTick(() => {
        this.opDialog = this.activeName
      })
    },
    handleClick() {
      this.loading = true
      this.categoryList.map((v) => {
        if (v.name === this.activeName) {
          this.getMyResource(v.id)
        }
      })
    },
    getMyResource(n) {
      resourceOfMy({ type: n, limit: this.query.pageSize }).then((res) => {
        console.log(res)
        this.loading = false
        const { data, current_page, per_page, total } = res.data
        this.resourceData = data
        this.query.currentPage = current_page
        this.query.pageSize = parseFloat(per_page)
        this.query.total = total
      })
    },
    changePage(pageSize, currentPage) {
      this.query.pageSize = pageSize
      this.query.currentPage = currentPage
      this.$nextTick(() => {
        this.handleClick()
      })
    },
  },
}
</script>

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
  .input-new-tag {
    width: 10rem !important;
  }
}
</style>