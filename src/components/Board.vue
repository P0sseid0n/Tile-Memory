<script setup lang="ts">
import Tile from './Tile.vue';
import { ref } from 'vue'

import { useGameStore } from '../stores/game'

const gameStore = useGameStore()

const tileQuantity = gameStore.tileQtt
</script>

<template>
   <div id="Board">
      <template v-for="(row, posY) in gameStore.board.length">
         <Tile v-for="(tile, i) in gameStore.board[posY]" :posX="i" :posY="posY" />
      </template>
   </div>
</template>

<style scoped>
#Board {
   display: inline-grid;
   grid-template-columns: repeat(v-bind(tileQuantity), 1fr);
   grid-template-rows: repeat(v-bind(tileQuantity), 1fr);
   grid-gap: 2%;
   align-content: center;
   width: 100%;
   max-width: calc(96px * v-bind(tileQuantity));
   aspect-ratio: 1/1;
}
</style>
