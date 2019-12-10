<template>
  <app-panel dark noerror>
    <template slot="title">
      <v-icon left>fa-gears</v-icon>Configuración
    </template>
    <v-card-text>
      <v-layout row wrap v-if="(user)&& (user.level=='1')">
        <v-flex xs12>
          <h3>Notificaciones de Venta</h3>
          <br />
          <app-sell-profile :profile="sell" @profilechanged="sell = $event"></app-sell-profile>
        </v-flex>
      </v-layout>
      <br />
      <br />
      <hr v-if="(user) && (user.level=='1')" />
      <br />
      <br />
      <v-layout row wrap>
        <v-flex xs12>
          <h3>Tema</h3>
          <v-switch color="primary" v-model="darkset" :label="msgds" @click="changetheme"></v-switch>
        </v-flex>
      </v-layout>
    </v-card-text>
    <br />
    <code>{{sell}}</code>
    <br />

    <br />

    <br />
    <br />
    <br />
  </app-panel>
</template>

<script>
/* eslint-disable */
import Axios from "axios";

export default {
  data: () => ({
    ft: true
  }),
  watch: {},
  computed: {
    user() {
      return this.$store.getters.user_g_user;
    },
    sell: {
      get() {
        return this.user.profile;
      },
      set(value) {}
    },
    darkset: {
      get() {
        return this.$store.getters.ui_g_dark;
      },
      set(value) {
        return this.$store.dispatch("ui_a_dark", value);
      }
    },
    msgds() {
      if (this.darkset) {
        return "Deshabilitar el modo Oscuro";
      } else {
        return "Habilitar el Modo Oscuro";
      }
    }
  },
  methods: {
    changetheme() {
      this.$store.dispatch("ui_a_dark");
    }
  },
  mounted() {
    /*
    if (this.profile) {
      this.sell = this.profile;
    }*/
  },
  updated() {
    //if (!this.sell.length) {
    //this.sell = this.profile;
    //}
  }
};
</script>

<style>
</style>

