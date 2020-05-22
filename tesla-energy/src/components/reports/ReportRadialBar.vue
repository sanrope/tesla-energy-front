<template>
  <div class="example">
    <v-card hover>
      <apexchart width="350" type="radialBar" :options="chartOptions" :series="series"></apexchart>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'ReportRadialBar',
  data: function () {
    return {
      chartOptions: {
        labels: ['Percent']
      },
      series: [81]
    }
  }
}

</script>
