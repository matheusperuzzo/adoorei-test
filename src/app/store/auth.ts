import { reactive } from 'vue'

import type { HttpResponse, User } from '@/app/shared/models'

import { userStore } from './user'

export interface LoginBody {
  email: string
  password: string
}

type AuthStore = {
  token: string | null
  user: User | null
  login: (body: LoginBody) => Promise<HttpResponse>
  logout: () => void
}

const token = localStorage.getItem('token')

let user: User | null = null
const userString = localStorage.getItem('user')

if (userString) {
  user = JSON.parse(userString)
}

export const authStore = reactive<AuthStore>({
  token,
  user,
  async login({ email, password }) {
    const userExists = userStore.checkUser(email)

    if (!userExists) {
      return {
        code: 404,
        body: {
          message: 'Nenhum usuário cadastrado com o e-mail informado!'
        }
      }
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
      body: JSON.stringify({
        username: userExists.username,
        password
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    this.token = data.token
    this.user = userExists

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(userExists))

    return {
      code: 200,
      body: {
        token: this.token
      }
    }
  },
  logout() {
    this.token = null
    this.user = null

    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
})
