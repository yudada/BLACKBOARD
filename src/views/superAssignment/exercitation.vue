<template>
  <div class="mistakes_main">
    <Breadcrumb :navData="navData" />

    <div class="mistakes_concent">
      <taskList :type="4"></taskList>
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
        childTitle: '实验操作'
      }      
    }
  },
}
</script>
