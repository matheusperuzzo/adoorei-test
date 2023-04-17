import type { RouteRecordRaw } from 'vue-router'

const Home = () => import('../app/pages/Home/HomePage.vue')
const Login = () => import('../app/pages/Login/LoginPage.vue')
const SignUp = () => import('../app/pages/SignUp/SignUpPage.vue')

export const privateRoutes: RouteRecordRaw[] = [
  { path: '', redirect: '/home', name: 'private' },
  { path: '/home', component: Home, name: 'home' }
]

export const publicRoutes: RouteRecordRaw[] = [
  { path: '', redirect: '/login', name: 'public' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/signup', component: SignUp, name: 'signup' }
]

const routes = [...privateRoutes, ...publicRoutes]

export default routes
