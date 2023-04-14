<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { authStore, userStore } from '@/store'
import LocawebLogo from './icons/LocawebLogo.vue'

import type { LoginBody } from '@/store'
import { useRouter } from 'vue-router'

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
  <section class="h-2/3 mx-auto pt-47.5 w-5/12">
    <LocawebLogo class="mb-8 mx-auto" />
    <form
      @submit="authenticate"
      class="bg-white border border-slate-200 mb-8 px-8 py-8 rounded-md w-full"
    >
      <h2 class="font-bold mb-1.25 text-3xl">Entre na sua conta</h2>
      <p class="leading-snug text-lg mb-5">Para acessar sua conta informe seu e-mail e senha</p>
      <div class="mb-3.75 w-full">
        <label class="block leading-5" for="email">E-mail</label>
        <input
          v-model="credentials.email"
          class="border border-slate-700/50 pl-4 py-7.5 rounded-md placeholder:text-black w-full"
          type="email"
          id="email"
          placeholder="Seu e-mail"
        />
      </div>
      <div class="mb-6.25 w-full">
        <label class="block leading-5" for="password">Senha</label>
        <input
          v-model="credentials.password"
          class="border border-slate-700/50 mb-1.25 pl-4 py-7.5 rounded-md placeholder:text-black w-full"
          type="password"
          id="password"
          placeholder="Sua senha"
        />
        <a class="block text-end text-slate-700" href="#">Esqueci minha senha</a>
      </div>
      <button class="bg-rose leading-5 py-7.5 rounded-md text-center text-white w-full">
        FAZER LOGIN
      </button>
    </form>
    <div class="leading-5.5 text-center text-lg">
      Ainda não tem conta? <a class="text-rose underline" href="#">Cadastre-se</a>
    </div>
  </section>
</template>
