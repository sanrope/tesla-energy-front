<template>
    <v-app id="inspire">
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
                  <v-form @submit.prevent="login()">
                    <v-text-field v-model="user.username" prepend-icon="person" name="login" label="Login" :disabled="token ? true : false" type="text" required></v-text-field>
                    <v-text-field :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" v-model="user.password" prepend-icon="lock" :disabled="token ? true : false" name="password" label="Password" id="password" :type="show ? 'text' : 'password'" required @click:append="show = !show"></v-text-field>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn :disabled="token ? true : false" type="submit" color="pink">Login</v-btn>
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
    </v-app>
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
      message: null,
      time_snack: 5500
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.user)
        .then(response => {
          this.$store.dispatch('getProfile', this.user.username)
          this.$router.push({ path: '/profile' })
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
