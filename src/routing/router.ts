import { createRouter, createWebHashHistory } from 'vue-router'

import routes, { privateRoutes, publicRoutes } from '../routing/routes'
import { authStore } from '../app/store'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  const isAuthenticated = authStore.token

  if (isAuthenticated && !privateRoutes.some(({ name }) => name === to.name)) {
    return { name: 'private' }
  }

  if (!isAuthenticated && !publicRoutes.some(({ name }) => name === to.name)) {
    return { name: 'public' }
  }
})

export default router
