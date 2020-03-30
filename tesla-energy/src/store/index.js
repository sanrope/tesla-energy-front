import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

/* axios.defaults.xsrfCookieName = 'csrftoken'
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
} */

Vue.use(Vuex)

export const URL_API = 'http://localhost:8000/'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    profile: {},
    users: [],
    auth: { headers: null }
  },
  getters: {
    isAuthenticated (state) {
      return state.token !== null
    },
    getUsers (state) {
      return state.users
    },
    getAuth (state) {
      return state.auth
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setProfile (state, profile) {
      state.profile = profile
    },
    setUsers (state, users) {
      state.users = users
    },
    setAuth (state, token) {
      state.auth.headers = { Authorization: 'JWT ' + token }
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
              /*  headers.headers.Authorization = 'JWT ' + token */
              localStorage.setItem('access_token', token)
              context.commit('setToken', token)
              context.commit('setAuth', token)
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
        axios.get(URL_API + 'api/v1/usuarios/', context.getters.getAuth)
          .then(res => {
            console.log(res.data)
            context.commit('setProfile', res.data)
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
        axios.post(URL_API + 'api/v1/usuarios/create/', user, context.getters.getAuth)
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
    },
    obtainUsers (context) {
      return new Promise((resolve, reject) => {
        axios.get(URL_API + 'api/v1/usuarios/', context.getters.getAuth)
          .then(res => {
            context.commit('setUsers', res.data.results)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
