import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Home from './components/Home.vue'
import GameLobby from './components/GameLobby.vue'
import Game from './components/Game.vue'
import Leaderboard from './components/Leaderboard.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/lobby', component: GameLobby },
  { path: '/game/:id', component: Game },
  { path: '/leaderboard', component: Leaderboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')