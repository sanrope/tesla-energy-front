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
            :color="box_value === 'Operador' ? 'indigo' : box_value === 'Cliente' ? '#42b983' : 'white'"
            >
           <v-form>
              <v-row>
                <v-col>
                  <v-select v-model="box_value" :items="items_box"></v-select>
                  <v-divider></v-divider>
                  <v-text-field
                  v-model="user.name"
                  prepend-inner-icon="assignment_ind"
                  name="name"
                  label="Name"
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
                  :rules="[rules.required]"></v-text-field>
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
  name: 'register',
  props: {
    msg: String
  },
  data () {
    return {
      user: {
        username: null,
        name: null,
        email: null,
        password: null,
        password_validate: null
      },
      items_box: ['Operador', 'Cliente'],
      box_value: null,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        password_val: value => this.user.password === value || 'Password not coincedence'
      }
    }
  },
  methods: {
    pass_comparison () {
      if (this.user.password === this.user.password_validate) {
        return true
      } else {
        return false
      }
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
