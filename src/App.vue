<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isAuthenticated = ref(false)

const showNavigation = computed(() => {
  return !route.path.startsWith('/game/')
})

const login = () => {
  // Implement Firebase authentication here
  isAuthenticated.value = true
  router.push('/lobby')
}

const logout = () => {
  // Implement Firebase logout here
  isAuthenticated.value = false
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen" :class="{ 'bg-gray-100': showNavigation }">
    <nav v-if="showNavigation" class="bg-white shadow-md p-4">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold text-indigo-600">Mahjong Online</router-link>
        <div v-if="isAuthenticated">
          <router-link to="/lobby" class="mx-2 text-gray-600 hover:text-indigo-600">Lobby</router-link>
          <router-link to="/leaderboard" class="mx-2 text-gray-600 hover:text-indigo-600">Leaderboard</router-link>
          <button @click="logout" class="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </div>
        <button v-else @click="login" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Login</button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
/* Add any global styles here */
</style>