import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/index.js'
import Home from '../views/Home.vue'
import Err404 from '../components/errors/Err404.vue'
import Login from '../components/Login.vue'
import Profile from '../components/Profile.vue'
import RegisterUser from '../components/RegisterUser.vue'
import Users from '../components/Users.vue'
import RegisterClient from '../components/RegisterClient.vue'
import Clients from '../components/Clients.vue'
import Mapita from '../components/Map.vue'
import Invoice from '../components/Invoice.vue'
import Reports from '../components/Reports.vue'
import Payments from '../components/Payments.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/err404',
      name: 'Err404',
      component: Err404
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: {
        requiresAuth: true,
        requiresAD: true
      }
    },
    {
      path: '/register-user',
      name: 'RegisterUsers',
      component: RegisterUser,
      meta: {
        requiresAuth: true,
        requiresAD: true
      }
    },
    {
      path: '/clients',
      name: 'Clients',
      component: Clients,
      meta: {
        requiresAuth: true,
        requiresOP: true
      }
    },
    {
      path: '/register-client',
      name: 'Register-Client',
      component: RegisterClient,
      meta: {
        requiresAuth: true,
        requiresOP: true
      }
    },
    {
      path: '*',
      redirect: '/err404'
    },
    {
      path: '/map',
      name: 'Map',
      component: Mapita,
      meta: {
        requiresAuth: true,
        requiresAD: true
      }
    },
    { // Client's Invoice
      path: '/client',
      name: 'Client',
      component: Invoice
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports,
      meta: {
        requiresAuth: true,
        requiresGE: true
      }
    },
    {
      path: '/payments',
      name: 'Payments',
      component: Payments,
      meta: {
        requiresAuth: true,
        requiresOP: true
      }
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // if Require AD and its not AD go to errr
    if (!Store.getters.isAuthenticated) {
      next({
        name: 'Login'
      })
    } else if (to.matched.some(record => record.meta.requiresAD)) {
      if (!Store.getters.isAD) {
        next({ name: 'Err404' })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.requiresGE)) {
      if (!Store.getters.isGE) {
        next({ name: 'Err404' })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.requiresOP)) {
      if (!Store.getters.isOP) {
        next({ name: 'Err404' })
      } else {
        next()
      }
    } else {
      next()
    }
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    /* if (!Store.getters.isAuthenticated) {
      next({
        name: 'Login'
      })
    } else {
      next()
    } */
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // Si esta logueado, no lo deja entrar a la ruta login
    if (Store.getters.isAuthenticated) {
      next({
        name: 'Profile'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
