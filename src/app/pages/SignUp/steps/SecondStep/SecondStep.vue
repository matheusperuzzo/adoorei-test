<script setup lang="ts">
import { ref } from 'vue'
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

const errorMsg = ref<string>('')

const router = useRouter()

const createUser = async (personalData: any) => {
  await userStore.addUser(personalData)

  const response = await authStore.login({
    email: 'john@gmail.com',
    password: 'm38rmF$'
  })

  console.log(response)

  if (response.code !== 200) {
    errorMsg.value = 'Não foi possível realizar a autenticação no momento!'
    return
  }

  router.push({ path: 'home' })
}

defineEmits<Emits>()
defineProps<Props>()
</script>

<template>
  <section
    class="flex flex-col-reverse lg:flex-row gap-5 items-center lg:items-stretch justify-center mt-12"
  >
    <Form v-model:error="errorMsg" @create-user="($event) => createUser($event)"></Form>
    <ChosenProduct
      @change-product="(_$event) => $emit('changeProduct')"
      :productId="chosenProductId"
    />
  </section>
</template>
