<template>
  <v-col cols="12">
    <v-row align="center" justify="center">
      <h1>
        <v-responsive>{{ $t("home.welcome") }}</v-responsive>
      </h1>
    </v-row>
    <v-row align="center" justify="center">
      <v-img max-height="40vw" max-width="40vw" :src="require('../assets/tesla_coil.svg')"></v-img>
    </v-row>
  </v-col>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    drawer: false
  })
}
</script>
