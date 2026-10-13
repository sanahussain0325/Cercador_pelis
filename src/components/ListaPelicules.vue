<script setup>
import { ref } from 'vue'
import { detallPelicula } from '../services/CommunicationManager.js'

defineProps(['resultats'])

const mostrarInfo = ref(false)
const infoPelicula = ref(null)
const cargant = ref(false)

async function Info(imdbID) {
  cargant.value = true           
  infoPelicula.value = null
  mostrarInfo.value = true

  try {
    const detalls = await detallPelicula(imdbID)
    infoPelicula.value = detalls
  } catch (err) {
    console.error(err)
  } finally {
    cargant.value = false
  }
}
</script>

<template>
  <v-container>
    <div class="resultados-info">
      <div v-if="resultats.length==0" class="sin-resultados">
        No s'han trobat resultats
      </div>

      <div v-else class="contador">
        S'han trobat {{ resultats.length }} pel·licules
      </div>
    </div>

    <v-row>
      <v-col v-for="element in resultats" :key="element.imdbID" cols="12" sm="6" md="4">
        <v-card class="card-blanco">
          <v-img :src="element.Poster" height="350" cover></v-img>

          <v-card-title class="pelicula-titulo">{{ element.Title }}</v-card-title>

          <v-card-text class="texto">
            <div><b>Any: </b> {{ element.Year }}</div>
            <div><b>Tipus: </b> {{ element.Type }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              @click="Info(element.imdbID)"
              class="btn-mes-info">            
              Més info
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="mostrarInfo" max-width="500">
    <v-card>
      <div v-if="cargant" class="loading-container">
        <v-progress-circular 
          color="blue-lighten-3" 
          indeterminate 
          :size="49" 
          :width="6">
        </v-progress-circular>
      </div>

      <v-card-text v-if="infoPelicula" class="dialog-content">
        <p><b>Escritor:</b> {{ infoPelicula.Writer }}</p>
        <p><b>Gènere:</b> {{ infoPelicula.Genre }}</p>
        <p><b>Director:</b> {{ infoPelicula.Director }}</p>
        <p><b>Actors:</b> {{ infoPelicula.Actors }}</p>
        <p><b>Plot:</b> {{ infoPelicula.Plot }}</p>
        <p><b>Durada:</b> {{ infoPelicula.Runtime }}</p>
        <p><b>Any:</b> {{ infoPelicula.Year }}</p>
      </v-card-text>

      <v-card-actions>
      <v-btn @click="mostrarInfo = false" color="primary" class="tancar">
        Tancar
      </v-btn>
    </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.resultados-info {
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.sin-resultados {
  font-size: 16px;
  color: #0352ad;
  font-weight: bold;
}

.contador {
  font-size: 16px;
  color: #145a0d;
  font-weight: bold;
}

.dialog-content {
  line-height: 1.8;
}

.dialog-content p {
  margin-bottom: 10px;
}

.dialog-content b {
  color: #b973ae;
}

.pelicula-titulo {
  font-size: 22px ;
  font-weight: bold ;
  color: #a70d73 ;
  padding: 16px 16px 8px 16px ;
}

.btn-mes-info {
  background-color: #d196c2;
  color: rgb(0, 0, 0) ;
  font-weight: bold ;
}

.tancar{
  background-color: #d196c2;
  color: rgb(0, 0, 0) ;
  font-weight: bold ;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.card-blanco {
  background-color: white;
}

.texto{
  color: black;
}
</style>