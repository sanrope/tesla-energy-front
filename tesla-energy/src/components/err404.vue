<template>
    <v-container text-center>
        <v-row >
            <v-col cols="12" >
                <h1>
                    Oh no, Eddison did it again, that page doesn't be here..
                </h1>
                </v-col>
                <v-col cols="12" >
                <img :src="require('../assets/tesla_404.png')"/>
            </v-col>
            <v-col cols="12" >
                 <v-img :src="require('../assets/tesla_firm.png')"/>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Err404'
}
</script>

<style>

</style>
