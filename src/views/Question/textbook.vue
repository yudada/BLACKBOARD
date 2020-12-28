<template>
  <div class="textbook_main">
    <Breadcrumb :navData="navData" />

    <div class="textbook_concent">
      <questionList :type="2"></questionList>
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
        childTitle: '自检题'
      }
    };
  },
  created() {},
  methods: {},
};
</script>
