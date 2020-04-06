<template>
  <v-container class="text-xs-center" style="min-height: 60vh;" fluid>
    <v-layout align-center justify-center >
      <v-flex xs12 sm10 md6>
        <v-card class="elevation-10" >
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form
            v-model="valid"
            @submit.prevent="login">
              <v-text-field
               v-model="user.username"
               prepend-icon="person"
               name="login" label="Username"
               :disabled="token ? true : false" type="text"
               :rules="[rules.required]"
               required></v-text-field>
              <v-text-field
               :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
               v-model="user.password" prepend-icon="lock"
               :disabled="token ? true : false" name="password"
               label="Password"
               id="password"
               :type="show ? 'text' : 'password'"
               required
               :rules="[rules.required]"
               @click:append="show = !show"></v-text-field>
              <v-card-actions>
                <Recaptcha @recaptchaToken="getRecaptchaToken"></Recaptcha>
                <v-btn :disabled="!valid" type="submit" color="pink">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Recaptcha from './Recaptcha.vue'
import axios from 'axios'
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
        required: val => !!val || 'This is required'
      }
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
          })
      } else {
        alert('reCAPTCHA not validated')
      }
    },
    getRecaptchaToken (recaptchaResponse) {
      axios.post('http://127.0.0.1:8000/api/v1/usuarios/verifyrecaptcha/', { recaptcha: recaptchaResponse })
        .then(res => {
          this.recaptcha = res.data.success
        })
        .catch(err => {
          console.log('getRecaptchaToken error: ' + err)
        })
    }
  },
  computed: {
    token () { // To validate if login
      return this.$store.state.token
    }
  }
}
</script>
