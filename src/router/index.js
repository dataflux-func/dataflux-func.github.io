import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/quick-start',
    name: 'QuickStart',
    component: () => import('../views/QuickStart.vue'),
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
