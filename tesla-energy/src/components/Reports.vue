<template>
  <v-container>

    <v-row>
      <v-col>
        <v-btn @click="downloadRandomReport">Download Random Report as PDF</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Random:
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
            :headers='randomReport.headers'
            :items='randomReport.data'
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn @click="downloadUserReport">Download User Report as PDF</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
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
            :items='userReport.data'
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
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
    </v-row>
  </v-container>
</template>

<script>

import * as JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import ReportBar from './reports/ReportBar.vue'
import ReportBubble from './reports/ReportBubble.vue'
import ReportColumn from './reports/ReportColumn.vue'
import ReportDonut from './reports/ReportDonut.vue'
import ReportHeatmap from './reports/ReportHeatmap'
import ReportLine from './reports/ReportLine'
import ReportMixed from './reports/ReportMixed'
import ReportRadialBar from './reports/ReportRadialBar'
import ReportScatter from './reports/ReportScatter'

export default {
  name: 'Reports',
  components: {
    ReportBar,
    ReportBubble,
    ReportColumn,
    ReportDonut,
    ReportHeatmap,
    ReportLine,
    ReportMixed,
    ReportRadialBar,
    ReportScatter
  },
  data: () => ({
    search: '',
    randomReport: {
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        }
      ]
    },
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
      data: [
        {
          username: 'admin',
          name: 'admin',
          lastname: 'admin',
          email: 'admin@mail.com',
          state: 'active',
          userType: 'AD'
        }
      ]
    }
  }),
  methods: {
    downloadRandomReport () {
      var pdf = new JsPDF()

      var tableHeaders = this.randomReport.headers
      var tableHead = [[]]
      for (var i = 0; i < tableHeaders.length; i++) {
        tableHead[0].push(tableHeaders[i].text)
      }

      var tableData = this.randomReport.data
      var tableBody = []
      var rowData = []
      for (var j = 0; j < tableData.length; j++) {
        rowData.push(tableData[j].name)
        rowData.push(tableData[j].calories)
        rowData.push(tableData[j].fat)
        rowData.push(tableData[j].carbs)
        rowData.push(tableData[j].protein)
        rowData.push(tableData[j].iron)
        tableBody.push(rowData)
        rowData = []
      }

      autoTable(pdf, { head: tableHead, body: tableBody })
      pdf.save('random_report.pdf')
    },
    downloadUserReport () {
      var pdf = new JsPDF()

      var tableHeaders = this.userReport.headers
      var tableHead = [[]]
      for (var i = 0; i < tableHeaders.length; i++) {
        tableHead[0].push(tableHeaders[i].text)
      }

      var tableData = this.userReport.data
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
    }
  }
}

</script>

<style>
</style>
