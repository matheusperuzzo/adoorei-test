<script setup lang="ts">
interface Props {
  type?: 'submit' | 'reset' | 'button'
}

defineProps<Props>()
</script>

<template>
  <button :type="type || 'button'">
    <slot></slot>
  </button>
</template>
