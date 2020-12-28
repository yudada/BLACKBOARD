<template>
  <div class="readTask_main">
    <Breadcrumb :navData="navData" />

    <div class="readTask_concent">
      <taskList :type="2"></taskList>
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
        childTitle: '课本阅读'
      }
    }
  },
}
</script>
