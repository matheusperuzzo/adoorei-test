<script setup lang="ts">
import { ref } from 'vue'

import LocawebLogo from '@/app/components/assets/images/LocawebLogo.vue'

import FirstStep from './steps/FirstStep.vue'
import SecondStep from './steps/SecondStep/SecondStep.vue'

const nextStep = (productId: number) => {
  chosenProduct.value = productId

  currentStep.value++
}

const previousStep = () => {
  delete chosenProduct.value

  currentStep.value--
}

const chosenProduct = ref<number>()

const currentStep = ref<number>(1)
</script>

<template>
  <main class="py-15">
    <LocawebLogo class="mx-auto mb-11" />
    <h2 class="font-bold leading-9 mx-auto text-7 text-center max-w-174.25">
      Você está muito próximo de mudar a forma de
      <span class="text-primary underline">hospedar seu site</span>
    </h2>
    <FirstStep v-if="currentStep === 1" @next-step="nextStep" />
    <SecondStep
      @change-product="previousStep"
      :chosen-product-id="chosenProduct"
      v-if="currentStep === 2 && chosenProduct !== undefined"
    />
  </main>
</template>
