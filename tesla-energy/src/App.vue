<template>
  <div id="app">
    <v-app id="inspire">

      <!-- Navigation drawer (left column)-->
      <v-navigation-drawer v-model="drawer" mobile-break-point="1000" app fixed>
        <v-row>
          <v-list-item>
            <v-list-item-action>
              <v-img
              :src="require('./assets/tesla_coil.svg')"
              contain
              transition="scale-transition"
              max-width="40"
              min-width="40"
              />
            </v-list-item-action>
            <v-list-item-title>
              Tesla Energy
            </v-list-item-title>
         </v-list-item>
        </v-row>
        <v-divider inset></v-divider>
        <v-list dense>
          <v-list-item-group mandatory color="indigo">
          <v-list-item to="/" link ripple>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t("menu.home") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token == null" to="/login" link ripple>
            <v-list-item-action>
              <v-icon>portrait</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t("home.login") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token != null && rol == 'AD'" to="/register-user" link ripple>
            <v-list-item-action>
              <v-icon>person_add</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t("menu.userRegistration") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token != null && rol == 'AD'" to="/users" link ripple>
            <v-list-item-action>
              <v-icon>group</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t("menu.users") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token != null && rol == 'OP'" to="/register-client" link ripple>
            <v-list-item-action>
              <v-icon>person_add</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t("menu.clientRegistration") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token != null && rol == 'OP'" to="/clients" link ripple>
            <v-list-item-action>
              <v-icon>supervisor_account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t("menu.clients") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token != null" to="/profile" link ripple>
            <v-list-item-action>
              <v-icon>perm_identity</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t("menu.profile") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="token != null && rol == 'AD'" to="/client" link ripple>
            <v-list-item-action>
              <v-icon>assignment</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Invoice</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="token != null && rol== 'AD'" to="/map" link ripple>
            <v-list-item-action>
              <v-icon>map</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t("menu.assets") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="token != null" @click="logout" link ripple>
            <v-list-item-action>
              <v-icon>eject</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t("menu.logout") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <!-- App bar (top row bar) -->
      <v-app-bar app :color="color_app" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <!-- <div class="d-flex align-center">
            <v-img
            :src="require('./assets/tesla_coil.svg')"
            contain
            transition="scale-transition"
            max-width="50"
            min-width="50"
            />
        </div>
        <v-toolbar-title>Tesla Energy</v-toolbar-title> -->
        <v-spacer></v-spacer>

        <!-- Language Switcher -->
        <v-btn class="mx-0" right large icon @click="changeLang('en_US')">
          <country-flag country='us' size='normal'/>
        </v-btn>
        <v-btn class="mx-0" large icon @click="changeLang('es_ES')">
          <country-flag country='es' size='normal' />
        </v-btn>
        <v-btn class="mx-0" large icon @click="changeLang('pt_BR')">
          <country-flag country='br' size='normal'/>
        </v-btn>
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

import CountryFlag from 'vue-country-flag'

export default {
  name: 'App',
  components: {
    CountryFlag
  },
  data: () => ({
    drawer: null,
    message: null,
    time_snack: 5500,
    color_app: '#002984',
    languages: ['en_US', 'es_ES', 'pt_BR']
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
    },
    changeLang (lang) {
      this.$i18n.locale = lang
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
