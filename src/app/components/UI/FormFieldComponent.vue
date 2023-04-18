<script setup lang="ts">
import type { FormFieldValidation } from '@/app/shared/models'
import { computed, reactive } from 'vue'

interface Emits {
  (e: 'update:value', value: any): void
  (e: 'isValid', isValid: boolean): void
}

interface Props {
  errorMsg: string
  id: string
  labelText: string
  placeholder?: string
  type: string
  validationFn: (value: any) => boolean
  value: any
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()

const formValidation = reactive<FormFieldValidation>({
  isTouched: false,
  isValid: false,
  validate(event) {
    const value = (event.target as HTMLInputElement).value
    this.isTouched = true
    this.isValid = props.validationFn(value)
    emit('isValid', this.isValid)
  }
})

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
  <div class="w-full">
    <label class="block leading-5" :for="id">{{ labelText }}</label>
    <input
      @blur="($event) => formValidation.validate($event)"
      class="border border-slate-700/50 pl-4 py-7.5 rounded-md placeholder:text-black w-full"
      :id="id"
      :placeholder="placeholder"
      :type="type"
      v-model="value"
    />
    <span class="text-primary text-xs" v-if="formValidation.isTouched && !formValidation.isValid">{{
      errorMsg
    }}</span>
    <slot></slot>
  </div>
</template>
