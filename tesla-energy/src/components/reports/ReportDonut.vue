<template>
  <div class="example">
    <v-card hover>
      <apexchart ref="donut" width="350" type="donut" :options="chartOptions" :series="chartData"></apexchart>
    </v-card>
    <!-- <div>
      <button @click="updateChart">Update!</button>
    </div> -->
  </div>
</template>

<script>

export default {
  name: 'ReportDonut',
  data: function () {
    return {
      chartOptions: {
        title: {
          text: 'System Assets:'
        },
        plotOptions: {
          pie: {
            donut: {
              size: '14%'
            }
          }
        },
        labels: ['Substations', 'Transformers', 'Electric Meters']
      }
      // series: [11, 32, 45, 32]
    }
  },
  methods: {
    // updateChart () {
    //   const max = 90
    //   const min = 20
    //   const newData = this.series.map(() => {
    //     return Math.floor(Math.random() * (max - min + 1)) + min
    //   })
    //
    //   this.series = newData
    // }
  },
  computed: {
    chartData () {
      const substations = this.$store.getters.getSubstations
      const transformers = this.$store.getters.getTransformers
      const meters = this.$store.getters.getMeters
      const series = [substations.length, transformers.length, meters.length]
      return series
    }
  },
  beforeCreate () {
    this.$store.dispatch('getSubstations')
    this.$store.dispatch('getTransformers')
    this.$store.dispatch('getMeters')
  }
}

</script>
