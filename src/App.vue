<script setup lang="ts">
import GameScreen from './components/GameScreen.vue'
import StartScreen from './components/StartScreen.vue'
import Github from './components/Icons/Github.vue'
import Moon from './components/Icons/Moon.vue'
import Sun from './components/Icons/Sun.vue'

import { useGameStore } from './stores/game'



const gameStore = useGameStore()

function toggleTheme() {
   document.documentElement.removeAttribute(gameStore.theme + '-theme')
   const theme = gameStore.toggleTheme()
   document.documentElement.setAttribute(theme + '-theme', '')
}


</script>

<template>
   <StartScreen v-if="gameStore.screen == 'start'" />
   <GameScreen v-else-if="gameStore.screen == 'game'" />
   <footer>
      <button id="toggleTheme" @click="toggleTheme()">
         <Moon v-if="gameStore.theme == 'light'" />
         <Sun v-else />
      </button>
      <a href="https://github.com/P0sseid0n/Tile-Memory" target="_blank" rel="noopener noreferrer">
         CÓDIGO ABERTO NO GITHUB
         <Github />
      </a>
   </footer>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@400;500;600;700&display=swap');
@import './assets/theme.css';

* {
   box-sizing: border-box;
   padding: 0;
   margin: 0;
   font-family: 'Merriweather Sans', sans-serif;
   -webkit-tap-highlight-color: transparent;
}

#app {
   width: 100vw;
   height: 100vh;

   padding: 16px 8%;

   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;

   position: relative;

   background: var(--background);
}

#app>footer {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   height: 192px;

   >button {
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


   >a {
      color: var(--principal-color);
      text-decoration: none;
      opacity: 0.4;
      font-size: 15px;
      font-weight: 700;

      svg {
         vertical-align: text-bottom;
      }
   }
}
</style>
