<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <vue-recaptcha
      ref="recaptcha"
      :loadRecaptchaScript="true"
      @verify="onVerify"
      @expired="onExpired"
      @error="onError"
      sitekey="6Lewz-YUAAAAAA5_K5TwntsVncsJzm3XaUgDDadO">
    </vue-recaptcha>
    <v-card-actions>
      <v-btn text v-on:click="resetRecaptcha">Reset reCAPTCHA</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  name: 'Recaptcha',
  components: {
    'vue-recaptcha': VueRecaptcha
  },
  methods: {
    onVerify: function (recaptchaResponse) {
      this.$emit('recaptchaToken', recaptchaResponse)
    },
    onExpired: function () {
      console.log('reCAPTCHA token has expired')
      this.$refs.recaptcha.reset()
    },
    onError: function () {
      console.log('reCAPTCHA error')
      this.$refs.recaptcha.reset()
    },
    resetRecaptcha: function () {
      this.$refs.recaptcha.reset()
    }
  }
}
</script>
