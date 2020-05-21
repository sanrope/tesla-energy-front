<template>
  <v-container style="min-height: 80vh" >
    <v-row justify="center">
      <v-col cols="12" sm="10" md="6">
        <v-card
          hover
          class="mx-auto pa-6"
          :color="user.rol === 'OP' ? 'indigo' : user.rol === 'GE' ? '#757de8' : 'white'"
        >
          <h1>{{ $t("registerUser.title") }}</h1>
          <p>{{ $t("registerUser.create") }}</p>
          <v-form ref="UserRegistrationForm" v-model="valid">
            <v-row>
              <v-col>
                <v-select outlined
                 :label="$t('registerUser.userType.user')"
                 v-model="user.rol"
                 :rules="[rules.required]"
                 :items="items_box">
                </v-select>
                <v-divider></v-divider>
                <v-text-field
                v-model="user.first_name"
                prepend-inner-icon="assignment_ind"
                name="first_name"
                :label="$t('registerUser.name')"
                type="text"
                solo
                required
                :rules="[rules.required]"></v-text-field>
                <v-text-field
                v-model="user.last_name"
                prepend-inner-icon="assignment_ind"
                name="last_name"
                :label="$t('registerUser.lastName')"
                type="text"
                solo
                required
                :rules="[rules.required]"></v-text-field>
                <v-text-field
                v-model="user.username"
                prepend-inner-icon="person"
                name="username"
                :label="$t('registerUser.userName')"
                type="text"
                solo
                required
                :rules="[rules.required]"></v-text-field>
                <v-text-field
                v-model="user.email"
                prepend-inner-icon="email"
                name="email"
                :label="$t('registerUser.email')"
                type="text"
                solo
                required
                :rules="[rules.required, rules.email]"></v-text-field>
                <v-text-field
                v-model="user.password"
                prepend-inner-icon="https"
                name="password"
                :label="$t('registerUser.password')"
                type="password"
                solo
                required
                :rules="[rules.required, rules.min_pass]"></v-text-field>
                <v-text-field
                v-model="user.password2"
                prepend-inner-icon="https"
                name="password2"
                :label="$t('registerUser.passwordConfirmation')"
                type="password"
                solo
                :hint="$t('registerUser.passwordHint')"
                required
                :rules="[rules.required, rules.password_val]"></v-text-field>
                <v-btn @click="register" :disabled="!valid">{{ $t("registerUser.sendButton") }}</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { i18n } from '../plugins/i18n.js'

export default {
  name: 'RegisterUser',
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
          text: i18n.t('registerUser.userType.manager'), value: 'GE'
        },
        {
          text: i18n.t('registerUser.userType.operator'), value: 'OP'
        }
      ],
      rules: {
        required: value => !!value || i18n.t('registerUser.fieldRequired'),
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || i18n.t('registerUser.invalidEmail')
        },
        password_val: value => this.user.password === value || i18n.t('registerUser.passwordMatch'),
        min_pass: value => !value ? '' : value.length >= 8 || i18n.t('registerUser.passwordCharacters')
      },
      valid: true
    }
  },
  methods: {
    register () {
      this.$store.dispatch('registerUser', this.user)
        .then(res => {
          alert(i18n.t('registerUser.registered'))
          this.clearForm()
        })
        .catch(err => {
          console.log(i18n.t('registerUser.registerError') + err)
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
