import { reactive } from 'vue'
import { userStore } from './user'
import type { User } from '@/shared/models/user.model'
import type { HttpResponse } from '@/shared/models'

export interface LoginBody {
  email: string
  password: string
}

type AuthStore = {
  token: string
  login: (body: LoginBody) => Promise<HttpResponse>
}

const checkUser = (email: string): User | null => {
  const userExists = userStore.users.find((user) => user.email === email)

  if (!userExists) {
    return null
  }

  return userExists
}

export const authStore = reactive<AuthStore>({
  token: '',
  async login({ email, password }) {
    const userExists = checkUser(email)

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

    return {
      code: 200,
      body: {
        token: this.token
      }
    }
  }
})
