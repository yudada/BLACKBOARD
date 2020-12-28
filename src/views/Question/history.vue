<template>
  <div class="history_main">
    <Breadcrumb :navData="navData" />

    <div class="history_concent">
      <questionList :type="3"></questionList>
    </div>
  </div>
</template>

<script>
import questionList from "./components/questionList.vue";
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: {
    questionList,
    Breadcrumb
  },
  data() {
    return {
      navData: {
        title: '题库资源',
        childTitle: '历年考题'
      }
    };
  },
  created() {},
  methods: {},
};
</script>
