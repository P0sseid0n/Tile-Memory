<script setup lang="ts">
import Board from './Board.vue'
import Moon from './Icons/Moon.vue'
import Sun from './Icons/Sun.vue'
import Pause from './Icons/Pause.vue'
import Play from './Icons/Play.vue'
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
   <button @click="toggleTheme()">
      <Moon v-if="gameStore.theme == 'light'" />
      <Sun v-else />
   </button>
   <a href="https://p0sseid0n.site/">Made by P0sseid0n</a>
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

   &:hover {
      transform: scale(1.2);
   }
}

a {
   text-decoration: none;
   color: rgb(189, 195, 199);
   font-weight: 600;
}
</style>
