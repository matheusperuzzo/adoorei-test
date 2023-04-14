import type { User } from '@/shared/models/user.model'
import { reactive } from 'vue'

type UserStore = {
  users: User[]
  getAll: () => Promise<void>
}

export const userStore = reactive<UserStore>({
  users: [],
  async getAll() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}users`)

    const data = await response.json()

    this.users = data.map((user: User) => user)
  }
})
