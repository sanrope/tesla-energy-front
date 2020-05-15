<template>
          <v-col cols="12">
          <v-row align="center" justify="center">
              <h1>
                <v-responsive> Welcome to Tesla Energy</v-responsive> </h1>
          </v-row>
            <v-row align="center" justify="center">
                <!-- <img :src="require('../assets/tesla_coil.svg')"> -->
                <v-img max-height="50vw" max-width="50vw" :src="require('../assets/tesla_coil.svg')" ></v-img>
        </v-row>
        <v-row>   <v-col>123</v-col>
        <v-col>456</v-col></v-row>
            </v-col>
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
