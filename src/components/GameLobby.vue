<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const rooms = ref([
  { id: 1, name: 'Beginner Room', players: 2, maxPlayers: 4 },
  { id: 2, name: 'Intermediate Room', players: 3, maxPlayers: 4 },
  { id: 3, name: 'Expert Room', players: 1, maxPlayers: 4 },
])

const joinRoom = (roomId: number) => {
  console.log(`Joining room ${roomId}`)
  router.push(`/game/${roomId}`)
}

const customRoomId = ref('')
const showJoinModal = ref(false)

const openJoinModal = () => {
  showJoinModal.value = true
}

const joinCustomRoom = () => {
  if (customRoomId.value) {
    console.log(`Joining custom room ${customRoomId.value}`)
    router.push(`/game/${customRoomId.value}`)
  }
  showJoinModal.value = false
  customRoomId.value = ''
}
</script>

<template>
  <div class="container mx-auto mt-10 px-4">
    <h2 class="text-3xl font-bold text-indigo-600 mb-6">Game Lobby</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <div v-for="room in rooms" :key="room.id" class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">{{ room.name }}</h3>
        <p class="text-gray-600 mb-4">Players: {{ room.players }} / {{ room.maxPlayers }}</p>
        <button @click="joinRoom(room.id)" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
          Join Room
        </button>
      </div>
    </div>
    <div class="mt-8 text-center">
      <button @click="openJoinModal" class="bg-indigo-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-indigo-600 transition duration-300">
        Join Custom Room
      </button>
    </div>

    <!-- Join Custom Room Modal -->
    <div v-if="showJoinModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-xl w-96">
        <h3 class="text-2xl font-semibold mb-4 text-indigo-600">Join Custom Room</h3>
        <input 
          v-model="customRoomId" 
          type="text" 
          placeholder="Enter Room ID" 
          class="border border-gray-300 p-3 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
        <div class="flex justify-end">
          <button @click="showJoinModal = false" class="bg-gray-300 text-black px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition duration-300">Cancel</button>
          <button @click="joinCustomRoom" class="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300">Join</button>
        </div>
      </div>
    </div>
  </div>
</template>