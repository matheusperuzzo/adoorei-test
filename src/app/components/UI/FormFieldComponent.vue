<script setup lang="ts">
import { computed, reactive } from 'vue'

interface FormValidation {
  isTouched: boolean
  isValid: boolean
  validate: () => void
}

interface Props {
  errorMsg: string
  id: string
  placeholder?: string
  type: string
  validationFn: (value: any) => boolean
  value: any
}

const emit = defineEmits(['update:value'])
const props = defineProps<Props>()

const formValidation = reactive<FormValidation>({
  isTouched: false,
  isValid: false,
  validate() {
    this.isTouched = true
    this.isValid = props.validationFn(value.value)
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
  <div class="mb-3.75 w-full">
    <label class="block leading-5" :for="id">E-mail</label>
    <input
      @blur="formValidation.validate"
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
