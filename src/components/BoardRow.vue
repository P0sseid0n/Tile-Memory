<script setup lang="ts">
import Tile from '@/components/Tile.vue'
import { useGameStore } from '../stores/game'

const gameStore = useGameStore()

defineProps<{
   posY: number
}>()


</script>

<template>
   <Tile v-for="(tile, i) in gameStore.board.real[posY]" :posX="i" :posY="posY" />

</template>

<style scoped>
</style>