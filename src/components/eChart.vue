<template>
  <div id="main" style="width: 100%; height: 400px"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: ['option'],
  data() {
    return {}
  },
  mounted() {
    this.myChart()
  },
  methods: {
    myChart() {
      let myChart = echarts.init(document.getElementById('main'))
      myChart.setOption(this.option)
    }
  },
}
</script>