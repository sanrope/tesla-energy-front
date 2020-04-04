import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/index.js'
import Home from '../views/Home.vue'
import Err404 from '../components/errors/Err404.vue'
import Login from '../components/Login.vue'
import Profile from '../components/Profile.vue'
import Register from '../components/RegisterUsers.vue'
import Users from '../components/Users.vue'
import Clients from '../components/Clients.Vue'
import RegisterClients from '../components/RegisterClient.Vue'


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
        requiresAuth: false
      }
    },
    {
      path: '/register-users',
      name: 'RegisterUsers',
      component: RegisterUsers,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/clients',
      name: 'Clients',
      component: Clients,
      meta: {
        requiresAuth: false
      }
      
    },
    {
      path: '/register-clients',
      name: 'Register-Clients',
      component: RegisterClients,
      meta: {
        requiresAuth: false
      }
      
    },
    {
      path: '*',
      redirect: '/err404'
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
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!Store.getters.isAuthenticated) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
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
