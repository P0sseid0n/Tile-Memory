<script setup lang="ts">
import GameScreen from './components/GameScreen.vue'
import { useGameStore } from './stores/game'

const gameStore = useGameStore()

const theme = gameStore.theme

</script>

<template>
   <GameScreen />
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



   background: var(--background);

}
</style>
