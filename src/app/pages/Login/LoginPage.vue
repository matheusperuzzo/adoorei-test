<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import type { LoginBody } from '@/app/store'

import Alert from '@/app/components/UI/AlertComponent.vue'
import Button from '@/app/components/UI/ButtonComponent.vue'
import Card from '@/app/components/UI/CardComponent.vue'
import FormField from '@/app/components/UI/FormFieldComponent.vue'
import LocawebLogo from '@/app/components/assets/images/LocawebLogo.vue'
import { emailRegex } from '@/app/shared/constants/email-regex'
import { authStore, userStore } from '@/app/store'

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

const emailValidation = (value: string) => emailRegex.test(value)
const passwordValidation = (value: string) => value.length >= 6

onMounted(() => {
  userStore.getAll()
})
</script>

<template>
  <main class="py-47.5">
    <LocawebLogo class="mb-8 mx-auto" />
    <Card class="bg-white border border-slate-200 mb-8 px-8 py-8 w-5/12 max-w-2xl">
      <form @submit="authenticate">
        <h2 class="font-bold mb-1.25 text-3xl">Entre na sua conta</h2>
        <p class="leading-snug text-lg mb-5">Para acessar sua conta informe seu e-mail e senha</p>
        <Transition name="fade">
          <Alert
            class="-mt-2 mb-4"
            @close="error = ''"
            :message="error"
            type="error"
            v-if="error"
          />
        </Transition>
        <FormField
          error-msg="Insira um endereço de e-mail válido."
          id="email"
          placeholder="Seu e-mail"
          type="email"
          :validation-fn="emailValidation"
          v-model:value="credentials.email"
        />
        <FormField
          error-msg="Insira uma senha válida (>= 6 caracteres)."
          id="password"
          placeholder="Sua senha"
          type="password"
          :validation-fn="passwordValidation"
          v-model:value="credentials.password"
        >
          <span class="block mt-1.25 text-end text-slate-700">Esqueci minha senha</span>
        </FormField>
        <Button
          class="bg-primary leading-5 py-7.5 rounded-md text-center text-white w-full"
          type="submit"
        >
          FAZER LOGIN
        </Button>
      </form>
    </Card>
    <div class="leading-5.5 text-center text-lg">
      Ainda não tem conta? <a class="text-primary underline" href="#">Cadastre-se</a>
    </div>
  </main>
</template>
