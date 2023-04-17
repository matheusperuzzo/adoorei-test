export interface Product {
  id: number
  name: string
  price: number
  paymentInterval?: string
  description: string
  country: string
  serverLoc: string
  tecnologies: string
  ftpUsersLimit?: number
  proEmailsLimit?: number
  subdomain: number
  apps: string[]
  freeMigration: boolean
  extras: string[]
  mostUsed: boolean
}
