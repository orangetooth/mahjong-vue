<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { io, Socket } from 'socket.io-client'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const roomId = route.params.id

const gameState = ref({
  players: [
    { id: 1, tiles: Array(13).fill('🀄️') },
    { id: 2, tiles: Array(13).fill('🀄️') },
    { id: 3, tiles: Array(13).fill('🀄️') },
    { id: 4, tiles: Array(13).fill('🀄️') },
  ],
  currentPlayer: 1,
  tileStack: Array(70).fill('🀄️'),
  discardPile: []
})

const socket = ref<Socket | null>(null)
const selectedTileIndex = ref(-1)

onMounted(() => {
  socket.value = io('http://localhost:3000')

  socket.value.on('gameState', (state) => {
    gameState.value = state
  })

  socket.value.on('playerTurn', (playerId) => {
    gameState.value.currentPlayer = playerId
  })

  socket.value.emit('joinGame', roomId)
})

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect()
  }
})

const selectTile = (index: number) => {
  if (selectedTileIndex.value === index) {
    // If the same tile is clicked again, deselect it
    selectedTileIndex.value = -1
  } else {
    selectedTileIndex.value = index
  }
}

const playTile = () => {
  if (selectedTileIndex.value !== -1 && socket.value) {
    socket.value.emit('playTile', selectedTileIndex.value)
    selectedTileIndex.value = -1
  }
}

const drawTile = () => {
  if (socket.value) {
    socket.value.emit('drawTile')
  }
}

const backToLobby = () => {
  router.push('/lobby')
}
</script>

<template>
  <div class="game-container h-screen w-screen bg-green-100 relative">
    <!-- Back to Lobby button -->
    <button @click="backToLobby" class="absolute top-4 left-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 z-10">
      Back to Lobby
    </button>

    <div class="game-board w-full h-full p-6 relative">
      <!-- Top player -->
      <div class="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div class="flex">
          <div v-for="(tile, index) in gameState.players[2].tiles" :key="index" class="w-8 h-12 bg-red-500 m-1 rounded"></div>
        </div>
      </div>

      <!-- Left player -->
      <div class="absolute top-1/2 left-4 transform -translate-y-1/2">
        <div class="flex flex-col">
          <div v-for="(tile, index) in gameState.players[1].tiles" :key="index" class="w-12 h-8 bg-red-500 m-1 rounded"></div>
        </div>
      </div>

      <!-- Right player -->
      <div class="absolute top-1/2 right-4 transform -translate-y-1/2">
        <div class="flex flex-col">
          <div v-for="(tile, index) in gameState.players[3].tiles" :key="index" class="w-12 h-8 bg-red-500 m-1 rounded"></div>
        </div>
      </div>

      <!-- Tile stack -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="w-20 h-20 bg-yellow-200 rounded-lg flex items-center justify-center text-4xl">
          {{ gameState.tileStack.length }}
        </div>
      </div>

      <!-- Current player's tiles -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div class="flex">
          <div v-for="(tile, index) in gameState.players[0].tiles" :key="index" 
               @click="selectTile(index)"
               :class="[
                 'w-10 h-16 bg-white m-1 rounded flex items-center justify-center text-2xl cursor-pointer hover:bg-gray-200 transition-transform duration-200',
                 { 'transform -translate-y-4': selectedTileIndex === index }
               ]">
            {{ tile }}
          </div>
        </div>
      </div>

      <!-- Game controls -->
      <div class="absolute bottom-24 left-1/2 transform -translate-x-1/2">
        <button @click="drawTile" class="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">Draw Tile</button>
        <button @click="playTile" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" :disabled="selectedTileIndex === -1">Play Tile</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  overflow: hidden;
}
</style>