<template>
  <app-panel
    dark
    noerror
  >
    <template slot="title">
      <v-icon left>{{panel.icon}}</v-icon>
      <b>{{panel.title}}</b>
    </template>
    <template slot="button">
      <v-tooltip
        bottom
        v-if="panel.search"
      >
        <template v-slot:activator="{ on }">
          <span v-on="on">
            <v-text-field
              clearable
              dark
              v-model="search"
              prepend-icon="fa-search"
              single-line
              style="position:relative;top:4px"
              placeholder="Buscar"
            ></v-text-field>
          </span>
        </template>
        <span>Busqueda</span>
      </v-tooltip>

      <v-tooltip
        bottom
        v-if="panel.refresh"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
            @click="refresh"
          >
            <v-icon
              dark
              class="text-white"
            >fa-refresh</v-icon>
          </v-btn>
        </template>
        <span>Actualizar</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            <app-model-dialog-add :brands="brands"></app-model-dialog-add>
            <!-- fa-plus -->
          </span>
        </template>
        <span>Nueva Marca</span>
      </v-tooltip>
    </template>
    <app-models-list
      :items="models"
      :search="search"
      :brands="brands"
    ></app-models-list>
  </app-panel>
</template>
<script>
/* eslint-disable */
export default {
  data () {
    return {
      panel: {
        title: "Modelos",
        icon: "fa-car",
        refresh: true,
        add: true,
        edit: true,
        delete: true,
        search: true
      },
      details: true,
      search: ""
    };
  },
  computed: {
    user () {
      return this.$store.getters.user_g_user;
    },
    brands () {
      return this.$store.getters.admin_g_brands;
    },
    models () {
      return this.$store.getters.admin_g_models;
    },
    loading () {
      return this.$store.getters.ui_g_loading;
    },
    error () {
      return this.$store.getters.ui_g_error;
    }
  },
  methods: {
    onDismissed () {
      this.$store.dispatch("ui_a_clear_error");
    },
    refresh () {
      this.$store.dispatch("admin_a_set_models");
      //this.$store.dispatch("admin_a_set_brands");
      this.$store.dispatch("ui_a_clear_error");
    }
  },
  created () {
    if (this.brands.length < 1) {
      this.$store.dispatch("admin_a_set_brands");
    }
    if (this.models.length < 1) {
      this.$store.dispatch("admin_a_set_models");
    }
  },
  updated () {
    console.log("updated models");
  }
};
</script>

<style>
.v-list__tile--active {
  background-color: aliceblue;
}
</style>


