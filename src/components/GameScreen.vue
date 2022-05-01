<script setup lang="ts">
import Board from './Board.vue'
import Moon from './Icons/Moon.vue'
import Sun from './Icons/Sun.vue'
import Pause from './Icons/Pause.vue'
import Play from './Icons/Play.vue'
import Github from './Icons/Github.vue'
import PauseModal from './PauseModal.vue'
import HeartFull from './Icons/HeartFull.vue'
import HeartEmpty from './Icons/HeartEmpty.vue'

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
      <div id="Life">
         <HeartFull v-for="life in gameStore.life" />
         <HeartEmpty v-for="life in (gameStore.maxLife - gameStore.life)" />
      </div>
      <div id="Time">
         <p>Tempo</p>
         <h3>{{ gameStore.timeDisplay }}</h3>
         <button @click="gameStore.togglePaused">
            <Play v-if="gameStore.paused" />
            <Pause v-else />
         </button>
      </div>
      <div id="Points">
         <p>Pontos</p>
         <h5>000</h5>
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
   align-items: center;
   justify-content: space-between;
   width: 100%;
   max-width: 480px;

   color: var(--principal-color);

   >div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 80px;

      &#Life {
         flex-direction: row;

         >svg {
            width: 24px;
         }
      }

      &#Time {
         align-self: center;
         justify-self: center;
         flex: 1;
         width: unset;
      }

      >p {
         font-size: 0.9rem;
         text-transform: uppercase;
         font-weight: 500;
      }

      >h3 {
         font-size: 2rem;
         font-weight: 700;
      }

      >h5 {
         font-size: 1.25rem;
         font-weight: 600;
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
