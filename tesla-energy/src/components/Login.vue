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
                    <v-text-field v-model="user.username" prepend-icon="person" name="login" label="Login" type="text" required></v-text-field>
                    <v-text-field v-model="user.password" prepend-icon="lock" name="password" label="Password" id="password" type="password" required></v-text-field>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn type="submit" color="pink">Login</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
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
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.user)
        .then(response => {
          this.success = true
          this.$router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
