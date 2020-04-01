import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const API_URL = 'http://localhost:8000/'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token_access') || null,
    status: '', // loading, success or error
    user: {},
    auth: { headers: null },
    profile: {},
    users: []
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    set_profile (state, profile) {
      state.profile = profile
    },
    setUsers (state, users) {
      state.users = users
    },
    logout (state) {
      state.status = null
      state.token = null
      state.user = null
      state.auth.headers = null
    },
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
      state.auth.headers = { Authorization: 'JWT ' + token }
    },
    auth_error (state) {
      state.status = 'error'
    }
  },
  actions: {
    login (context, user) {
      return new Promise((resolve, reject) => {
        context.commit('auth_request')
        axios.post(API_URL + 'api/v1/auth-jwt/', user)
          .then(res => {
            const token = res.data.token
            const user = res.data.user
            if (token) {
              localStorage.setItem('token_access', token) // Saves token in localStorage
              context.commit('auth_success', token, user) // Saves data in storate state
              resolve(res)
            } else {
              console.log('login token null error' + res)
            }
          })
          .catch(err => {
            context.commit('auth_error')
            localStorage.removeItem('token_access')
            reject(err)
          })
      })
    },
    getProfile (context) {
      return new Promise((resolve, reject) => {
        axios.get(API_URL + 'api/v1/usuarios/', context.getters.getAuth)
          .then(res => {
            context.commit('set_profile', res.data)
            resolve(res)
          })
          .catch(err => {
            console.log('getProfile error: ' + err)
            reject(err)
          })
      })
    },
    registerUser (context, user) {
      return new Promise((resolve, reject) => {
        axios.post(API_URL + 'api/v1/usuarios/create/', user, context.getters.getAuth)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log('registerUser error: ' + err)
            reject(err)
          })
      })
    },
    obtainUsers (context) {
      return new Promise((resolve, reject) => {
        axios.get(API_URL + 'api/v1/usuarios/', context.getters.getAuth)
          .then(res => {
            context.commit('setUsers', res.data.results)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    logout (context) {
      return new Promise((resolve, reject) => {
        axios.post(API_URL + 'api/v1/api-auth/logout/', context.state.user, context.state.token)
          .then(res => {
            console.log('Hola: ' + res)
            // context.commit('logout')
            // localStorage.removeItem('token_access')
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
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
  plugins: [createPersistedState()]
})
