import { reactive } from 'vue'

import type { User } from '@/app/shared/models'

type UserStore = {
  users: User[]
  checkUser: (email: string) => User | null
  getAll: () => Promise<void>
}

export const userStore = reactive<UserStore>({
  users: [],
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
