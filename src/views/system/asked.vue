<template>
  <app-panel color="primary" dark noerror>
    <template slot="title">
      <v-icon left>{{panel.icon}}</v-icon>
      <b>{{askID ? panel.titlealt:panel.title}}</b>
    </template>
    <template slot="button">
      <app-tooltip v-if="!askID" bottom tooltip="Buscar">
        <v-text-field
          clearable
          dark
          v-model="search"
          prepend-icon="fa-search"
          single-line
          style="position:relative;top:4px"
          placeholder="Buscar"
        ></v-text-field>
      </app-tooltip>

      <app-tooltip v-if="!askID" bottom tooltip="Actualizar">
        <v-btn icon @click="refresh">
          <v-icon dark class="text-white">fa-refresh</v-icon>
        </v-btn>
      </app-tooltip>

      <app-tooltip bottom tooltip="Nueva Pregunta">
        <v-btn icon disabled>
          <v-icon>fa-plus</v-icon>
        </v-btn>
      </app-tooltip>
    </template>
    <app-ask-list v-if="!askID" :search="search" :items="asks" :headers="headers"></app-ask-list>
    <router-view v-else></router-view>
  </app-panel>
</template>
<script>
/* eslint-disable */

import cmpAppAskList from "@/components/modules/ask/list/ask_list";

export default {
  data() {
    return {
      panel: {
        title: "Mis Preguntas",
        titlealt: "Pregunta",
        icon: "fa-comment",
        options: true,
        refresh: true,
        add: true,
        edit: true,
        delete: true,
        pause: true,
        search: true
      },
      headers: {},
      details: true,
      search: ""
    };
  },
  computed: {
    askID() {
      return this.$route.params.askid;
    },
    asks() {
      return this.$store.getters.ask_g_asks;
    },
    users() {
      return this.$store.getters.admin_g_users;
    }
  },
  methods: {
    refresh() {
      this.$store.dispatch("ask_a_myasks");
      this.$store.dispatch("ui_a_clear_error");
    }
  },
  updated() {
    console.log("updated asked");
  },
  components: {
    "app-ask-list": cmpAppAskList
  }
};
</script>
