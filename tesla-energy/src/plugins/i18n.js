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
    profile: {
      title: 'Profile',
      userName: 'Username',
      name: 'Name',
      lastName: 'Last Name',
      password: 'Password',
      email: 'Email',
      position: 'Position',
      update: 'Update',
      upadated: 'User updated successfully ',
      upadateError: 'User updated successfully'
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
      registerError: 'Register error ',
      type: {
        title: 'Type',
        corporate: 'Corporate',
        natural: 'Natural'
      }
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
      reset: 'Reiniciar reCAPTCHA'
    },
    login: {
      title: 'Iniciar sesión',
      userName: 'Nombre de Usuario',
      password: 'Contraseña',
      loginButton: 'Iniciar Sesión',
      fieldRequired: 'Requerido.'
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
    },
    profile: {
      title: 'Perfil',
      userName: 'Nombre de Usuario',
      name: 'Nombre',
      lastName: 'Apellido',
      password: 'Contraseña',
      email: 'Correo Eléctronico',
      position: 'Rol',
      update: 'Actualizar',
      upadated: 'Usuario actualizado satisfactoriamente',
      upadateError: 'Error al actualizar '
    },
    registerUser: {
      title: 'Registro de Usuario',
      userType: {
        user: 'Seleccionar Tipo de Ssuario',
        manager: 'Administrador',
        operator: 'Operador'
      },
      name: 'Nombre',
      lastName: 'Apellido',
      userName: 'Nombre de Usuario',
      email: 'Correo electrónico',
      password: 'Contraseña',
      passwordConfirmation: 'Confirmar contraseña',
      sendButton: 'Enviar',
      fieldRequired: 'Requerido.',
      invalidEmail: 'Correo electrónico invalido.',
      passwordMatch: 'La contraseña debe coincidir.',
      passwordCharacters: 'Mínimo 8 caracteres.',
      passwordHint: 'Repite tu contraseña.',
      registered: 'Usuario registrado satisfactoriamente',
      registerError: 'Error al registrar '
    },
    users: {
      title: 'Usuario del Sistema:',
      search: 'Buscar',
      userName: 'Nombre de Usuario',
      name: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo electrónico',
      state: 'Estado',
      userType: 'Tipo de Usuario',
      editUser: 'Editar Usuario',
      cancel: 'Cancelar',
      save: 'Guardar',
      activeUser: 'Activo',
      inactiveUser: 'Inactivo'
    },
    registerClient: {
      title: 'Registro de Cliente',
      name: 'Nombre',
      lastName: 'Apellido',
      id: 'Identificación',
      email: 'Correo electrónico',
      fieldRequired: 'Requerido.',
      invalidEmail: 'Correo electrónico invalido.',
      sendButton: 'Enviar',
      registered: 'Cliente registrado satisfactoriamente',
      registerError: 'Error al registrar ',
      type: {
        title: 'Tipo',
        corporate: 'Corporativo',
        natural: 'Natural'
      }
    },
    clients: {
      title: 'Clientes:',
      search: 'Buscar',
      name: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo electrónico',
      state: 'Estado',
      clientType: 'Tipo de Cliente',
      id: 'Identificación',
      editClient: 'Editar Cliente',
      cancel: 'Cancelar',
      save: 'Guardar',
      activeClient: 'Activo',
      inactiveClient: 'Inactivo'
    }
  },
  pt_BR: {
    home: {
      welcome: 'Bem-vindo à Tesla Energy',
      login: 'Faça seu Login'
    },
    recaptcha: {
      reset: 'Redefinir reCAPTCHA'
    },
    login: {
      title: 'Faça seu Login',
      userName: 'Nome do usuário',
      password: 'Senha',
      loginButton: 'Faça seu Login',
      fieldRequired: 'Requeridos.'
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
    },
    profile: {
      title: 'Perfil',
      userName: 'Nome do usuário',
      name: 'Nome',
      lastName: 'Último nome',
      password: 'Senha',
      email: 'O email',
      position: 'Posição',
      update: 'Atualizar',
      upadated: 'Usuário atualizado com sucesso',
      upadateError: 'Falha ao atualizar '
    },
    registerUser: {
      title: 'Registro de Usuário',
      userType: {
        user: 'Selecione o Tipo de Usuário',
        manager: 'Gerente',
        operator: 'Operador'
      },
      name: 'Nome',
      lastName: 'Último nome',
      userName: 'Nome do usuário',
      email: 'O email',
      password: 'Senha',
      passwordConfirmation: 'ConfirmaÇão Da Senha',
      sendButton: 'Enviar',
      fieldRequired: 'Requeridos.',
      invalidEmail: 'O email inválido.',
      passwordMatch: 'A senha deve corresponder.',
      passwordCharacters: 'Mínimo de 8 caracteres.',
      passwordHint: 'Repita sua senha.',
      registered: 'Usuário registrado com sucesso',
      registerError: 'Registração falhou'
    },
    users: {
      title: 'Usuários do sistema:',
      search: 'Procurar',
      userName: 'Nome do usuário',
      name: 'Nome',
      lastName: 'Último nome',
      email: 'O email',
      state: 'Estado',
      userType: 'Tipo de Usuário',
      editUser: 'Editar Usuário',
      cancel: 'Cancelar',
      save: 'Salve',
      activeUser: 'Ativo',
      inactiveUser: 'Inativo'
    },
    registerClient: {
      title: 'Registro de Cliente',
      name: 'Nome',
      lastName: 'Último nome',
      id: 'Número de Identificação',
      email: 'O email',
      fieldRequired: 'Requeridos.',
      invalidEmail: 'O email inválido.',
      sendButton: 'Enviar',
      registered: 'Cliente Registrado com Sucesso',
      registerError: 'Registração falhou',
      type: {
        title: 'Tipo',
        corporate: 'Corporativo',
        natural: 'Natural'
      }
    },
    clients: {
      title: 'Clientes:',
      search: 'Procurar',
      name: 'Nome',
      lastName: 'Último nome',
      email: 'O email',
      state: 'Estado',
      clientType: 'Tipo de Cliente',
      id: 'Número de Identificação',
      editClient: 'Editar Cliente',
      cancel: 'Cancelar',
      save: 'Salve',
      activeClient: 'Ativo',
      inactiveClient: 'Inativo'
    }
  }
}

export const i18n = new VueI18n({
  locale: 'en_US',
  fallBackLocale: 'en',
  messages
})
