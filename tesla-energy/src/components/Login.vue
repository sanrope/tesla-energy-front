<template>
  <v-container class="text-xs-center" style="min-height: 80vh" fluid>
    <v-layout align-center justify-center >
      <v-flex xs12 sm10 md6 >
        <v-card class="elevation-10" >
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
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" type="submit" color="pink">Login</v-btn>
               <!--  <v-btn v-if="token != null" color="red" v-on:click="logout"> unlog</v-btn> -->
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      show: false,
      valid: true,
      rules: {
        required: val => !!val || 'This is required'
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.user)
        .then(() => {
          // this.$store.dispatch('getProfile')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
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
