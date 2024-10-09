<script setup lang="ts">
import { ref, onMounted } from 'vue'

const leaderboard = ref([
  { rank: 1, name: 'Player 1', score: 1000 },
  { rank: 2, name: 'Player 2', score: 950 },
  { rank: 3, name: 'Player 3', score: 900 },
  // Add more players...
])

onMounted(() => {
  // Fetch leaderboard data from the server
  // Update leaderboard.value with the fetched data
})
</script>

<template>
  <div class="container mx-auto mt-10">
    <h2 class="text-3xl font-bold text-indigo-600 mb-6">Leaderboard</h2>
    <table class="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-indigo-500 text-white">
        <tr>
          <th class="py-3 px-4 text-left">Rank</th>
          <th class="py-3 px-4 text-left">Player</th>
          <th class="py-3 px-4 text-left">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in leaderboard" :key="player.rank" class="border-b border-gray-200 hover:bg-gray-100">
          <td class="py-3 px-4">{{ player.rank }}</td>
          <td class="py-3 px-4">{{ player.name }}</td>
          <td class="py-3 px-4">{{ player.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>