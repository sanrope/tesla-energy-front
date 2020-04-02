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
          <v-dialog v-slot:top v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">One Title</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.username" label="first name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.first_name" label="last name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.last_name" label="username (g)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.email" label="email (g)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.is_active" label="active (g)"></v-text-field>
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
        <v-btn @click="getUsers" >GET</v-btn>
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
      dialog: true,
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
      users: []
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    getUsers () {
      this.$store.dispatch('obtainUsers')
        .then(res => {
          this.users = this.$store.getters.getUsers
        })
    },
    editUser (item) {
      console.log(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteUser (item) {
      console.log(item)
    },
    close () {
    },
    save () {
    }
  }
}
</script>
