<template>
  <div>
    <v-container style="min-height: 100vh" >
      <v-row align="center"
      justify="center">
        <v-col cols="12" sm="10" md="6">
          <v-hover v-slot:default="{ hover }" open-delay="100" close-delay="250">
            <v-card
              :elevation="hover ? 24 : 0"
              class="mx-auto pa-6"
            >
              <v-card-text >
                <p class="display-1 text--primary">User registration</p>
              </v-card-text>
              <v-form v-model="valid">
                <v-row>
                  <v-col>
                    <v-divider></v-divider>
                    <v-text-field
                    v-model="client.first_name"
                    prepend-inner-icon="assignment_ind"
                    name="first_name"
                    label="Name"
                    type="text"
                    solo
                    required
                    :rules="[rules.required]"></v-text-field>
                    <v-text-field
                    v-model="client.last_name"
                    prepend-inner-icon="assignment_ind"
                    name="last_name"
                    label="Last Name"
                    type="text"
                    solo
                    required
                    :rules="[rules.required]"></v-text-field>
                    <v-text-field
                    v-model="client.cedula"
                    prepend-inner-icon="recent_actors"
                    name="cedula"
                    label="ID"
                    type="number"
                    solo
                    required
                    :rules="[rules.required]"></v-text-field>
                    <v-text-field
                    v-model="client.email"
                    prepend-inner-icon="email"
                    name="email"
                    label="Email"
                    type="text"
                    solo
                    required
                    :rules="[rules.required, rules.email]"></v-text-field>
                    <v-btn @click="register" :disabled="!valid">send</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      client: {
        cedula: null,
        first_name: null,
        last_name: null,
        email: null
      },
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      valid: true
    }
  },
  methods: {
    register () {
      this.$store.dispatch('registerClient', this.client)
        .then(res => {
          alert('User registered successfully')
          this.clearForm()
        })
        .catch(err => {
          console.log('register error: ' + err)
        })
    },
    clearForm () {
      this.client.username = null
      this.client.first_name = null
      this.client.last_name = null
      this.client.email = null
      this.client.password = null
      this.client.password_validate = null
      this.client.rol = null
    }
  }
}
</script>
