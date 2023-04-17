<script setup lang="ts">
interface Props {
  chosenProductId: number
}

defineProps<Props>()
</script>

<template>Second Step {{ chosenProductId }}</template>
