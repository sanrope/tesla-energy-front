<template lang="html">

  <v-container grid-list-xs,sm,md,lg,xl>
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
    <v-tabs v-model="active" color="dark" slider-color="primary">
      <v-tab>
        Profile
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <h1>PROFILE</h1>
            <v-form>
              <v-text-field
                v-model="profile.username" prepend-icon="person"
                name="name"
                label="Username"
                type="text"
                disabled></v-text-field>
              <v-text-field
                v-model="profile.first_name"
                prepend-icon="person"
                name="first_name"
                label="First Name"
                type="text"
                required></v-text-field>
                <v-text-field
                v-model="profile.last_name"
                prepend-icon="person"
                name="last_name"
                label="Last Name"
                type="text"
                required></v-text-field>
                <v-text-field
                v-model="profile.password"
                prepend-icon="person"
                name="password"
                label="Password"
                type="password"
                disabled></v-text-field>
              <v-text-field
                v-model="profile.email"
                prepend-icon="email"
                name="email"
                label="email"
                type="email"
                required></v-text-field>
                <v-text-field
                v-model="profile.rol"
                prepend-icon="email"
                name="rol"
                label="Rol"
                type="text"
                disabled></v-text-field>
            </v-form>
            <v-btn color="pink" @click="updateProfile">Update</v-btn>
          </v-container>

        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>
<script>
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
          alert('Usuario actualizado' + res)
        })
        .catch(err => {
          alert('Usuario actualizado' + err.detail)
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
