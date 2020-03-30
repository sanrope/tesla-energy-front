<template>
      <!-- <v-content> -->
        <v-container class="text-xs-center" style="min-height: 100vh" fluid>
          <v-layout align-center justify-center >
            <v-flex xs12 sm10 md6 >
              <v-card class="elevation-20" >
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form
                  v-model="valid"
                  @submit.prevent="login()">
                    <v-text-field
                     v-model="user.username"
                     prepend-icon="person"
                     name="login" label="Login"
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
                      <v-spacer></v-spacer>
                      <v-btn :disabled="!valid" type="submit" color="pink">Login</v-btn>
                     <!--  <v-btn v-if="token != null" color="red" v-on:click="logout"> unlog</v-btn> -->
                    </v-card-actions>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-snackbar :value="token ? true : false" color="green" :timeout="time_snack">
            You login success!
          </v-snackbar>
        </v-container>
      <!-- </v-content> -->
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: null,
        password: null
      },
      show: false,
      valid: true,
      message: null,
      time_snack: 5500,
      rules: {
        required: val => !!val || 'This is required'
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.user)
        .then(response => {
          this.$store.dispatch('getProfile')
          this.$router.push({ path: '/profile' })
          console.log(this.$store.state.token)
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout () {
      this.$store.dispatch('logout', this.$store.state.token)
        .then(response => {
          this.message = response.data.detail
          // this.$router.push({ path: '/register' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  }
}
</script>
