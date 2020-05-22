<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="11">
        <v-card hover>
          <v-card-title class="display-2">
            {{ $t("clients.title") }}
          <v-spacer></v-spacer>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="$t('clients.search')"
              single-line
              hide-details
          ></v-text-field>
          </v-card-title>
          <v-data-table
          :headers="headers"
          :items="clients"
          :search="search"
          mobile-breakpoint="810"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editClient(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteClient(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ $t("clients.editClient") }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field :disabled="true" v-model="editedItem.id" label="ID"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.first_name" :label="$t('clients.name')"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.last_name" :label="$t('clients.lastName')"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.email" :label="$t('clients.email')"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-select
                      :label="$t('clients.clientType')"
                      v-model="editedItem.type"
                      :items="items_box1">
                    </v-select>
                  </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select :items="items_box" v-model="editedItem.is_active" :label="$t('clients.state')"></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">{{ $t("clients.cancel") }}</v-btn>
                <v-btn color="blue darken-1" text @click="save">{{ $t("clients.save") }}</v-btn>
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
  name: 'Clients',
  data () {
    return {
      search: '',
      dialog: false,
      headers: [
        { text: i18n.t('clients.id'), value: 'id' },
        { text: i18n.t('clients.name'), value: 'first_name' },
        { text: i18n.t('clients.lastName'), value: 'last_name' },
        { text: i18n.t('clients.email'), value: 'email' },
        { text: i18n.t('clients.clientType'), value: 'type' },
        { text: i18n.t('clients.state'), value: 'is_active' },
        { text: i18n.t('clients.editClient'), value: 'actions' }
      ],
      editedItem: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        type: '',
        is_active: ''
      },
      items_box: [
        {
          text: i18n.t('clients.activeClient'), value: true
        },
        {
          text: i18n.t('clients.inactiveClient'), value: false
        }],
      items_box1: [
        {
          text: 'Natural', value: 'NA'
        },
        {
          text: 'Corporativo', value: 'CO'
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
    editClient (item) {
      this.dialog = true
      this.editedItem = Object.assign({}, item)
    },
    deleteClient (item) {
      this.editedItem = Object.assign({}, item)
      this.editedItem.is_active = false
      this.save()
    },
    close () {
      this.dialog = false
    },
    async save () {
      var newUser = {
        id: this.editedItem.id,
        first_name: this.editedItem.first_name,
        last_name: this.editedItem.last_name,
        email: this.editedItem.email,
        type: this.editedItem.type,
        is_active: this.editedItem.is_active
      }
      await this.$store.dispatch('updateClients', newUser)
      this.$store.dispatch('obtainClients')
      this.close()
    }
  },
  computed: {
    clients () {
      return this.$store.getters.getClients
    }
  },
  beforeCreate () {
    this.$store.dispatch('obtainClients')
  }
}
</script>
