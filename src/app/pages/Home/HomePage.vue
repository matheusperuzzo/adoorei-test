<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import Button from '@/app/components/UI/ButtonComponent.vue'
import LocawebLogo from '@/app/components/assets/images/LocawebLogo.vue'
import VideoImage from '@/app/components/assets/images/VideoImage.vue'

import { authStore } from '@/app/store'

const router = useRouter()

const showLogout = ref(false)

const logout = () => {
  authStore.logout()

  router.push({ path: 'login' })
}

const toggleShowLogout = () => {
  showLogout.value = !showLogout.value
}
</script>

<template>
  <header>
    <nav class="flex items-center justify-between pl-8 pr-12 pt-8">
      <LocawebLogo />
      <div class="text-end">
        <Button
          @click="toggleShowLogout"
          class="bg-neutral font-bold h-13 inline-flex items-center justify-center leading-5.5 mb-2 rounded-full text-lg text-white w-13"
        >
          {{ authStore.user?.name.firstname.charAt(0) }}
        </Button>
        <Button v-if="showLogout" @click="logout" class="bg-white block pl-20 pr-5 py-3 rounded-md">
          Sair
        </Button>
      </div>
    </nav>
  </header>
  <main class="flex flex-col flex-auto items-center px-10 md:px-20 lg:px-40 py-9">
    <div class="max-w-244">
      <h2 class="font-bold leading-9 mb-3.75 text-7">Olá {{ authStore.user?.name.firstname }},</h2>
      <p class="leading-5 mb-8">Seja bem vindo a sua conta de hospedagem.</p>
      <VideoImage class="mb-9.5" />
      <p class="leading-5">Caso tenha alguma dúvida, <a>visite nossa central de ajuda.</a></p>
    </div>
  </main>
</template>
