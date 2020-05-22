<template lang="html">

  <v-container grid-list-xs,sm,md,lg,xl>
    <v-snackbar v-model="snack" top right multi-line :timeout=6000 color="success">
      Updated!
      <v-btn color="white" flat @click="snack = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snack2" top right multi-line :timeout=6000 color="error">
      Please check your input
      <v-btn color="white" flat @click="snack = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-tabs v-model="active" color="dark" slider-color="primary">
      <v-tab>
        {{ $t("payments.title") }}
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <h1>{{ $t("payments.title") }}</h1>
            <p>{{ $t("payments.subtitle") }}</p>
            <v-form>
              <v-text-field
                v-model="idinvoice"
                prepend-icon="person"
                name="id_factura"
                :label="$t('payments.idfactura')"
                type="number"
                required></v-text-field>
            </v-form>
            <v-btn color="pink" @click="getFactura">{{ $t("payments.boton1") }}</v-btn>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t("payments.titleForm") }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field :disabled="true" v-model="invoicetopay.id" :label="$t('payments.idfactura')"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field :disabled="true" v-model="invoicetopay.dateGenerated" :label="$t('payments.dateGenerated')"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field :disabled="true" v-model="invoicetopay.expireDate" :label="$t('payments.expireDate')"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field :disabled="true" v-model="invoicetopay.totalConsumed" :label="$t('payments.totalConsumed')"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field :disabled="true" v-model="invoicetopay.amount" :label="$t('payments.amount')"></v-text-field>
              </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">{{ $t("users.cancel") }}</v-btn>
        <v-btn color="blue darken-1" text @click="pay">{{ $t("payments.save") }}</v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>

import { i18n } from '../plugins/i18n.js'

export default {
  name: 'Payments',
  data () {
    return {
      idinvoice: null,
      invoicetopay: {
        id: null,
        dateGenerated: null,
        expireDate: null,
        amount: null,
        totalConsumed: null
      },
      confirm: null,
      snack: false,
      snack2: false,
      active: null,
      dialog: false
    }
  },
  methods: {
    getFactura () {
      this.dialog = true
      this.$store.dispatch('getInvoice', this.idinvoice)
        .then(res => {
          this.invoicetopay = res.data
          this.dialog = true
          console.log(this.invoicetopay)
          // alert(i18n.t('profile.updated'))
        })
        .catch(err => {
          alert(i18n.t('profile.updateError') + err.detail)
        })
    },
    close () {
      this.dialog = false
    },
    pay () {
      this.$store.dispatch('pay', this.invoicetopay.id)
        .then(res => {
          alert('Pago realizado con exito')
          this.dialog = false
        })
        .catch(err => {
          alert('No se pudo realizar el pago ' + err)
        })
    }
  },
  computed: {
  },
  beforeCreate () {
  }
}
</script>
<style lang="css" scoped>
</style>
