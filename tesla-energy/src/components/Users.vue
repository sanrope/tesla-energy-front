<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="11">
        <v-card hover>
          <v-card-title class="display-2">
            {{ $t("users.title") }}
          <v-spacer></v-spacer>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="$t('users.search')"
              single-line
              hide-details
          ></v-text-field>
          </v-card-title>
          <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editUser(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteUser(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
          <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ $t("users.editUser") }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field :disabled="true" v-model="editedItem.username" :label="$t('users.userName')"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.first_name" :label="$t('users.name')"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.last_name" :label="$t('users.lastName')"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.email" :label="$t('users.email')"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select :items="items_box" v-model="editedItem.is_active" :label="$t('users.state')"></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.rol" :label="$t('users.userType')"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                        :label="$t('users.userType')"
                        v-model="editedItem.rol"
                        :items="items_box1">
                      </v-select>
                    </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">{{ $t("users.cancel") }}</v-btn>
                  <v-btn color="blue darken-1" text @click="save">{{ $t("users.save") }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { i18n } from '../plugins/i18n.js'

export default {
  name: 'Users',
  data () {
    return {
      search: '',
      dialog: false,
      headers: [
        { text: i18n.t('users.userName'), value: 'username' },
        { text: i18n.t('users.name'), value: 'first_name' },
        { text: i18n.t('users.lastName'), value: 'last_name' },
        { text: i18n.t('users.email'), value: 'email' },
        { text: i18n.t('users.state'), value: 'is_active' },
        { text: i18n.t('users.userType'), value: 'rol' },
        { text: i18n.t('users.editUser'), value: 'actions' }
      ],
      editedItem: {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        rol: '',
        is_active: ''
      },
      items_box: [
        {
          text: i18n.t('users.activeUser'), value: true
        },
        {
          text: i18n.t('users.inactiveUser'), value: false
        }],
      items_box1: [
        {
          text: 'Gerente', value: 'GE'
        },
        {
          text: 'Operador', value: 'OP'
        }
      ]
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    getUsers () {
      this.$store.dispatch('getUsers')
        .then(res => {
          this.users = this.$store.getters.getUsers
        })
    },
    editUser (item) {
      this.dialog = true
      this.editedItem = Object.assign({}, item)
    },
    deleteUser (item) {
      this.editedItem = Object.assign({}, item)
      this.editedItem.is_active = false
      this.save()
    },
    close () {
      this.dialog = false
    },
    async save () {
      var newUser = {
        username: this.editedItem.username,
        password: this.editedItem.password,
        first_name: this.editedItem.first_name,
        last_name: this.editedItem.last_name,
        email: this.editedItem.email,
        rol: this.editedItem.rol,
        is_active: this.editedItem.is_active
      }
      await this.$store.dispatch('updateUser', newUser)
      this.$store.dispatch('getUsers')
      this.close()
    }
  },
  computed: {
    users () {
      return this.$store.getters.getUsers
    }
  },
  beforeCreate () {
    this.$store.dispatch('getUsers')
  }
}
</script>
