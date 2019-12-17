<template>
  <v-card>
    <v-list>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img
            v-if="cuser.image"
            :src="baseurl+cuser.image"
            :alt="cuser.name+' '+cuser.last"
            class="img-responsive"
          />
          <img
            v-else
            src="@/assets/sin_foto.png"
            :alt="cuser.name+' '+cuser.last"
            class="img-responsive"
          />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{cuser.name}}</v-list-tile-title>
          <v-list-tile-sub-title>{{levels[cuser.level]}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-card-actions>
      <center>
        <!--
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn :class="fav ? 'red--text' : ''" icon v-on="on" @click="fav = !fav">
              <v-icon>star</v-icon>
            </v-btn>
          </template>
          <span>Favoritos</span>
        </v-tooltip>-->

        <app-user-form action="edit" :item="cuser"></app-user-form>
        <app-user-form action="del" :item="cuser"></app-user-form>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">
              <app-popupuserinfo :user="cuser"></app-popupuserinfo>
            </span>
          </template>
          <span>Mostrar detalles</span>
        </v-tooltip>

        <!--
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>search</v-icon>
            </v-btn>
          </template>
          <span>Busqueda</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>chat</v-icon>
            </v-btn>
          </template>
          <span>Consultas</span>
        </v-tooltip>-->
      </center>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import cmpUserForm from "@/components/modules/user/dialogs/user_form.vue";
import cmpPopupUserInfo from "@/components/modules/user/popup_profile.vue";

export default {
  props: ["cuser"],
  data() {
    return {
      master: "100000000000000000000000000001",
      levels: [
        "Usuario",
        "vendedor",
        "Mayorista",
        "Agente",
        "Supervisor",
        "Administrador"
      ],
      fav: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    baseurl() {
      return axios.defaults.baseURL;
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    }
  },
  components: {
    "app-user-form": cmpUserForm,
    "app-popupuserinfo": cmpPopupUserInfo
  }
};
</script>

<style>
.adminuser {
  color: navy;
  font-weight: bold !important;
}

.selfuser {
  color: darkgreen;
  font-weight: bold !important;
}
</style>
