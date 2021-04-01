<template>
  <div class='main' :model-id='this.source.modelId'>
      <template v-if='this.source.type === 1 || this.source.type === 3'>
        <!-- 图片、动图 -->
        <el-dialog
          top="5vh"
          :title="this.source.name"
          :visible="true"
          :append-to-body="true"
          :custom-class="this.source.type === 3 ? 'preview-dialog' : 'preview-dialog-image'"
          :destroy-on-close="true"
          @close="closeDetail"
        >
          <div
            style="width: 100%; height: 100%"
          >
            <img v-if="this.source.type === 1" :src="this.source.uri" alt="" />
            <video
              v-else-if='this.source.type === 3'
              :src="this.source.uri"
              controls
              muted
              style="max-width: 100%"
            />
          </div>
        </el-dialog>
      </template>
    <template v-if='this.source.type === 2'>
      <el-dialog
        top="5vh"
        :title="this.source.name"
        :visible="true"
        :append-to-body="true"
        :custom-class="'preview-dialog-audio'"
        :destroy-on-close="true"
        @close="closeDetail"
      >
        <div
          style="width: 100%; height: 100%; display: flex;
    justify-content: center;
    align-items: center">
          <audio class='audio' :src='this.source.uri' controls muted></audio>
        </div>
      </el-dialog>
    </template>
      <template v-else>
        <!-- model -->
        <el-dialog
          top="5vh"
          :title="this.source.name"
          :visible="true"
          :append-to-body="true"
          :custom-class="'preview-dialog-model'"
          :destroy-on-close="true"
          @close="closeDetail"
        >
          <div
            style="width: 100%; height: 100%; display: flex;
    justify-content: center;
    align-items: center">
            <embed class='model' :src='this.source.uri'/>
          </div>
        </el-dialog>
      </template>
    </div>
</template>

<script>
export default {
  name: 'preview',
  props: {
    source: {
      type: Object
    }
  },
  data () {
    return {
      srcList: [
        this.source.uri
      ]
    }
  },
  methods: {
    closeDetail () {
      this.$emit('closeDetail')
    }
  }
}
</script>

<style lang='sass' scoped>
::v-deep .preview-dialog-audio
  width: fit-content
  .el-dialog__body
    height: 20vh
    display: flex
    justify-content: center
    align-items: center
::v-deep .preview-dialog-model
  width: fit-content
  max-width: 80%
  .el-dialog__body
    height: 50vh
    width: 50vw
    padding: 0
    max-height: 80vh
    position: relative
    embed
      width: 100%
      height: 100%
::v-deep .preview-dialog
  width: fit-content
  max-width: 80%
  .el-dialog__body
    padding: 0
    max-height: 80vh
    position: relative
    div
      display: flex
    video
      outline: none
::v-deep .preview-dialog-image
  width: fit-content
  max-width: 90%
  .el-dialog__body
    padding: 0
    width: auto
    height: 80vh
    img
      width: auto
      max-width: 100%
      height: 100%
    .dialog-image-previous
      position: absolute
      left: 0
      top: 50%
      width: 25%
      text-align: start
      transform: translateY(-100%)
      font-size: 3rem
      margin: 2rem
      cursor: pointer
      color: #a39898c7
      i
        opacity: 0
        transition: all 0.5s
    .dialog-image-next
      position: absolute
      right: 0
      top: 50%
      width: 25%
      text-align: end
      transform: translateY(-100%)
      font-size: 3rem
      margin: 2rem
      cursor: pointer
      color: #a39898c7
      i
        opacity: 0
        transition: all 0.5s
    .dialog-image-next:hover,
    .dialog-image-previous:hover
      i
        opacity: 1
</style>