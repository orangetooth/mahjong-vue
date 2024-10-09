<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.push('/lobby')
})
</script>

<template>
  <!-- Empty template as we're redirecting -->
</template>