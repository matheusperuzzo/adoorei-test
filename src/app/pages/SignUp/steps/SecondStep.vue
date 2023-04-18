<script setup lang="ts">
import { reactive, ref } from 'vue'

import Button from '@/app/components/UI/ButtonComponent.vue'
import Card from '@/app/components/UI/CardComponent.vue'
import Checkbox from '@/app/components/UI/CheckboxComponent.vue'
import { emailRegex, products } from '@/app/shared/constants'
import FormField from '@/app/components/UI/FormFieldComponent.vue'

interface Props {
  chosenProductId: number
}

const props = defineProps<Props>()

const emailValidation = (value: string) => emailRegex.test(value)
const nameValidation = (value: string) => value.trim() === ''
const passwordValidation = (value: string) => value.length === 6
const passwordConfirmationValidation = (value: string) => value === personalData.password
const phoneValidation = (value: string) => value.length === 11
const siteValidation = (value: string) => value.trim() === ''

const personalData = reactive({
  name: '',
  phone: '',
  email: '',
  password: '',
  passwordConfirmation: ''
})

const product = products[props.chosenProductId]

const siteName = ref<string>('')
</script>

<template>
  <section class="flex gap-5 justify-center mt-12">
    <Card class="bg-white border border-slate-200 mx-0 px-3.5 max-w-154.25">
      <form class="divide-neutral-900/50 divide-y">
        <div class="pb-5 pt-7 px-5">
          <h2 class="font-bold leading-9 mb-1.25 text-7">Dados pessoais</h2>
          <p class="leading-5.5 mb-5 text-lg">
            Informe seus dados pessoais para acesso à sua conta
          </p>
          <div class="space-y-3.75">
            <FormField
              error-msg="Insira seu nome"
              id="name"
              label-text="Nome completo"
              placeholder="Informe seu nome completo"
              type="text"
              :validation-fn="nameValidation"
              :value="personalData.name"
            />
            <FormField
              error-msg="Insira um número de celular válido"
              id="phone"
              label-text="Celular"
              placeholder="(99) 99999-0000"
              type="text"
              :validation-fn="phoneValidation"
              :value="personalData.phone"
            />
            <FormField
              error-msg="Insira um endereço de e-mail válido"
              id="email"
              label-text="E-mail"
              placeholder="Informe seu e-mail"
              type="email"
              :validation-fn="emailValidation"
              :value="personalData.email"
            />
            <FormField
              error-msg="Insira uma senha válida (>= 6 caracteres)"
              id="password"
              label-text="Senha"
              type="password"
              :validation-fn="passwordValidation"
              :value="personalData.email"
            >
              <p class="leading-4.5 mt-1.25 text-slate-600 text-sm">No mínimo 6 caracteres</p>
            </FormField>
            <FormField
              error-msg="As senhas não correspondem"
              id="passwordConfirmation"
              label-text="Confirme sua senha"
              type="password"
              :validation-fn="passwordConfirmationValidation"
              :value="personalData.email"
            />
          </div>
        </div>
        <div class="pb-4 pt-5 px-5">
          <h2 class="font-bold leading-9 text-7">Dados do seu site</h2>
          <FormField
            error-msg="Insira o nome do site"
            id="site"
            label-text="Nome do meu site"
            placeholder="Meu site"
            type="text"
            :validation-fn="siteValidation"
            :value="siteName"
          >
            <p class="leading-4.5 mt-1.25 text-slate-600 text-sm">
              Exatamente igual ao título do seu site
            </p>
          </FormField>
        </div>
        <div class="pt-3.75 px-5">
          <Checkbox class="mb-6.25">
            <p class="leading-5">
              Ao concluir com seu cadastro você concorda com nossos
              <span class="underline">termos de uso</span> e
              <span class="underline">politicas de privacidade</span>
            </p>
          </Checkbox>
          <Button class="bg-primary leading-5 py-5 rounded-md text-white w-full">
            CRIAR CONTA
          </Button>
        </div>
      </form>
    </Card>
    <Card class="bg-white mx-0 pb-7 max-w-87">
      <div class="divide-neutral-900/50 divide-y px-10 py-5">
        <div class="py-5">
          <h3 class="font-bold leading-8 mb-5 text-6.5 text-center">{{ product.name }}</h3>
          <p class="leading-6.5 text-primary mb-3.5 text-center text-xl" v-if="product.price > 0">
            R$
            <span class="font-bold leading-10.5 text-8.5">{{ product.price }}</span>
            /{{ product.paymentInterval }}
          </p>
          <p class="font-bold leading-10.5 mb-3.5 text-8.5 text-center text-primary" v-else>
            Grátis
          </p>
          <p class="leading-4.5 mb-2.5 text-center text-gray text-sm">
            {{ product.price === 0 ? 'você não paga nada para usar' : 'cobrado mensalmente' }}
          </p>
          <p class="leading-4.5 text-center text-gray text-sm">sem taxa de setup</p>
        </div>
        <div class="py-5">
          <p class="leading-5.5 mx-auto text-center text-gray max-w-50.5">
            {{ product.description }}
          </p>
        </div>
        <div class="py-5">
          <h4 class="font-bold leading-5.5 mb-2.5 text-4.25 text-gray max-w-66.25">
            Seu site em servidores <span class="underline">no {{ product.country }}.</span>
          </h4>
          <ul class="leading-5.5 list-image-check list-inside mb-5 space-y-2.5 text-4.25 text-gray">
            <li>Servidores em {{ product.serverLoc }}</li>
            <li>
              {{ product.tecnologies }}
            </li>
            <li>
              <span :class="`${!product.ftpUsersLimit && 'underline'}`">{{
                product.ftpUsersLimit || 'Ilimitados'
              }}</span>
              usuário de FTP para upload ou download
            </li>
            <li>
              <span :class="`${!product.proEmailsLimit && 'underline'}`">{{
                product.proEmailsLimit || 'Ilimitados'
              }}</span>
              contas de e-mail profissional
            </li>
            <li>
              <span class="underline">{{ product.subdomain }} subdomínio</span> gratuito
            </li>
          </ul>
          <h4 class="font-bold leading-5.5 mb-5 text-4.25 text-gray max-w-66.25">
            Suporte 24 horas, 7 dias por semana grátis
          </h4>
          <h4 class="font-bold leading-5.5 mb-2.5 text-4.25 text-gray max-w-66.25">
            Aplicativos disponíveis
          </h4>
          <ul class="leading-5.5 list-image-check list-inside mb-5 space-y-2.5 text-4.25 text-gray">
            <li :key="app" v-for="app of product.apps">
              {{ app }}
            </li>
          </ul>
          <div v-if="product.freeMigration">
            <h4 class="font-bold leading-5.5 mb-2.5 text-4.25 text-gray max-w-66.25">
              Migração Gratuita
            </h4>
            <ul
              class="leading-5.5 list-image-check list-inside mb-5 space-y-2.5 text-4.25 text-gray"
            >
              <li>Migramos todos seus sites para nossos servidores</li>
            </ul>
          </div>
          <div class="gradient max-h-24 overflow-hidden">
            <h4 class="font-bold leading-5.5 mb-2.5 text-4.25 max-w-66.25">Você ainda tem</h4>
            <ul class="leading-5.5 list-image-check list-inside mb space-y-2.5 text-4.25">
              <li :key="extra" v-for="extra of product.extras">
                {{ extra }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Button class="block border border-black mx-auto px-18.25 py-4.5 rounded-md">
        Trocar plano
      </Button>
    </Card>
  </section>
</template>

<style>
.gradient {
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(to bottom, #666666, #66666680);
  color: #fff;
  -webkit-text-fill-color: transparent;
}
</style>
