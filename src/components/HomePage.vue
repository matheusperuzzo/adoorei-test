<script setup lang="ts">
import { ref } from 'vue'
import LocawebLogo from './icons/LocawebLogo.vue'
import VideoImageVue from './images/VideoImage.vue'

const showLogout = ref(false)

const toggleShowLogout = () => {
  showLogout.value = !showLogout.value
}
</script>

<template>
  <header>
    <nav class="flex items-center justify-between pl-8 pr-12 pt-8">
      <LocawebLogo />
      <div class="text-end">
        <button
          @click="toggleShowLogout"
          class="bg-neutral font-bold h-13 inline-flex items-center justify-center leading-5.5 mb-2 rounded-full text-lg text-white w-13"
        >
          J
        </button>
        <button v-if="showLogout" class="bg-white block pl-20 pr-5 py-3 rounded-md">Sair</button>
      </div>
    </nav>
  </header>
  <main class="pt-9">
    <div class="mx-auto w-8/12 max-w-244">
      <h2 class="font-bold leading-9 mb-3.75 text-7">Olá João,</h2>
      <p class="leading-5 mb-8">Seja bem vindo a sua conta de hospedagem.</p>
      <VideoImageVue class="mb-9.5" />
      <p class="leading-5">Caso tenha alguma dúvida, <a>visite nossa central de ajuda.</a></p>
    </div>
  </main>
</template>
