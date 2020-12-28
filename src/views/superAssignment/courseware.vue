<template>
  <div class="courseware_main">
    <Breadcrumb :navData="navData" />

    <div class="courseware_concent">
      <taskList :type="3"></taskList>
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
        childTitle: '精选题库'
      }
    }
  },
}
</script>