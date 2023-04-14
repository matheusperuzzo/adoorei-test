<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: any
  type: string
  id: string
  placeholder?: string
}

const emit = defineEmits(['update:value'])
const props = defineProps<Props>()

const value = computed({
  get() {
    return props.value
  },
  set(value) {
    emit('update:value', value)
  }
})
</script>

<template>
  <div class="mb-3.75 w-full">
    <label class="block leading-5" :for="id">E-mail</label>
    <input
      class="border border-slate-700/50 pl-4 py-7.5 rounded-md placeholder:text-black w-full"
      :id="id"
      :placeholder="placeholder"
      :type="type"
      v-model="value"
    />
  </div>
</template>
