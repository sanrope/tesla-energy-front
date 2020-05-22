<template>
 <v-container >
    <v-card >
    <v-form>
      <v-col>
        <v-row>
          <v-text-field v-model="idClient" label="Client ID" />
        </v-row>
        <v-row>
          <v-text-field v-model="idMeter" label="Electric Meter ID" />
        </v-row>
        <v-row>
          <v-btn @click="asignConsume" >save</v-btn>
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
        idClient: null,
        idMeter: null
      }
    }
  },
  methods: {
    asignConsume () {
      this.$store.dispatch('registerConsumo', this.consumo)
    }
  }
}
</script>

<style>
</style>
