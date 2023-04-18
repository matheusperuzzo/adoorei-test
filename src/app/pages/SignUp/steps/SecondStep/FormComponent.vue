<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

import Alert from '@/app/components/UI/AlertComponent.vue'
import Button from '@/app/components/UI/ButtonComponent.vue'
import Card from '@/app/components/UI/CardComponent.vue'
import Checkbox from '@/app/components/UI/CheckboxComponent.vue'
import FormField from '@/app/components/UI/FormFieldComponent.vue'

import { emailRegex } from '@/app/shared/constants'

interface Emits {
  (e: 'createUser', personalData: { [key: string]: string }): void
}

interface PersonalData {
  name: { value: string; isValid: boolean }
  phone: { value: string; isValid: boolean }
  email: { value: string; isValid: boolean }
  password: { value: string; isValid: boolean }
  passwordConfirmation: { value: string; isValid: boolean }
  site: { value: string; isValid: boolean }
}

const emit = defineEmits<Emits>()

const checkbox = ref<InstanceType<typeof Checkbox> | null>()
const form = ref<HTMLFormElement | null>()

const formIsValid = ref<boolean>(true)

const personalData = reactive<PersonalData>({
  name: { value: '', isValid: false },
  phone: { value: '', isValid: false },
  email: { value: '', isValid: false },
  password: { value: '', isValid: false },
  passwordConfirmation: { value: '', isValid: false },
  site: { value: '', isValid: false }
})

const validationFns = reactive<{ [key: string]: (value: string) => boolean }>({
  emailValidation: (value: string) => emailRegex.test(value),
  nameValidation: (value: string) => value.trim() !== '',
  passwordValidation: (value: string) => value.length === 6,
  passwordConfirmationValidation: (value: string) => value === personalData.password.value,
  phoneValidation: (value: string) => value.length === 11,
  siteValidation: (value: string) => value.trim() !== ''
})

const submitForm = (event: Event) => {
  event.preventDefault()

  formIsValid.value = validateAll()

  if (!formIsValid.value) {
    form.value?.scrollIntoView({ behavior: 'smooth' })
    return
  }

  emit('createUser', {
    name: personalData.name.value,
    email: personalData.email.value,
    phone: personalData.phone.value,
    password: personalData.password.value,
    passwordConfirmation: personalData.passwordConfirmation.value,
    siteName: personalData.site.value
  })
}

const validateAll = () => {
  let isAllValid = true
  for (const data in personalData) {
    if (Object.prototype.hasOwnProperty.call(personalData, data)) {
      const isValid = validationFns[`${data}Validation`](
        personalData[data as keyof PersonalData].value
      )

      if (!isValid) {
        isAllValid = false
      }
    }
  }

  if (isAllValid) {
    const termsIsChecked = checkbox.value?.isChecked

    if (!termsIsChecked) {
      isAllValid = false
    }
  }

  return isAllValid
}

watch(
  () => personalData.password.value,
  (password) => {
    validationFns.passwordConfirmationValidation = (value: string) => value === password
  }
)
</script>

<template>
  <Card class="bg-white border border-slate-200 mx-0 px-3.5 max-w-154.25">
    <form
      class="divide-neutral-900/50 divide-y"
      ref="form"
      @submit="($event) => submitForm($event)"
    >
      <div class="pb-5 pt-7 px-5">
        <Transition name="fade">
          <Alert
            class="mb-4"
            @close="(_$event) => (formIsValid = true)"
            message="Verifique os campos do formulário e tente novamente!"
            type="error"
            v-if="!formIsValid"
          />
        </Transition>
        <h2 class="font-bold leading-9 mb-1.25 text-7">Dados pessoais</h2>
        <p class="leading-5.5 mb-5 text-lg">Informe seus dados pessoais para acesso à sua conta</p>
        <div class="space-y-3.75">
          <FormField
            error-msg="Insira seu nome"
            id="name"
            @is-valid="($event) => (personalData.name.isValid = $event)"
            label-text="Nome completo"
            placeholder="Informe seu nome completo"
            type="text"
            :validation-fn="validationFns.nameValidation"
            v-model:value="personalData.name.value"
          />
          <FormField
            error-msg="Insira um número de celular válido"
            id="phone"
            @is-valid="($event) => (personalData.phone.isValid = $event)"
            label-text="Celular"
            placeholder="(99) 99999-0000"
            type="text"
            :validation-fn="validationFns.phoneValidation"
            v-model:value="personalData.phone.value"
          />
          <FormField
            error-msg="Insira um endereço de e-mail válido"
            id="email"
            @is-valid="($event) => (personalData.email.isValid = $event)"
            label-text="E-mail"
            placeholder="Informe seu e-mail"
            type="email"
            :validation-fn="validationFns.emailValidation"
            v-model:value="personalData.email.value"
          />
          <FormField
            error-msg="Insira uma senha válida (>= 6 caracteres)"
            id="password"
            @is-valid="($event) => (personalData.password.isValid = $event)"
            label-text="Senha"
            type="password"
            :validation-fn="validationFns.passwordValidation"
            v-model:value="personalData.password.value"
          >
            <p class="leading-4.5 mt-1.25 text-slate-600 text-sm">No mínimo 6 caracteres</p>
          </FormField>
          <FormField
            error-msg="As senhas não correspondem"
            id="passwordConfirmation"
            @is-valid="($event) => (personalData.passwordConfirmation.isValid = $event)"
            label-text="Confirme sua senha"
            type="password"
            :validation-fn="validationFns.passwordConfirmationValidation"
            v-model:value="personalData.passwordConfirmation.value"
          />
        </div>
      </div>
      <div class="pb-4 pt-5 px-5">
        <h2 class="font-bold leading-9 text-7">Dados do seu site</h2>
        <FormField
          error-msg="Insira o nome do site"
          id="site"
          @is-valid="($event) => (personalData.site.isValid = $event)"
          label-text="Nome do meu site"
          placeholder="Meu site"
          type="text"
          :validation-fn="validationFns.siteValidation"
          v-model:value="personalData.site.value"
        >
          <p class="leading-4.5 mt-1.25 text-slate-600 text-sm">
            Exatamente igual ao título do seu site
          </p>
        </FormField>
      </div>
      <div class="pb-7 pt-3.75 px-5">
        <Checkbox class="mb-6.25" ref="checkbox">
          <p class="leading-5">
            Ao concluir com seu cadastro você concorda com nossos
            <span class="underline">termos de uso</span> e
            <span class="underline">politicas de privacidade</span>
          </p>
        </Checkbox>
        <Button class="bg-primary leading-5 py-5 rounded-md text-white w-full" type="submit">
          CRIAR CONTA
        </Button>
      </div>
    </form>
  </Card>
</template>
