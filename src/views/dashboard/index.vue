<template>
  <div class="dashboard-container">
    <div class="background-container">
      <div class="dashboard-text">name: {{ name }}</div>
      <div class="dashboard-text">name: {{ this.$store.getters.roles }}</div>
      <panel-group></panel-group>
          <div class="chart-div" style="width:60% ;height: 450px">
            <mix-chart></mix-chart>
          </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import PanelGroup from '@/views/dashboard/components/PanelGroup'
import MixChart from '@/components/Charts/MixChart'


const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Dashboard',
  components:{
    PanelGroup,
    MixChart
  },
  methods:{
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    //margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.chart-div{
  box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
}
</style>
