<script setup lang="ts">
import Board from './Board.vue'
import Moon from './Icons/Moon.vue'
import Sun from './Icons/Sun.vue'
import Pause from './Icons/Pause.vue'
import Play from './Icons/Play.vue'
import Github from './Icons/Github.vue'
import PauseModal from './PauseModal.vue'
import { useGameStore } from '../stores/game'

const gameStore = useGameStore()

function toggleTheme() {
   document.documentElement.removeAttribute(gameStore.theme + '-theme')
   const theme = gameStore.toggleTheme()
   document.documentElement.setAttribute(theme + '-theme', '')
}

gameStore.startGame()




</script>

<template>
   <PauseModal />
   <header>
      <div>
         <p>Tempo</p>
         <h5>{{ gameStore.timeDisplay }}</h5>
         <button @click="gameStore.togglePaused">
            <Play v-if="gameStore.paused" />
            <Pause v-else />
         </button>
      </div>
   </header>
   <Board />
   <button id="toggleTheme" @click="toggleTheme()">
      <Moon v-if="gameStore.theme == 'light'" />
      <Sun v-else />
   </button>
   <a href="https://github.com/P0sseid0n/Tile-Memory" target="_blank" rel="noopener noreferrer">
      CÓDIGO ABERTO NO GITHUB
      <Github />
   </a>
</template>

<style lang="scss" scoped>
header {
   display: flex;
   flex-direction: row;

   color: var(--principal-color);

   >div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      >p {
         font-size: 0.9rem;
         text-transform: uppercase;
         font-weight: 500;
      }

      >h5 {
         font-size: 2rem;
         font-weight: 700;
      }

      button {
         margin-top: 4px;
      }
   }
}


button {
   cursor: pointer;
   border: none;
   background: none;
   outline: none;

   transition: transform 0.2s;

   color: var(--principal-color);
   z-index: 10;

   &:hover {
      transform: scale(1.2);
   }
}


a {
   color: var(--principal-color);
   text-decoration: none;
   opacity: 0.4;
   font-size: 15px;
   font-weight: 700;

   svg {
      vertical-align: text-bottom;
   }
}
</style>
