<template>
  <v-container style="min-height: 80vh">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="6">
        <v-card
          hover
          class="mx-auto pa-6"
        >
          <h1>{{ $t("registerClient.title") }}</h1>
          <p>{{ $t("registerClient.create") }}</p>
          <v-form ref="ClientRegistrationForm" v-model="valid">
            <v-row>
              <v-col>
                <v-divider></v-divider>
                <v-select
                v-model="client.type"
                :label="$t('registerClient.type.title')"
                solo
                :rules="[rules.required]"
                :items="[{text: $t('registerClient.type.natural'), value:'NA' }, { text: $t('registerClient.type.corporate'), value: 'CO' }]" />
                <v-text-field
                v-model="client.first_name"
                prepend-inner-icon="assignment_ind"
                name="first_name"
                :label="$t('registerClient.name')"
                type="text"
                solo
                required
                :rules="[rules.required]"></v-text-field>
                <v-text-field
                v-model="client.last_name"
                prepend-inner-icon="assignment_ind"
                name="last_name"
                :label="$t('registerClient.lastName')"
                type="text"
                solo
                required
                :rules="[rules.required]"></v-text-field>
                <v-text-field
                v-model="client.cedula"
                prepend-inner-icon="recent_actors"
                name="cedula"
                :label="$t('registerClient.id')"
                type="number"
                solo
                required
                :rules="[rules.required]"></v-text-field>
                <v-text-field
                v-model="client.email"
                prepend-inner-icon="email"
                name="email"
                :label="$t('registerClient.email')"
                type="text"
                solo
                required
                :rules="[rules.required, rules.email]" />
                <v-btn @click="register" :disabled="!valid">{{ $t("registerClient.sendButton") }}</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { i18n } from '../plugins/i18n.js'

export default {
  name: 'RegisterClient',
  data () {
    return {
      client: {
        cedula: null,
        first_name: null,
        last_name: null,
        email: null,
        type: null
      },
      rules: {
        required: value => !!value || i18n.t('registerClient.fieldRequired'),
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || i18n.t('registerClient.invalidEmail')
        }
      },
      valid: true
    }
  },
  methods: {
    register () {
      this.$store.dispatch('registerClient', this.client)
        .then(res => {
          alert(i18n.t('registerClient.registered'))
          this.clearForm()
        })
        .catch(err => {
          console.log(i18n.t('registerClient.registerError') + err)
        })
    },
    clearForm () {
      this.$refs.ClientRegistrationForm.reset()
      this.$refs.ClientRegistrationForm.resetValidaton()
      //  Esta es una manera mas comoda de hacerlo look up.
      /* this.client.username = null
      this.client.first_name = null
      this.client.last_name = null
      this.client.email = null
      this.client.password = null
      this.client.password_validate = null
      this.client.rol = null */
    }
  }
}
</script>
