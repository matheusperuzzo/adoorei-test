import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import './assets/main.css'
import { authStore } from './store'

const SignIn = () => import('./components/SignIn.vue')
const HomePage = () => import('./components/HomePage.vue')

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: SignIn, name: 'login' },
  { path: '/home', component: HomePage, name: 'home' }
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
