import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.headers.common.Acept = 'aplication/json'
const headers = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
    'Access-Control-Allow-Credentials': '*',
    'Access-Control-Allow-Headers': 'origin, content-type',
    Authorization: null
  }
}

Vue.use(Vuex)

export const URL_API = 'http://localhost:8000/'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    profile: {}
  },
  getters: {
    isAuthenticated (state) {
      return state.token !== null
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setProfile (state, profile) {
      state.profile = profile
    }
  },
  actions: {
    login (context, user) {
      return new Promise((resolve, reject) => {
        axios.post(URL_API + 'api/v1/auth-jwt/', user)
          .then(res => {
            const token = res.data.token
            console.log(res)
            if (token) {
              headers.headers.Authorization = 'JWT ' + token
              localStorage.setItem('access_token', token)
              this.commit('setToken', token)
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
    },
    getProfile (context, username) {
      return new Promise((resolve, reject) => {
        axios.get(URL_API + 'api/v1/usuarios/', headers)
          .then(res => {
            console.log(res.data)
            this.commit('setProfile', res.data)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    registerUser (context, user) {
      return new Promise((resolve, reject) => {
        axios.post(URL_API + 'api/v1/usuarios/create/', user, headers)
          .then(res => {
            console.log(res.data)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          }
          )
      })
    }
  },
  modules: {
  }
})
