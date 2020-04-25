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
              :color="user.rol === 'OP' ? 'indigo' : user.rol === 'GE' ? '#757de8' : 'white'"
            >
              <v-card-text >
                <p class="display-1 text--primary">User registration</p>
              </v-card-text>
              <v-form ref="UserRegistrationForm" v-model="valid">
                <v-row>
                  <v-col>
                    <v-select outlined
                     label="User type"
                     v-model="user.rol"
                     :rules="[rules.required]"
                     :items="items_box"></v-select
                    >
                    <v-divider></v-divider>
                    <v-text-field
                    v-model="user.first_name"
                    prepend-inner-icon="assignment_ind"
                    name="first_name"
                    label="Name"
                    type="text"
                    solo
                    required
                    :rules="[rules.required]"></v-text-field>
                    <v-text-field
                    v-model="user.last_name"
                    prepend-inner-icon="assignment_ind"
                    name="last_name"
                    label="Last Name"
                    type="text"
                    solo
                    required
                    :rules="[rules.required]"></v-text-field>
                    <v-text-field
                    v-model="user.username"
                    prepend-inner-icon="person"
                    name="username"
                    label="Username"
                    type="text"
                    solo
                    required
                    :rules="[rules.required]"></v-text-field>
                    <v-text-field
                    v-model="user.email"
                    prepend-inner-icon="email"
                    name="email"
                    label="Email"
                    type="text"
                    solo
                    required
                    :rules="[rules.required, rules.email]"></v-text-field>
                    <v-text-field
                    v-model="user.password"
                    prepend-inner-icon="https"
                    name="password"
                    label="Password"
                    type="password"
                    solo
                    required
                    :rules="[rules.required, rules.min_pass]"></v-text-field>
                    <v-text-field
                    v-model="user.password2"
                    prepend-inner-icon="https"
                    name="password2"
                    label="Password Again"
                    type="password"
                    solo
                    hint="Repeat your password"
                    required
                    :rules="[rules.required, rules.password_val]"></v-text-field>
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
  name: 'RegisterUsers',
  data () {
    return {
      user: {
        username: null,
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        password_validate: null,
        rol: null
      },
      items_box: [
        {
          text: 'Manager', value: 'GE'
        },
        {
          text: 'Operator', value: 'OP'
        }
      ],
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        password_val: value => this.user.password === value || 'Password not coincedence',
        min_pass: value => !value ? '' : value.length >= 8 || 'Min 8 characters'
      },
      valid: true
    }
  },
  methods: {
    register () {
      this.$store.dispatch('registerUser', this.user)
        .then(res => {
          alert('User registered successfully')
          this.clearForm()
        })
        .catch(err => {
          console.log('register error: ' + err)
        })
    },
    clearForm () {
      this.$refs.UserRegistrationForm.reset()
      this.$refs.UserRegistrationForm.resetValidaton()
      //  Esta es una manera mas comoda de hacerlo look up.
      /* this.user.username = null
      this.user.first_name = null
      this.user.last_name = null
      this.user.email = null
      this.user.password = null
      this.user.password_validate = null
      this.user.rol = null */
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
