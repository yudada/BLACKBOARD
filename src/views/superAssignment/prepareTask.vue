<template>
  <div class="prepareTaske_main">
    <Breadcrumb :navData="navData" />

    <div class="prepareTaske_concent">
      <taskList :type="1"></taskList>
    </div>
  </div>
</template>

<script>
import taskList from './components/taskList.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: {
    taskList,
    Breadcrumb
  },
  data() {
    return {
      navData: {
        title: '超级作业',
        childTitle: '立体模型'
      }      
    }
  },
}
</script>
