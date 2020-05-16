import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en_US: {
    home: {
      welcome: 'Welcome to Tesla Energy',
      login: 'Login'
    },
    recaptcha: {
      reset: 'Reset reCAPTCHA'
    },
    login: {
      title: 'Login',
      userName: 'Username',
      password: 'Password',
      loginButton: 'Login',
      fieldRequired: 'Required.'
    },
    menu: {
      home: 'Home',
      userRegistration: 'User Registration',
      users: 'Users',
      clientRegistration: 'Client Registration',
      clients: 'Clients',
      profile: 'Profile',
      assets: 'Assets',
      logout: 'Logout'
    },
    registerUser: {
      title: 'User Registration',
      userType: {
        user: 'Select User Type',
        manager: 'Manager',
        operator: 'Operator'
      },
      name: 'Name',
      lastName: 'Last Name',
      userName: 'Username',
      email: 'Email',
      password: 'Password',
      passwordConfirmation: 'Password Confirmation',
      sendButton: 'Send',
      fieldRequired: 'Required.',
      invalidEmail: 'Invalid e-mail.',
      passwordMatch: 'Password must match.',
      passwordCharacters: 'Min 8 characters.',
      passwordHint: 'Repeat your password.',
      registered: 'User registered successfully',
      registerError: 'Register error '
    },
    users: {
      title: 'System Users:',
      search: 'Search',
      userName: 'Username',
      name: 'Name',
      lastName: 'Last Name',
      email: 'E-mail',
      state: 'State',
      userType: 'User Type',
      editUser: 'Edit User',
      cancel: 'Cancel',
      save: 'Save',
      activeUser: 'Active',
      inactiveUser: 'Inactive'
    },
    registerClient: {
      title: 'Client Registration',
      name: 'Name',
      lastName: 'Last Name',
      id: 'ID',
      email: 'E-mail',
      fieldRequired: 'Required.',
      invalidEmail: 'Invalid e-mail.',
      sendButton: 'Send',
      registered: 'Client registered successfully',
      registerError: 'Register error '
    },
    clients: {
      title: 'Clients:',
      search: 'Search',
      name: 'Name',
      lastName: 'Last Name',
      email: 'E-mail',
      state: 'State',
      clientType: 'Client Type',
      id: 'ID',
      editClient: 'Edit Client',
      cancel: 'Cancel',
      save: 'Save',
      activeClient: 'Active',
      inactiveClient: 'Inactive'
    }
  },
  es_ES: {
    home: {
      welcome: 'Bienvenido a Tesla Energy',
      login: 'Iniciar sesión'
    },
    recaptcha: {
      reset: 'Reset reCAPTCHA'
    },
    menu: {
      home: 'Inicio',
      userRegistration: 'Registro de Usuario',
      users: 'Usuarios',
      clientRegistration: 'Registro de Cliente',
      clients: 'Clientes',
      profile: 'Perfil',
      assets: 'Activos',
      logout: 'Cerrar Sesión'
    }
  },
  pt_BR: {
    home: {
      welcome: 'Bem-vindo à Tesla Energy',
      login: 'Faça seu login'
    },
    recaptcha: {
      reset: 'Reset reCAPTCHA'
    },
    menu: {
      home: 'Início',
      userRegistration: 'Registro de Usuário',
      users: 'Usuários',
      clientRegistration: 'Registro de Cliente',
      clients: 'Clientes',
      profile: 'Perfil',
      assets: 'Ativos',
      logout: 'Sair'
    }
  }
}

export const i18n = new VueI18n({
  locale: 'en_US',
  fallBackLocale: 'en',
  messages
})