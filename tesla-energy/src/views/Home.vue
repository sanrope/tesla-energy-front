<template>
  <v-container text-center >
        <v-row >
          <v-col cols="12">
            <lang-switcher></lang-switcher>
            <h1> {{ $t("home.welcome") }} </h1>
          </v-col>
          <v-col cols="12" >
              <img :src="require('../assets/tesla_coil.png')">
          </v-col>
        </v-row>
  </v-container>
</template>

<script>

import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

export default {
  name: 'Home',
  components: {
    'lang-switcher': LanguageSwitcher
  },
  data: () => ({
    drawer: false
  })
}
</script>
