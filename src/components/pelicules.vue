<script setup>
import { ref } from 'vue'
import { cercarPerText } from '../services/CommunicationManager.js'
import BuscadorPeliculas from './BuscadorPeliculas.vue'
import ListaPelicules from './ListaPelicules.vue'

const resultats = ref([])

async function cercar(textoCerca) {
  resultats.value = await cercarPerText(textoCerca)
  console.log(resultats.value)
}

function borrar() {
  resultats.value = []
}
</script>

<template>
  <BuscadorPeliculas @cercar="cercar" @borrar="borrar" />
  <ListaPelicules :resultats="resultats" />
</template>