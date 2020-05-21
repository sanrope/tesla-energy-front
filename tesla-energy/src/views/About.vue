<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
        raised
        class="mx-auto"
        max-width="400"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">Universidad del Valle</v-list-item-title>
              <v-list-item-subtitle class="">Escuela de Ingeniería de Sistemas y Computación</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-img
            contain
            class="white--text align-end"
            height="280px"
            :src="require('@/assets/logo_uv.png')"
          >
          </v-img>

          <v-card-subtitle class="pb-0">Aplicaciones en el WEB y Redes Inalámbricas</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Autores:</div>
            <div>
            <ul>
              <li>Santiago Rodriguez Penagos</li>
              <li>Juan Felipe Orozco Escobar</li>
              <li>Juan Camilo Sanchez Barreiro</li>
            </ul>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
