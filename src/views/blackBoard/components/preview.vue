<template>
  <div class='preview'>
    <div class='show' :model-id='this.source.modelId'>
      <template v-if='this.source.type === 1'>
        <!-- 图片、动图 -->
        <el-image :src='this.source.uri' fit='cover'></el-image>
      </template>
      <template v-else-if='this.source.type === 2'>
        <!-- music -->
        <audio class='audio' :src='this.source.uri' controls muted></audio>
      </template>
      <template v-else-if='this.source.type === 3'>
        <!-- video -->
        <video class='video' :src='this.source.uri' controls :poster='this.source.coverImg' muted loop></video>
      </template>
      <template v-else>
        <!-- model -->
        <embed class='model' :src='this.source.uri'/>
      </template>
    </div>
    <div class='name'>
      {{this.source.name}}
    </div>
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
  mounted() {
    console.log(this.source)
  }
}
</script>

<style lang='sass' scoped>
.preview
  width: 100%
  height: 100%
  position: relative
  border-radius: 10px
  .show
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    .img
      width: 50%
      height: 50%
    .video
      width: 50%
      height: auto
    .auto
      width: 100%
      height: auto
    .model
      width: 90%
      height: 100%
  .name
    position: absolute
    left: 0
    top: 0
    right: 0
    height: 2rem
    color: #3b4249
    display: flex
    justify-content: center
    align-items: center
    background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%)
</style>