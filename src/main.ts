import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import './assets/main.css'

import App from './app/App.vue'
import { authStore } from './app/store'

const HomePage = () => import('./app/pages/Home/HomePage.vue')
const Login = () => import('./app/pages/Login/LoginPage.vue')

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/home', component: HomePage, name: 'home' },
  { path: '/login', component: Login, name: 'login' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to) => {
  if (!authStore.token && to.name !== 'login') {
    return { name: 'login' }
  }
})

const app = createApp(App)

app.use(router)

app.mount('#app')
