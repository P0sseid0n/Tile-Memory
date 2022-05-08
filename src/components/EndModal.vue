<script setup lang="ts">
import { useGameStore } from '../stores/game'
const gameStore = useGameStore()
</script>


<template>
   <div v-if="gameStore.life <= 0">
      <section>
         <h1>VOCÊ PERDEU</h1>
         <button @click="gameStore.startGame()">TENTAR NOVAMENTE</button>
         <button @click="gameStore.changeScreen('start')">SAIR</button>
      </section>
   </div>
</template>


<style scoped lang="scss">
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
   z-index: 100;
}

section {
   background: var(--principal-color);

   border-radius: 16px;


   width: 100%;
   max-width: 320px;
   height: 180px;
   padding: 20px 0;

   display: flex;
   flex-direction: column;
   align-items: center;

}

h1 {
   color: var(--background);
   margin-bottom: 32px;
}


button {
   padding: 8px 16px;
   display: block;
   border-radius: 8px;
   margin-bottom: 8px;
   cursor: pointer;
}

button:first-of-type {
   background-color: var(--background);
   color: var(--principal-color);
}

button:last-of-type {
   background-color: transparent;
   color: var(--background);
}
</style>