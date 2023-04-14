import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import './assets/main.css'

const SignIn = () => import('./components/SignIn.vue')

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: SignIn }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)

app.use(router)

app.mount('#app')
