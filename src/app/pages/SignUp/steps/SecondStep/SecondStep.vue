<script setup lang="ts">
import { useRouter } from 'vue-router'

import ChosenProduct from './ChosenProductComponent.vue'
import Form from './FormComponent.vue'

import { authStore, userStore } from '@/app/store'

interface Emits {
  (e: 'changeProduct'): void
}

interface Props {
  chosenProductId: number
}

const router = useRouter()

const createUser = async (personalData: any) => {
  await userStore.addUser(personalData)

  await authStore.login({
    email: 'john@gmail.com',
    password: 'm38rmF$'
  })

  router.push({ path: 'home' })
}

defineEmits<Emits>()
defineProps<Props>()
</script>

<template>
  <section class="flex gap-5 items-start justify-center mt-12">
    <Form @create-user="($event) => createUser($event)"></Form>
    <ChosenProduct
      @change-product="(_$event) => $emit('changeProduct')"
      :productId="chosenProductId"
    />
  </section>
</template>
