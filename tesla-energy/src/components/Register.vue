<template>
  <div>
    <v-container style="min-height: 100vh" align-center justify-center >
    <v-row>
      <v-col cols="12" sm="10" md="6">
        <v-hover >
            <template v-slot="{ hover }">
              <v-card
                :elevation="hover ? 24 : 0"
                class="mx-auto pa-6"
              >
                <v-form>
                  <v-row>
                    <v-col cols="12">
                    </v-col>
                  </v-row>
                </v-form>
              </v-card>
            </template>
        </v-hover>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'register',
  props: {
    msg: String
  },
  data () {
    return {
      root: false
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
