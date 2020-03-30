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
            <h1>CLIENT PROFILE</h1>
            <v-form>
              <v-text-field
                v-model="user.cliusuario" prepend-icon="person"
                name="name"
                label="Username"
                type="text"
                disabled></v-text-field>
              <v-text-field
                v-model="user.clinombre"
                prepend-icon="person"
                name="name"
                label="Name"
                type="text"
                required></v-text-field>
              <v-text-field
                v-model="user.clicorreo"
                prepend-icon="email"
                name="email"
                label="email"
                type="email"
                required></v-text-field>
              <v-text-field
                v-model="user.clifechanac"
                prepend-icon="add_location"
                name="birthday" label="birthday"
                type="date"
                required></v-text-field>
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
  data () {
    return {
      user: {
        username: null,
        name: null,
        email: null,
        date: null,
        password: null
      },
      confirm: null,
      snack: false,
      snack2: false,
      active: null
    }
  },
  methods: {
    updateProfile () {
    }
  }
}
</script>
<style lang="css" scoped>
</style>
