<template>
  <app-panel noerror>
    <template slot="title">Pagina no encontrada</template>
    <template slot="button">
      <app-tooltip
        bottom
        tooltip="Inicio"
      >
        <v-btn>
          <v-icon>fa-home</v-icon>
        </v-btn>
      </app-tooltip>
    </template>
    <v-layout justify-center>
      <v-responsive>
        <v-flex
          xs6
          offset-xs-3
        >
          <h3>La pagina que solicitaste no existe, si escribiste la direccion web asegurate de que este correctamente definida, si fue un vinculo, notifica al administrador del sitio web sobre links rotos.</h3>
          <br />
          <br />
          <v-btn
            class="primary"
            to="/"
          >Ir al inicio</v-btn>
          <br />
          <br />
          <br />
        </v-flex>
      </v-responsive>
    </v-layout>
  </app-panel>
</template>