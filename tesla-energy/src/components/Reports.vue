<template>
  <v-container>

    <v-row justify="center">
      <v-col cols="4">
        <ReportDonut></ReportDonut>
      </v-col>
      <v-col cols="4">
        <ReportBar></ReportBar>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn @click="downloadUserReport">Download Users Report as PDF</v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="8">
        <v-card>
          <v-card-title>
            Users:
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table id='table'
            :headers='userReport.headers'
            :items='userData'
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="downloadClientReport">Download Clients Report as PDF</v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="8">
        <v-card>
          <v-card-title>
            Clients:
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table id='table'
            :headers='clientReport.headers'
            :items='clientData'
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col>
        <ReportBar></ReportBar>
      </v-col>
      <v-col>
        <ReportBubble></ReportBubble>
      </v-col>
      <v-col>
        <ReportColumn></ReportColumn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ReportDonut></ReportDonut>
      </v-col>
      <v-col>
        <ReportHeatmap></ReportHeatmap>
      </v-col>
      <v-col>
        <ReportLine></ReportLine>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ReportMixed></ReportMixed>
      </v-col>
      <v-col>
        <ReportRadialBar></ReportRadialBar>
      </v-col>
      <v-col>
        <ReportScatter></ReportScatter>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>

import * as JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import ReportBar from './reports/ReportBar.vue'
// import ReportBubble from './reports/ReportBubble.vue'
// import ReportColumn from './reports/ReportColumn.vue'
import ReportDonut from './reports/ReportDonut.vue'
// import ReportHeatmap from './reports/ReportHeatmap'
// import ReportLine from './reports/ReportLine'
// import ReportMixed from './reports/ReportMixed'
// import ReportRadialBar from './reports/ReportRadialBar'
// import ReportScatter from './reports/ReportScatter'

export default {
  name: 'Reports',
  components: {
    ReportBar,
    // ReportBubble,
    // ReportColumn,
    ReportDonut
    // ReportHeatmap,
    // ReportLine,
    // ReportMixed,
    // ReportRadialBar,
    // ReportScatter
  },
  data: () => ({
    search: '',
    userReport: {
      headers: [
        {
          text: 'Username',
          align: 'start',
          sortable: false,
          value: 'username'
        },
        { text: 'Name', value: 'name' },
        { text: 'Lastname', value: 'lastname' },
        { text: 'E-mail', value: 'email' },
        { text: 'State', value: 'state' },
        { text: 'User Type', value: 'userType' }
      ],
      data: []
    },
    clientReport: {
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        { text: 'Name', value: 'name' },
        { text: 'Lastname', value: 'lastname' },
        { text: 'E-mail', value: 'email' },
        { text: 'User Type', value: 'clientType' },
        { text: 'State', value: 'state' }
      ],
      data: []
    }
  }),
  methods: {
    downloadUserReport () {
      var pdf = new JsPDF()

      var tableHeaders = this.userReport.headers
      var tableHead = [[]]
      for (var i = 0; i < tableHeaders.length; i++) {
        tableHead[0].push(tableHeaders[i].text)
      }

      var tableData = this.userData
      var tableBody = []
      var rowData = []
      for (var j = 0; j < tableData.length; j++) {
        rowData.push(tableData[j].username)
        rowData.push(tableData[j].name)
        rowData.push(tableData[j].lastname)
        rowData.push(tableData[j].email)
        rowData.push(tableData[j].state)
        rowData.push(tableData[j].userType)
        tableBody.push(rowData)
        rowData = []
      }

      autoTable(pdf, { head: tableHead, body: tableBody })
      pdf.save('user_report.pdf')
    },
    downloadClientReport () {
      var pdf = new JsPDF()

      var tableHeaders = this.clientReport.headers
      var tableHead = [[]]
      for (var i = 0; i < tableHeaders.length; i++) {
        tableHead[0].push(tableHeaders[i].text)
      }

      var tableData = this.clientData
      var tableBody = []
      var rowData = []
      for (var j = 0; j < tableData.length; j++) {
        rowData.push(tableData[j].id)
        rowData.push(tableData[j].name)
        rowData.push(tableData[j].lastname)
        rowData.push(tableData[j].email)
        rowData.push(tableData[j].clientType)
        rowData.push(tableData[j].state)
        tableBody.push(rowData)
        rowData = []
      }

      autoTable(pdf, { head: tableHead, body: tableBody })
      pdf.save('client_report.pdf')
    }
  },
  computed: {
    userData () {
      const users = this.$store.getters.getUsers
      var data = []
      var obj = {}
      for (var i = 0; i < users.length; i++) {
        obj.username = users[i].username
        obj.name = users[i].first_name
        obj.lastname = users[i].last_name
        obj.email = users[i].email
        obj.state = users[i].is_active
        obj.userType = users[i].rol
        data.push(obj)
        obj = {}
      }
      return data
    },
    clientData () {
      const clients = this.$store.getters.getClients
      var data = []
      var obj = {}
      for (var i = 0; i < clients.length; i++) {
        obj.id = clients[i].id
        obj.name = clients[i].first_name
        obj.lastname = clients[i].last_name
        obj.email = clients[i].email
        obj.state = clients[i].is_active
        obj.clientType = clients[i].type
        data.push(obj)
        obj = {}
      }
      return data
    }
  },
  beforeCreate () {
    this.$store.dispatch('getUsers')
    this.$store.dispatch('obtainClients')
  }
}

</script>
