<script setup lang="ts">
import { computed } from 'vue';
import { useGameStore } from '../stores/game'

const props = defineProps<{
   posY: number,
   posX: number
}>()

const gameStore = useGameStore()


const tileStatus = computed(() => gameStore.board.real[props.posY][props.posX])

</script>

<template>
   <div class="tile" @click="gameStore.activateTile(posY, posX)" :hide="tileStatus === false || null">
      <div v-if="tileStatus !== null"></div>
   </div>
</template>

<style lang="scss">
.tile {
   background: var(--tile);
   min-width: 48px;
   width: 100%;
   max-width: 96px;
   height: 100%;
   border-radius: 8px;
   cursor: pointer;
   overflow: hidden;

   &[hide] {
      opacity: 0.05;
      cursor: unset;
   }
}

.tile div {
   background: v-bind('gameStore.tileActiveColor');
   width: 100%;
   height: 100%;
}
</style>
