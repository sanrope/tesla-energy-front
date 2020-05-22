<template>
  <div class="example">
    <v-card hover>
      <apexchart width="500" height="350" type="bubble" :options="chartOptions" :series="series"></apexchart>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'ReportBubble',
  data: function () {
    return {
      chartOptions: {
        title: {
          text: 'Bubble Chart:'
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          opacity: 0.8,
          gradient: {
            enabled: false
          }
        },
        xaxis: {
          tickAmount: 12,
          type: 'category'
        },
        yaxis: {
          max: 70
        }
      },
      series: [
        {
          name: 'Bubble1',
          data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
          })
        },
        {
          name: 'Bubble2',
          data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
          })
        },
        {
          name: 'Bubble3',
          data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
          })
        },
        {
          name: 'Bubble4',
          data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
          })
        }
      ]
    }
  },
  methods: {
    generateData (baseval, count, yrange) {
      var i = 0
      var series = []
      while (i < count) {
        var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
        var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15

        series.push([x, y, z])
        baseval += 86400000
        i++
      }
      return series
    }
  }
}

</script>
