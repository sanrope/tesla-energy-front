<template lang="html">

  <v-container style="min-height: 80vh">
    <v-snackbar v-model="snack" top right multi-line :timeout=6000 color="success">
      Updated!
      <v-btn color="white" flat @click="snack = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snack2" top right multi-line :timeout=6000 color="error">
      Please check your input
      <v-btn color="white" flat @click="snack = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="6">
        <v-card hover>
          <v-container grid-list-xs,sm,md,lg,xl>
            <h1>{{ $t("profile.title") }}</h1>
            <p>{{ $t("profile.edit") }}</p>
            <v-form>
              <v-text-field
                v-model="profile.username" prepend-icon="person"
                name="name"
                :label="$t('profile.userName')"
                type="text"
                disabled></v-text-field>
              <v-text-field
                v-model="profile.first_name"
                prepend-icon="person"
                name="first_name"
                :label="$t('profile.name')"
                type="text"
                required></v-text-field>
                <v-text-field
                v-model="profile.last_name"
                prepend-icon="person"
                name="last_name"
                :label="$t('profile.lastName')"
                type="text"
                required></v-text-field>
                <v-text-field
                v-model="profile.password"
                prepend-icon="person"
                name="password"
                :label="$t('profile.password')"
                type="password"
                disabled></v-text-field>
              <v-text-field
                v-model="profile.email"
                prepend-icon="email"
                name="email"
                :label="$t('profile.email')"
                type="email"
                required></v-text-field>
                <v-text-field
                v-model="profile.rol"
                prepend-icon="email"
                name="rol"
                :label="$t('profile.position')"
                type="text"
                disabled></v-text-field>
            </v-form>
            <v-btn color="pink" @click="updateProfile">{{ $t("profile.update") }}</v-btn>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import { i18n } from '../plugins/i18n.js'

export default {
  name: 'Profile',
  data () {
    return {
      confirm: null,
      snack: false,
      snack2: false,
      active: null
    }
  },
  methods: {
    updateProfile () {
      var newUser = {
        username: this.profile.username,
        password: this.profile.password,
        first_name: this.profile.first_name,
        last_name: this.profile.last_name,
        email: this.profile.email,
        rol: this.profile.rol
      }
      this.$store.dispatch('updateUser', newUser)
        .then(res => {
          alert(i18n.t('profile.updated'))
        })
        .catch(err => {
          alert(i18n.t('profile.updateError') + err.detail)
        })
    }
  },
  computed: {
    profile () {
      return this.$store.getters.getProfile
    }
  },
  beforeCreate () {
    this.$store.dispatch('getProfile')
  }
}
</script>
<style lang="css" scoped>
</style>
