<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { authStore, userStore } from '@/store'

import type { LoginBody } from '@/store'

import FormField from './UI/FormFieldComponent.vue'
import LocawebLogo from './icons/LocawebLogo.vue'

const credentials = ref<LoginBody>({
  email: '',
  password: ''
})

const error = ref('')

const router = useRouter()

const authenticate = async (event: Event) => {
  event.preventDefault()

  const response = await authStore.login(credentials.value)
  if (response.code !== 200) {
    error.value = response.body.message
    return
  }

  router.push({
    path: 'home'
  })
}

onMounted(() => {
  userStore.getAll()
})
</script>

<template>
  <main class="h-2/3 mx-auto py-47.5 w-5/12 max-w-2xl">
    <LocawebLogo class="mb-8 mx-auto" />
    <form
      @submit="authenticate"
      class="bg-white border border-slate-200 mb-8 px-8 py-8 rounded-md w-full"
    >
      <h2 class="font-bold mb-1.25 text-3xl">Entre na sua conta</h2>
      <p class="leading-snug text-lg mb-5">Para acessar sua conta informe seu e-mail e senha</p>
      <FormField
        id="email"
        placeholder="Seu e-mail"
        type="email"
        v-model:value="credentials.email"
      />
      <FormField
        id="password"
        placeholder="Sua senha"
        type="password"
        v-model:value="credentials.password"
      >
        <span class="block mt-1.25 text-end text-slate-700">Esqueci minha senha</span>
      </FormControl>
      <button class="bg-rose leading-5 py-7.5 rounded-md text-center text-white w-full">
        FAZER LOGIN
      </button>
    </form>
    <div class="leading-5.5 text-center text-lg">
      Ainda não tem conta? <a class="text-rose underline" href="#">Cadastre-se</a>
    </div>
  </main>
</template>
