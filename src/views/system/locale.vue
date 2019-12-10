<template>
  <app-panel noerror>
    <template slot="title">
      <v-icon left>fa-map</v-icon>Localizacion
    </template>
    <template slot="button">
      <app-tooltip bottom tooltip="Regresar" v-if="selected">
        <v-btn icon to="/system/locale">
          <v-icon>fa-arrow-circle-up</v-icon>
        </v-btn>
      </app-tooltip>
      <app-tooltip bottom tooltip="Actualizar">
        <v-btn icon @click="refresh">
          <v-icon dark class="text-white">fa-refresh</v-icon>
        </v-btn>
      </app-tooltip>
      <app-tooltip bottom tooltip="Nueva Ubicacion">
        <app-loaction-form></app-loaction-form>
      </app-tooltip>
    </template>
    <v-card v-if="selected">
      <v-card-text>
        <v-layout row>
          <v-flex>
            Ciudades de:
            <b>Venezuela</b>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
    <app-location-list :items="localizationlist"></app-location-list>

    <!--
    <br />
    <v-card-text>
      <app-select-location v-model="locale"></app-select-location>
    </v-card-text>-->
    <code>{{localizationlist}}</code>
  </app-panel>
</template>

<script>
/* eslint-disable */
import cmplocationlist from "@/components/location/list_location.vue";
import cmplocationform from "@/components/location/form_location.vue";

export default {
  data: () => ({
    locale: "638bf86ce55413fd71692155d3d082"
  }),
  computed: {
    localizationlist() {
      let locallist = this.$store.getters.ui_g_locationlist;
      if (this.selected) {
        let preplist = [];
        locallist.forEach((c, i) => {
          if (c.value == this.selected) {
            c.childs.forEach((ct, i) => {
              preplist.push({
                text: ct.text,
                value: ct.value,
                childs: ct.childs
              });
            });
          }
        });
        return preplist;
      } else {
        return locallist;
      }
    },
    selected() {
      return this.$route.params.value;
    },
    parent() {
      return false;
    }
  },
  watch: {},
  methods: {
    refresh() {
      this.$store.dispatch("ui_a_locationlist");
    }
  },
  created() {},
  updated() {
    /*
    if (this.localizationlist.length == 0) {
      this.$router.push("/system/locale");
    }
    */
    console.log("updated locale");
  },
  components: {
    "app-location-list": cmplocationlist,
    "app-loaction-form": cmplocationform
  }
};
</script>

<style>
</style>
