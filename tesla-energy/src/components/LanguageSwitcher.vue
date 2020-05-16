<template>
  <v-container text-center >
        <v-row >
          <ul>
            <li v-for="lang in languages" :key="lang" @click="changeLang(lang)">
              {{ lang }}
            </li>
          </ul>
        </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
  components: {},
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
