<template>
  <div class="example">
    <v-card hover>
      <apexchart width="500" height="350" type="bar" :options="chartOptions" :series="chartData"></apexchart>
    </v-card>
    <!-- <div>
       <button @click="updateChart">Update!</button>
    </div> -->
  </div>
</template>

<script>

export default {
  name: 'ReportBar',
  data: function () {
    return {
      chartOptions: {
        title: {
          text: 'System Users & Clients:'
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        stroke: {
          width: 10,
          colors: ['transparent']
        },
        xaxis: {
          title: {
            text: '#'
          },
          categories: ['Users', 'Clientes']
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45]
      }]
    }
  },
  methods: {
    // updateChart () {
    //   const max = 90
    //   const min = 20
    //   const newData = this.series[0].data.map(() => {
    //     return Math.floor(Math.random() * (max - min + 1)) + min
    //   })
    //
    //   const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']
    //
    //   // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
    //   this.chartOptions = {
    //     colors: [colors[Math.floor(Math.random() * colors.length)]]
    //   }
    //   // In the same way, update the series option
    //   this.series = [{
    //     data: newData
    //   }]
    // }
  },
  computed: {
    chartData () {
      const users = this.$store.getters.getUsers
      const clients = this.$store.getters.getClients
      const series = [
        { name: 'Users', data: [users.length] },
        { name: 'Users', data: [clients.length] }
      ]
      return series
    }
  },
  beforeCreate () {
    this.$store.dispatch('getUsers')
    this.$store.dispatch('obtainClients')
  }
}

</script>
