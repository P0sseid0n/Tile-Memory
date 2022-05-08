<script setup lang="ts">
import { useGameStore } from '../stores/game'
const gameStore = useGameStore()
</script>

<template>
   <div v-if="gameStore.paused && gameStore.canPlay" @click.self="gameStore.togglePaused">
      <section>
         <h1>PAUSADO</h1>
         <button @click="gameStore.changeScreen('start')">SAIR</button>
      </section>
   </div>
</template>

<style scoped lang="scss" >
div {
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   /* background: rgba(0, 0, 0, 0.5); */
   padding: 0 6%;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 20px;
}

button {
   color: var(--principal-color);
   background: var(--background);
   border: none;
   padding: 8px 32px;
   border-radius: 4px;
   font-size: 14px;
   font-weight: 600;
   cursor: pointer;
   transition: all 0.2s ease-in-out;
   outline: none;

   &:hover {
      transform: scale(1.2);
   }
}

section {
   background: var(--principal-color);

   border-radius: 16px;


   width: 100%;
   max-width: 320px;
   height: 140px;
   padding: 20px 0;

   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
}

h1 {
   color: var(--background);
}
</style>