<template>
  <v-card>
    <v-list>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <!--<v-img src="@/assets/sin_foto.png" :alt="user.name"></v-img>-->
          <img src="@/assets/sin_foto.png" :alt="cuser.name+' '+cuser.last" class="img-responsive" />
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

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">
              <app-user-dialog-edit :udata="cuser"></app-user-dialog-edit>
            </span>
          </template>
          <span>Editar Usuario</span>
        </v-tooltip>

        <span v-if="cuser.ID != master">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <app-user-dialog-delete :udata="cuser" :off="cuser.ID == user.ID"></app-user-dialog-delete>
              </span>
            </template>
            <span>Eliminar Usuario</span>
          </v-tooltip>
        </span>
        <span v-else>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <v-btn icon :disabled="true">
                  <v-icon>delete</v-icon>
                </v-btn>
              </span>
            </template>
            <span>Eliminar Usuario</span>
          </v-tooltip>
        </span>

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
import cmpEditUser from "@/components/modules/user/dialogs/edit_user_dialog";
import cmpDelUser from "@/components/modules/user/dialogs/del_user_dialog";

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
    "app-user-dialog-edit": cmpEditUser,
    "app-user-dialog-delete": cmpDelUser
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
