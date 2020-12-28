<template>
  <div class="expand_main">
    <Breadcrumb :navData="navData" />

    <div class="expand_concent">
      <questionList :type="1"></questionList>
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
        childTitle: '练习题'
      }
    };
  },
  created() {},
  methods: {},
};
</script>
