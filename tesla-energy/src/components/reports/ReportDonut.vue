<template>
  <div class="example">
    <v-card hover>
      <apexchart ref="donut" width="350" type="donut" :options="chartOptions" :series="series"></apexchart>
    </v-card>
    <div>
       <button @click="updateChart">Update!</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ReportDonut',
  data: function () {
    return {
      chartOptions: {
        title: {
          text: 'Donut Chart:'
        },
        labels: ['Blue', 'Green', 'Yellow', 'Red']
      },
      series: [11, 32, 45, 32]
    }
  },
  methods: {
    updateChart () {
      const max = 90
      const min = 20
      const newData = this.series.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min
      })

      this.series = newData
    }
  }
}

</script>
