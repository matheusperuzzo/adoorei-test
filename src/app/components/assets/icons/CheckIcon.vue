<script setup lang="ts">
interface Props {
  height: string
  width: string
}

defineProps<Props>()
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 14 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5L4.99529 9L13 1"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
