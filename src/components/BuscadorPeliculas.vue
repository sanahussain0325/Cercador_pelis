<script setup>
import { ref } from 'vue'

const textCerca = ref('')

defineEmits(['cercar', 'borrar'])
</script>

<template>
  <v-container class="buscador-container">
    <div class="buscador-row">
      <v-text-field
        v-model="textCerca"
        label="Què vols cercar?"
        append-inner-icon="mdi-magnify"
        @keydown.enter="$emit('cercar', textCerca)"
        class="buscador-input"
      ></v-text-field>

      <v-btn
        @click="$emit('cercar', textCerca)"
        color="primary"
        size="large"
        class="btn-cercar"
      >
        Cercar
      </v-btn>
    </div>

    <div class="botones-secundarios">
      <v-btn
        @click="$emit('borrar')"
        color="primary"
        variant="outlined"
        size="large"
      >
        Netejar el cercador
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.buscador-container {
  padding: 20px 0;
}

.buscador-row {
  display: flex;
  gap: 10px;
  align-items: flex-end;
  margin-bottom: 15px;
}

.buscador-input {
  flex: 1;
}

.btn-cercar {
  height: 56px;
  min-width: 120px;
}

.botones-secundarios {
  display: flex;
  gap: 10px;
}
</style>