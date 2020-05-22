<template>
  <v-container>
    <v-form v-if="!therInvoice">
      <v-col>
        <v-row>
          <v-text-field
          :v-model="Invoice.id"
          type="number"
          label="INVOICE"> </v-text-field>
        </v-row>
        <v-row>
          <v-btn @click="getInvoice">search</v-btn>
        </v-row>
      </v-col>
    </v-form>
    <v-row v-if="therInvoice">
      <div class="invoice-box" id="invoice">
        <table cellpadding="0" cellspacing="0">

          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title">
                    <img src="../assets/tesla_coil.png" style="width:100%; max-width:300px;">
                  </td>
                  <td>
                    Invoice #: 123<br>
                    Created: January 1, 2015<br>
                    Due: February 1, 2015
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td>
                    Generated on: {{dateGenerated}} <br>
                    Valid until: {{expiraDate}} <br>
                    Sunnyville, CA 12345
                  </td>
                  <td>
                    Acme Corp.<br>
                    John Doe<br>
                    john@example.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="heading">
            <td>
              Payment Method
            </td>
            <td>
              Check #
            </td>
          </tr>
          <tr class="details">
            <td>
              Check
            </td>
            <td>
              1000
            </td>
          </tr>

          <tr class="heading">
            <td>
              Item
            </td>
            <td>
              Price
            </td>
          </tr>
          <tr class="item">
            <td>
              Consume
            </td>
            <td>
             {{consume}}
            </td>
          </tr>
          <!-- <tr class="item">
            <td>
              Hosting (3 months)
            </td>
            <td>
              $75.00
            </td>
          </tr> -->
          <tr class="item last">
            <td>
              Total Consume
            </td>
            <td>
             {{totalConsumed}}
            </td>
          </tr>

          <tr class="total">
            <td></td>
            <td>
              Total: {{amount}}
            </td>
          </tr>
        </table>
        <v-row>
      <v-col cols="12">
        <v-btn @click="downloadInvoice">Download Invoce as PDF</v-btn>
      </v-col>
    </v-row>
      </div>
    </v-row>
  </v-container>
</template>

<script>

import html2canvas from 'html2canvas'
import * as JsPDF from 'jspdf'

export default {
  name: 'Invoice',
  data () {
    return {
      Invoice: {
        id: null,
        dateGenerated: null,
        expiraDate: null,
        amount: null,
        totalConsumed: null,
        consume: null
      },
      therInvoice: false
    }
  },
  methods: {
    getInvoice () {
      this.$store.dispatch('getInvoice', this.Invoice.id)
      this.Invoice = Object.assign({}, invoice)
      therInvoice = true
      
    },
    downloadInvoice () {
      html2canvas(document.querySelector('#invoice'), { imageTimeout: 5000, useCORS: true }).then(canvas => {
        const img = canvas.toDataURL('image/png')
        const pdf = new JsPDF()
        pdf.addImage(img, 'PNG', 5, 5, 200, 287)
        pdf.save('Invoice.pdf')
      })
    }
  },
  computed: {
    invoice () {
      return this.$store.getters.getInvoice
    }
  }
}

</script>

<style>

  .invoice-box {
    max-width: 800px;
    margin: auto;
    padding: 30px;
    border: 1px solid #eee;
    box-shadow: 0 0 10px rgba(0, 0, 0, .15);
    font-size: 16px;
    line-height: 24px;
    font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    color: #555;
  }

  .invoice-box table {
    width: 100%;
    line-height: inherit;
    text-align: left;
  }

  .invoice-box table td {
    padding: 5px;
    vertical-align: top;
  }

  .invoice-box table tr td:nth-child(2) {
    text-align: right;
  }

  .invoice-box table tr.top table td {
    padding-bottom: 20px;
  }

  .invoice-box table tr.top table td.title {
    font-size: 45px;
    line-height: 45px;
    color: #333;
  }

  .invoice-box table tr.information table td {
    padding-bottom: 40px;
  }

  .invoice-box table tr.heading td {
    background: #eee;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
  }

  .invoice-box table tr.details td {
    padding-bottom: 20px;
  }

  .invoice-box table tr.item td{
    border-bottom: 1px solid #eee;
  }

  .invoice-box table tr.item.last td {
    border-bottom: none;
  }

  .invoice-box table tr.total td:nth-child(2) {
    border-top: 2px solid #eee;
    font-weight: bold;
  }

  @media only screen and (max-width: 600px) {
    .invoice-box table tr.top table td {
      width: 100%;
      display: block;
      text-align: center;
    }

    .invoice-box table tr.information table td {
      width: 100%;
      display: block;
      text-align: center;
    }
  }

  /** RTL **/
  .rtl {
    direction: rtl;
    font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
  }

  .rtl table {
    text-align: right;
  }

  .rtl table tr td:nth-child(2) {
    text-align: left;
  }

</style>
