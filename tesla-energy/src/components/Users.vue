<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
        System users:
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
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
                <span class="headline">One Title</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.first_name" label="first name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.last_name" label="last name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field :disabled="true" v-model="editedItem.username" label="username"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.email" label="email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select :items="items_box" v-model="editedItem.is_active" label="active"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.rol" label="rol"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
      search: '',
      dialog: false,
      headers: [
        { text: 'Username', value: 'username' },
        { text: 'Name', value: 'first_name' },
        { text: 'Last name', value: 'last_name' },
        { text: 'E-mail', value: 'email' },
        { text: 'State', value: 'is_active' },
        { text: 'Ocupation', value: 'rol' },
        { text: 'Edit user', value: 'actions' }
      ],
      editedItem: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        is_active: '',
        rol: ''
      },
      items_box: [
        {
          text: 'activo', value: true
        },
        {
          text: 'inactivo', value: false
        }]
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
