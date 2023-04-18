import { reactive } from 'vue'

import type { CreateUserBody, HttpResponse, User } from '@/app/shared/models'

interface UserStore {
  users: User[]
  addUser: (personalData: CreateUserBody) => Promise<HttpResponse>
  checkUser: (email: string) => User | null
  getAll: () => Promise<void>
}

export const userStore = reactive<UserStore>({
  users: [],
  async addUser(personalData) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}users`, {
      method: 'POST',
      body: JSON.stringify(personalData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    await response.json()

    return {
      code: 200,
      body: {
        message: 'Usuário criado com sucesso!'
      }
    }
  },
  checkUser(email) {
    const userExists = this.users.find((user) => user.email === email)

    if (!userExists) {
      return null
    }

    return userExists
  },
  async getAll() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}users`)

    const data = await response.json()

    this.users = data.map((user: User) => user)
  }
})
