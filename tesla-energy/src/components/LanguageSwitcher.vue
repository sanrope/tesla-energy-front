<template>
  <v-container text-center >
        <v-row>
          <v-col>
            <v-btn class="ma-2" large icon @click="changeLang('en_US')">
              <country-flag country='us' size='normal'/>
            </v-btn>
            <v-btn class="ma-2" large icon @click="changeLang('es_ES')">
              <country-flag country='es' size='normal' />
            </v-btn>
            <v-btn class="ma-2" large icon @click="changeLang('pt_BR')">
              <country-flag country='br' size='normal'/>
            </v-btn>
          </v-col>
        </v-row>
  </v-container>
</template>

<script>

import CountryFlag from 'vue-country-flag'

export default {
  name: 'LanguageSwitcher',
  components: {
    CountryFlag
  },
  data: () => ({
    languages: ['en_US', 'es_ES', 'pt_BR']
  }),
  methods: {
    changeLang (lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>
