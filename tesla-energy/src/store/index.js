import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'

Vue.use(Vuex)

export const URL_API = 'http://localhost:8000/'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    profile: {}
  },
  getters: {

  },
  mutations: {
    setToken (state, token) {
      state.token = token
    }
  },
  actions: {
    login (context, user) {
      return new Promise((resolve, reject) => {
        axios.post(URL_API + 'rest-auth/login/', user)
          .then(res => {
            const token = res.data.token
            if (token) {
              localStorage.setItem('access_token', token)
              this.commit('setToken', token)
              alert(token)
              resolve(res)
            } else {
              console.log(res)
            }
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    }
  },
  modules: {
  }
})
