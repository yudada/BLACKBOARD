<template>
  <div class="personal-resources">
    <el-card>
      <el-button
        v-show="activeName !== 'all' && activeName !== 'model'"
        type="primary"
        size="medium"
        class="up-resource"
        @click="upResource"
      >
        上传资源
      </el-button>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="m in categoryList"
          :key="m.name"
          :label="m.title"
          :name="m.name"
        >
          <div>
            <Resource-list
              :loading="loading"
              :data="resourceData"
              :query="query"
              :activeName="activeName"
              @changePageSie="changePageSize"
              @changeCurrentChange="changePageCurrentChange"
              @refreshData="handleClick"
              v-if="activeName !== 'model'"
            />
            <Model-list
              :currentPage="query.currentPage"
              :pageSize="query.pageSize"
              :total="query.total"
              :modelsList="resourceData"
              @getModels="handleClick"
              @changePageSie="changePageSize"
              @changeCurrentChange="changePageCurrentChange"
              v-else
            />
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
import { resourceOfMy, resourceModelsList } from '@/api/classRoom'
import Picture from '@/components/classRoom/classExercise/personalResources/picture.vue'
import Video from '@/components/classRoom/classExercise/personalResources/video.vue'
import Audio from '@/components/classRoom/classExercise/personalResources/audio.vue'
import PictureGif from '@/components/classRoom/classExercise/personalResources/pictureGIF.vue'
import ResourceList from '@/components/classRoom/classExercise/resourceList.vue'
import ModelList from '@/components/classRoom/classExercise/modelList.vue'
export default {
  name: 'personalResources',
  components: { Picture, Video, Audio, PictureGif, ResourceList, ModelList },
  data() {
    return {
      activeName: 'model',
      categoryList: [
        // { id: 0, name: 'all', title: '全部' },
        { id: 0, name: 'model', title: '模型' },
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
    async getMyResource(n) {
      if (n === 0) {
        await resourceModelsList({ limit: this.query.pageSize }).then((res) => {
          this.loading = false
          const { data, current_page, per_page, total } = res.data
          const resourceData = []
          this.query.currentPage = current_page
          this.query.pageSize = parseFloat(per_page)
          this.query.total = total
          data.map((v) => {
            if (v.is_collect === 1) resourceData.push(v)
          })
          this.resourceData = resourceData
        })
      } else {
        await resourceOfMy({ type: n, limit: this.query.pageSize }).then(
          (res) => {
            this.loading = false
            const { data, current_page, per_page, total } = res.data
            this.resourceData = data
            this.query.currentPage = current_page
            this.query.pageSize = parseFloat(per_page)
            this.query.total = total
          }
        )
      }
      console.log(this.resourceData)
    },
    changePageSize(pageSize) {
      this.query.pageSize = pageSize
      this.$nextTick(() => {
        this.handleClick()
      })
    },
    changePageCurrentChange(currentPage) {
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
.disUoloadSty {
  .el-upload--picture-card {
    display: none;
  }
}
</style>