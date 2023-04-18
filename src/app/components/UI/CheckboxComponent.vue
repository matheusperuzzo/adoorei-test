<script setup lang="ts">
import { ref } from 'vue'
import CheckIcon from '../assets/icons/CheckIcon.vue'

const isChecked = ref(false)

defineExpose({ isChecked })
</script>

<template>
  <label
    id="container"
    class="cursor-pointer flex gap-3 items-center"
    @click="isChecked = !isChecked"
  >
    <div
      id="custom-check"
      class="bg-primary-50 hover:bg-primary-200/50 border border-primary flex h-4 items-center justify-center rounded text-primary min-w-3.5"
    >
      <CheckIcon v-if="isChecked" width="7" height="8" />
    </div>
    <slot></slot>
  </label>
</template>

<style>
#container:hover #custom-check {
  background-color: rgb(249 128 180 / 0.5) !important;
}
</style>
