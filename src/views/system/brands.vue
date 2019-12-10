<template>
  <app-panel dark noerror>
    <template slot="title">
      <v-icon left>{{panel.icon}}</v-icon>
      {{panel.title}}
    </template>
    <template slot="button">
      <v-tooltip bottom v-if="panel.search">
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
      <v-tooltip bottom v-if="panel.refresh">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="refresh">
            <v-icon dark class="text-white">fa-refresh</v-icon>
          </v-btn>
        </template>
        <span>Actualizar</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            <app-brand-dialog-add></app-brand-dialog-add>
            <!-- fa-plus -->
          </span>
        </template>
        <span>Nueva Marca</span>
      </v-tooltip>
    </template>
    <app-brand-list :items="brands" :search="search"></app-brand-list>
  </app-panel>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      panel: {
        title: "Marcas",
        icon: "fa-certificate",
        refresh: true,
        add: true,
        edit: true,
        delete: true,
        pause: true,
        search: true
      },
      details: true,
      search: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user_g_user;
    },
    brands() {
      return this.$store.getters.admin_g_brands;
    }
  },
  methods: {
    refresh() {
      this.$store.dispatch("admin_a_set_brands");
      this.$store.dispatch("ui_a_clear_error");
    }
  },
  created() {
    if (this.brands.length < 1) {
      this.$store.dispatch("admin_a_set_brands");
    }
  },
  updated() {
    console.log("updated brands");
  }
};
</script>