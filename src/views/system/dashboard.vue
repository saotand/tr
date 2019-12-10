<template>
  <span>
    <app-panel color="primary" dark noerror>
      <template slot="title">
        <v-icon left>{{panel.icon}}</v-icon>
        {{panel.title}}
      </template>
      <template slot="button">
        <v-btn icon>
          <v-icon>fa-plus</v-icon>
        </v-btn>
      </template>
      <v-card-text>
        <v-container grid-list-md style="padding:5px">
          <v-layout row wrap>
            <v-flex xs12 md3 lg3 v-if="user.level==5">
              <app-number color="blue darken-3" icon="fa-home" value="0" title="Visitas"></app-number>
            </v-flex>
            <v-flex xs12 md3 lg3 v-if="user.level==5">
              <app-number color="warning" icon="fa-users" :value="nusers" title="Usuarios"></app-number>
            </v-flex>
            <v-flex xs12 md3 lg3 v-if="user.level==5">
              <app-number color="primary" icon="fa-car" value="0" title="Piezas"></app-number>
            </v-flex>
            <v-flex xs12 md3 lg3 v-if="user.level==5">
              <app-number color="green" icon="fa-dollar" value="0" title="% de ventas"></app-number>
            </v-flex>
            <v-flex xs12 md3 lg3 v-if="user.level==0">
              <app-number color="warning" icon="fa-users" value="0" title="Compras"></app-number>
            </v-flex>
            <v-flex xs12 md3 lg3 v-if="user.level==0">
              <app-number color="success" icon="fa-comment" value="0" title="Respuestas"></app-number>
            </v-flex>
            <v-flex xs12 md3 lg3 v-if="user.level==0">
              <app-number color="primary" icon="fa-comments" value="0" title="Preguntas"></app-number>
            </v-flex>
            <v-flex xs12>
              <app-profileseller></app-profileseller>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </app-panel>
    {{users}}
  </span>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      panel: {
        icon: "fa-dashboard",
        title: "Resumen"
      },
      search: ""
    };
  },
  watch: {
    user(val) {
      console.log("log: " + val);
    }
  },
  computed: {
    user() {
      return this.$store.getters.user_g_user;
    },
    ulevel() {
      return this.$store.getters.admin_g_levels;
    },
    users() {
      return this.$store.getters.admin_g_users;
    },
    nusers() {
      return this.users.length;
    }
  },
  updated() {
    console.log("updated dashboard");
  }
};
</script>




