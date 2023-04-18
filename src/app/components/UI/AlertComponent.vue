<script setup lang="ts">
import Button from './ButtonComponent.vue'
import Card from './CardComponent.vue'

type AlertTypes = 'error' | 'success' | 'warn'

interface Emits {
  (e: 'close'): void
}

interface Props {
  message: string
  type: AlertTypes
}

defineEmits<Emits>()
defineProps<Props>()

const classes = {
  error: 'bg-primary-50 text-primary',
  success: '',
  warn: ''
}
</script>

<template>
  <Card :class="'flex items-center justify-between px-4 py-4 ' + classes[type]">
    <div>
      <h4 class="font-semibold">Houve um erro!</h4>
      <p class="text-sm">{{ message }}</p>
    </div>
    <Button @click="(_$event) => $emit('close')">X</Button>
  </Card>
</template>
