<template>
 <v-container >
    <v-card >
    <v-form>
      <v-col>
        <v-card-title>
          <span class="headline">Contrato</span>
        </v-card-title>
        <v-row>
          <v-text-field :v-model="consumo.client" label="Client ID" />
        </v-row>
        <v-row>
          <v-text-field :v-model="consumo.meter" label="Electric Meter ID" />
        </v-row>
        <v-row>
          <v-btn @click="asignConsume" >save</v-btn>
        </v-row>
      </v-col>
    </v-form>
    </v-card>
    <v-card >
    <v-form>
      <v-col>
        <v-card-title>
          <span class="headline">Crear Factura</span>
        </v-card-title>
        <v-row>
          <v-text-field v-model="invoice.totalConsumed" label="Total Consumido" />
        </v-row>
        <v-row>
          <v-text-field v-model="invoice.consumo" label="Contract ID" />
        </v-row>
        <v-row>
          <v-btn @click="createInvoice" >save</v-btn>
        </v-row>
      </v-col>
    </v-form>
    </v-card>
 </v-container>
</template>

<script>
export default {
  name: 'consumo',
  data () {
    return {
      consumo: {
        client: null,
        meter: null
      },
      invoice: {
        totalConsumed: null,
        consumo: null
      }
    }
  },
  methods: {
    asignConsume () {
      this.$store.dispatch('registerConsumo', this.consumo)
        .then(res => {
          alert('Contrato creado')
          this.dialog = false
        })
        .catch(err => {
          alert('No se pudo crear el cotrato ' + err)
        })
    },
    createInvoice () {
      this.$store.dispatch('createInvoice', this.invoice)
        .then(res => {
          alert('Factura creada con exito')
          this.dialog = false
        })
        .catch(err => {
          alert('No se pudo crear la factura ' + err)
        })
    }
  }
}
</script>

<style>
</style>
