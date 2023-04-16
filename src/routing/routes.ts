import type { RouteRecordRaw } from 'vue-router'

const Home = () => import('../app/pages/Home/HomePage.vue')
const Login = () => import('../app/pages/Login/LoginPage.vue')

export const privateRoutes: RouteRecordRaw[] = [
  { path: '', redirect: '/home', name: 'private' },
  { path: '/home', component: Home, name: 'home' }
]

export const publicRoutes: RouteRecordRaw[] = [
  { path: '', redirect: '/login', name: 'public' },
  { path: '/login', component: Login, name: 'login' }
]

const routes = [...privateRoutes, ...publicRoutes]

export default routes
