<script setup lang="ts">
import BoardRow from '@/components/BoardRow.vue'
import { ref } from 'vue';

import { useGameStore } from '../stores/game'

const gameStore = useGameStore()

const tileQuantity = gameStore.tileQtt





</script>

<template>
   <div id="Board">
      <BoardRow v-for="(row, i) in gameStore.board.real.length" :posY="i" />

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
