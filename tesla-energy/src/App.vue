<template>
  <div id="app">
    <v-app id="inspire">

      <!-- Navigation drawer (left column)-->
      <!-- v-model="drawer" -->
      <v-navigation-drawer v-model="drawer" mobile-break-point="1000" app fixed>
        <v-row>
          <v-col cols="6">
              <v-img
              :src="require('./assets/tesla_coil.svg')"
              contain
              transition="scale-transition"
              max-width="40"
              min-width="40"
              />
          </v-col>
          <v-col cols="6">
            <v-img
              :src="require('./assets/tesla_firm.png')"
              contain
              transition="scale-transition"
              max-width="500"
              min-width="100"
              />
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item-group mandatory color="indigo">
          <v-list-item to="/" link ripple>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token == null" to="/login" link ripple>
            <v-list-item-action>
              <v-icon>portrait</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token != null && rol == 'AD'" to="/register-user" link ripple>
            <v-list-item-action>
              <v-icon>person_add</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>User Registration</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token != null && rol == 'AD'" to="/users" link ripple>
            <v-list-item-action>
              <v-icon>group</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token != null && rol == 'OP'" to="/register-client" link ripple>
            <v-list-item-action>
              <v-icon>person_add</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Client Registration</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token != null && rol == 'OP'" to="/clients" link ripple>
            <v-list-item-action>
              <v-icon>supervisor_account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Clients</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token != null" to="/profile" link ripple>
            <v-list-item-action>
              <v-icon>perm_identity</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token != null && rol== 'AD'" to="/map" link ripple>
            <v-list-item-action>
              <v-icon>map</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Assets</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token != null" @click="logout" link ripple>
            <v-list-item-action>
              <v-icon>eject</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Log out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <!-- App bar (top row bar) -->
      <v-app-bar app :color="color_app" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
          <div class="d-flex align-center">
              <v-img
              :src="require('./assets/tesla_coil.svg')"
              contain
              transition="scale-transition"
              max-width="40"
              min-width="40"
              />
          </div>
        <v-toolbar-title>Tesla Energy</v-toolbar-title>
      </v-app-bar>

      <!-- Content (center content) -->
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col class="text-center">
              <v-fab-transition>
                <router-view></router-view> <!-- To show the routed views -->
              </v-fab-transition>
              <v-snackbar :value="message ? true : false" color="blue" :timeout="time_snack">
             {{message}}
            </v-snackbar>
            </v-col>
          </v-row>
        </v-container>
      </v-content>

      <!-- Footer (bottom row bar) -->
      <v-footer :color="color_app" app>
        <span class="white--text">&copy; Tesla Energy 2020</span>
      </v-footer>

    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    drawer: null,
    message: null,
    time_snack: 5500,
    color_app: '#002984'
  }),
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          console.log('logout error: ' + err)
          this.message = err
        })
    }
  },
  computed: {
    token () { // To validate if login
      return this.$store.state.token
    },
    rol () {
      return this.$store.state.rol
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
