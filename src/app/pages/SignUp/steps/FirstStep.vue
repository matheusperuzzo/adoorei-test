<script setup lang="ts">
import Button from '@/app/components/UI/ButtonComponent.vue'
import Card from '@/app/components/UI/CardComponent.vue'
import { products } from '@/app/shared/constants'

interface Emits {
  (e: 'nextStep', productId: number): void
}

defineEmits<Emits>()
</script>

<template>
  <p class="leading-5 mb-9 mt-5.5 text-center">Escolha seu plano</p>
  <div class="flex gap-6 items-start justify-center">
    <Card
      :class="`bg-white mx-0 ${product.mostUsed && 'relative'} max-w-87`"
      :key="product.id"
      v-for="product of products"
    >
      <div
        class="absolute bg-green left-0 mx-auto px-4 py-2 right-0 rounded-2.5 text-white -top-4 max-w-max"
        v-if="product.mostUsed"
      >
        MAIS USADO
      </div>
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
          <Button
            class="bg-primary block leading-5 mb-10.5 mx-auto px-6 py-4.5 rounded-md text-white"
            @click="$emit('nextStep', product.id)"
          >
            ESCOLHER ESSE PLANO
          </Button>
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
          <h4 class="font-bold leading-5.5 mb-2.5 text-4.25 text-gray max-w-66.25">
            Você ainda tem
          </h4>
          <ul class="leading-5.5 list-image-check list-inside mb space-y-2.5 text-4.25 text-gray">
            <li :key="extra" v-for="extra of product.extras">
              {{ extra }}
            </li>
          </ul>
        </div>
      </div>
    </Card>
  </div>
</template>
