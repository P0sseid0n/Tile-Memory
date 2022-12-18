<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGameStore } from '../stores/game'

const gameStore = useGameStore()

const tileQtt = ref(3)

function startGame() {
   gameStore.startGame({ tileQtt: tileQtt.value, game: 'memory' })
}

</script>

<template>
   <div id="StartScreen">
      <h1>Tile Memory</h1>
      <!-- <div>
         <button @click="tileQtt < 5 ? tileQtt++ : null">{{ '<' }}</button>
         <input type="number" :value="tileQtt">
         <button @click="tileQtt > 3 ? tileQtt-- : null"> {{ '>' }} </button>
      </div> -->
      <button @click="startGame">COMEÇAR JOGO</button>
   </div>
</template>


<style scoped lang="scss">
#StartScreen {
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-around;

   >div {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      button {
         width: 64px;
         height: 32px;
      }
   }
}

h1 {
   font-size: 48px;
   font-weight: 800;
   color: var(--principal-color);

}

#StartScreen>button {
   padding: 10px 40px;
   background: var(--principal-color);
   color: var(--background);
   border: none;
   border-radius: 9px;
   font-size: 14px;
   font-weight: 600;
   cursor: pointer;
}
</style>