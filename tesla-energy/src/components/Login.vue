<template>
<div>
  <v-container class="text-xs-center" style="min-height: 60vh;" fluid>
    <v-layout align-center justify-center >
      <v-flex xs12 sm10 md6>
        <v-card class="elevation-10" >
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{ $t("login.title") }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form
            v-model="valid"
            @submit.prevent="login">
              <v-text-field
               v-model="user.username"
               prepend-icon="person"
               name="login"
               :label="$t('login.userName')"
               :disabled="token ? true : false" type="text"
               :rules="[rules.required]"
               required></v-text-field>
              <v-text-field
               :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
               v-model="user.password" prepend-icon="lock"
               :disabled="token ? true : false" name="password"
               :label="$t('login.password')"
               id="password"
               :type="show ? 'text' : 'password'"
               required
               :rules="[rules.required]"
               @click:append="show = !show"></v-text-field>
              <v-card-actions>
                <v-col>
                  <Recaptcha @recaptchaToken="getRecaptchaToken"/>
                  <v-row>
                    <v-col>
                      <v-btn :disabled="!valid" type="submit" color="pink">{{ $t("login.loginButton") }}</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <v-alert :value="error ? true : false" mode="in-out" type="error" transition="scale-transition" :timeout="4000" outlined>
      {{error}}
  </v-alert>
  </div>
</template>

<script>

import Recaptcha from './Recaptcha.vue'
import axios from 'axios'
import { i18n } from '../plugins/i18n.js'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      show: false,
      valid: true,
      recaptcha: false,
      rules: {
        required: val => !!val || i18n.t('registerUser.fieldRequired')
      },
      error: null
    }
  },
  components: {
    Recaptcha
  },
  methods: {
    login () {
      if (this.recaptcha === true) {
        this.$store.dispatch('login', this.user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(err => {
            console.log('login error: ' + err)
            console.error(err)
            this.error = err
            setTimeout(() => { this.error = null }, 4000)
          })
      } else {
        alert('reCAPTCHA not validated')
      }
    },
    getRecaptchaToken (recaptchaResponse) {
      axios.post('http://34.221.98.21:8000/api/v1/usuarios/verifyrecaptcha/', { recaptcha: recaptchaResponse })
        .then(res => {
          this.recaptcha = res.data.success
        })
        .catch(err => {
          console.log('getRecaptchaToken error: ' + err)
        })
    }
  },
  computed: {
    token () { // To validate if already logged in
      return this.$store.state.token
    }
  }
}
</script>
