import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const URL_API = 'http://localhost:8000/api/'

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
      axios.post(URL_API + 'users', user)
        .then(res => {
          const token = res.data.token
          if (token) {
            localStorage.setItem('access_token', token)
            this.commit('setToken', token)
          } else {
            alert(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
