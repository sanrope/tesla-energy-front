<template>
  <v-container text-center >
        <v-row >
          <v-col cols="12">
              <h1>Welcome to Tesla Energy </h1>
            </v-col>
            <v-col cols="12" >
                <img :src="require('../assets/tesla_coil.png')">
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {},
  data: () => ({
    drawer: false
  })
}
</script>
