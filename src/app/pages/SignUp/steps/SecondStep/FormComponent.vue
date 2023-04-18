<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

import Alert from '@/app/components/UI/AlertComponent.vue'
import Button from '@/app/components/UI/ButtonComponent.vue'
import Card from '@/app/components/UI/CardComponent.vue'
import Checkbox from '@/app/components/UI/CheckboxComponent.vue'
import FormField from '@/app/components/UI/FormFieldComponent.vue'

import { emailValidation, passwordValidation, phoneRegex } from '@/app/shared/constants'
import { validateAll } from '@/app/shared/helpers'

import type { CreateUserBody } from '@/app/shared/models'

interface Emits {
  (e: 'createUser', personalData: CreateUserBody): void
  (e: 'update:error', value: string): void
}

interface PersonalDataForm {
  name: { value: string; isValid: boolean }
  phone: { value: string; isValid: boolean }
  email: { value: string; isValid: boolean }
  password: { value: string; isValid: boolean }
  passwordConfirmation: { value: string; isValid: boolean }
  site: { value: string; isValid: boolean }
}

interface Props {
  error: string
}

interface SignUpValidationFns {
  emailValidation: (value: string) => boolean
  nameValidation: (value: string) => boolean
  passwordValidation: (value: string) => boolean
  passwordConfirmationValidation: (value: string) => boolean
  phoneValidation: (value: string) => boolean
  siteValidation: (value: string) => boolean
}

const emit = defineEmits<Emits>()

const props = defineProps<Props>()

const checkboxRef = ref<InstanceType<typeof Checkbox> | null>()
const formRef = ref<HTMLFormElement | null>()
const formIsValid = ref<boolean>(true)

const personalData = reactive<PersonalDataForm>({
  name: { value: '', isValid: false },
  phone: { value: '', isValid: false },
  email: { value: '', isValid: false },
  password: { value: '', isValid: false },
  passwordConfirmation: { value: '', isValid: false },
  site: { value: '', isValid: false }
})

const validationFns = reactive<SignUpValidationFns>({
  emailValidation,
  nameValidation: (value: string) => value.trim() !== '',
  passwordValidation,
  passwordConfirmationValidation: (value: string) => value === personalData.password.value,
  phoneValidation: (value: string) => phoneRegex.test(value),
  siteValidation: (value: string) => value.trim() !== ''
})

const closeAlert = () => {
  if (props.error) {
    emit('update:error', '')
  }
  if (!formIsValid.value) {
    formIsValid.value = true
  }
}

const validateTerms = (): boolean => {
  if (checkboxRef.value) {
    return checkboxRef.value.isChecked
  }

  return false
}

const submitForm = (event: Event) => {
  event.preventDefault()

  formIsValid.value = validateAll(personalData, validationFns, [validateTerms])

  if (!formIsValid.value) {
    formRef.value?.scrollIntoView({ behavior: 'smooth' })
    return
  }

  emit('createUser', {
    name: personalData.name.value,
    email: personalData.email.value,
    phone: personalData.phone.value,
    password: personalData.password.value,
    passwordConfirmation: personalData.passwordConfirmation.value,
    site: personalData.site.value
  })
}

watch(
  () => props.error,
  (error) => {
    if (error) {
      formRef.value?.scrollIntoView({ behavior: 'smooth' })
    }
  }
)

watch(
  () => personalData.password.value,
  (password) => {
    validationFns.passwordConfirmationValidation = (value: string) => value === password
  }
)
</script>

<template>
  <Card class="bg-white border border-slate-200 mx-4 lg:mx-0 px-3.5 max-w-154.25">
    <form
      class="divide-neutral-900/50 divide-y grid h-full"
      ref="formRef"
      @submit="($event) => submitForm($event)"
    >
      <div class="pb-5 pt-7 lg:px-5">
        <Transition name="fade">
          <Alert
            class="mb-4"
            @close="(_$event) => closeAlert()"
            :message="error || 'Verifique os campos do formulário e tente novamente!'"
            type="error"
            v-if="!formIsValid || error"
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
            mask="(##) #####-####"
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
            error-msg="Insira uma senha válida (>= 8 caracteres)"
            id="password"
            @is-valid="($event) => (personalData.password.isValid = $event)"
            label-text="Senha"
            type="password"
            :validation-fn="validationFns.passwordValidation"
            v-model:value="personalData.password.value"
          >
            <p class="leading-4.5 mt-1.25 text-slate-600 text-sm">No mínimo 8 caracteres</p>
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
      <div class="pb-4 pt-5 lg:px-5">
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
      <div class="lg:flex flex-auto flex-col justify-between pb-7 pt-3.75 lg:px-5">
        <Checkbox class="mb-6.25" ref="checkboxRef">
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
