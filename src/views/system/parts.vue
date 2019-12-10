<template>
  <app-panel dark noerror>
    <template slot="title">
      <v-icon left>{{panel.icon}}</v-icon>
      <b>{{psp?'':'Sub '}}Partes</b>
    </template>
    <template slot="button">
      <app-tooltip bottom tooltip="Buscar">
        <v-text-field
          clearable
          v-model="search"
          prepend-icon="fa-search"
          single-line
          style="position:relative;top:4px"
          placeholder="Buscar"
        ></v-text-field>
      </app-tooltip>
      <app-tooltip bottom :tooltip="psp?'Sub Partes':'Partes'">
        <v-btn icon @click="psp=!psp">
          <v-icon dark class="text-white">{{psp?'fa-cogs':'fa-cog'}}</v-icon>
        </v-btn>
      </app-tooltip>
      <app-tooltip bottom tooltip="Actualizar">
        <v-btn icon @click="refreshlist">
          <v-icon dark class="text-white">fa-refresh</v-icon>
        </v-btn>
      </app-tooltip>
      <app-tooltip bottom :tooltip="psp?'Nueva Parte':'Nueva Sub Parte'">
        <app-parts-dialog-add v-if="psp" :subparts="subparts"></app-parts-dialog-add>
        <app-subparts-dialog-add v-else></app-subparts-dialog-add>
      </app-tooltip>
    </template>
    <app-parts-list v-if="psp" ref="parts" :parts="parts" :subparts="subparts" :search="search"></app-parts-list>
    <app-subparts-list v-else ref="subparts" :subparts="subparts" :search="search"></app-subparts-list>
  </app-panel>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      panel: {
        title: "Partes",
        icon: "extension"
      },
      psp: true,
      sdialog: false,
      search: ""
    };
  },
  computed: {
    parts() {
      return this.$store.getters.admin_g_parts;
    },
    subparts() {
      return this.$store.getters.admin_g_subparts;
    }
  },
  methods: {
    onDismissed() {
      this.$store.dispatch("ui_a_clear_error");
    },
    updatePartsList() {
      this.$store.dispatch("admin_a_set_parts");
    },
    updateSubPartsList() {
      this.$store.dispatch("admin_a_set_subparts");
    },
    updateList() {
      if (this.parts.length < 1) {
        this.updatePartsList();
      }
      if (this.subparts.length < 1) {
        this.updateSubPartsList();
      }
    },
    refreshlist() {
      this.updatePartsList();
      this.updateSubPartsList();
    },
    search_dialog() {
      this.sdialog = !this.sdialog;
    }
  },
  created() {
    this.$store.dispatch("admin_a_set_subparts");
    this.updateList();
  },
  updated() {
    console.log("updated parts");
  }
};
</script>

<style>
.v-list__tile--active {
  background-color: aliceblue;
}
</style>


