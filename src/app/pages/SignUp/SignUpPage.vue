<script setup lang="ts">
import { ref } from 'vue'

import LocawebLogo from '@/app/components/assets/images/LocawebLogo.vue'

import FirstStep from './steps/FirstStep.vue'
import SecondStep from './steps/SecondStep.vue'

import type { Step } from '@/app/shared/models'

const currentStep = ref<number>(1)

const steps: Step = {
  1: FirstStep,
  2: SecondStep
}
</script>

<template>
  <main class="py-15">
    <LocawebLogo class="mx-auto mb-11" />
    <h2 class="font-bold leading-9 mx-auto text-7 text-center max-w-174.25">
      Você está muito próximo de mudar a forma de
      <span class="text-primary underline">hospedar seu site</span>
    </h2>
    <component :is="steps[currentStep]" />
  </main>
</template>
