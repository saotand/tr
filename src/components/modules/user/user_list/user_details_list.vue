<template>
  <span>
    <v-data-table :headers="headers" :items="users" :search="search" class="elevation-1">
      <template v-slot:no-results>
        <div style="height:140px;margin-top:80px">
          <center>
            <h3>Buscar "{{ search }}" no dio resultados.</h3>
          </center>
        </div>
      </template>
      <template v-slot:items="props">
        <td>
          <v-avatar size="48" v-if="props.item.image" style="margin:3px">
            <img
              :src="baseurl+props.item.image"
              :alt="props.item.name+' '+props.item.last"
              class="img-responsive"
            />
          </v-avatar>
          <v-avatar size="48" v-else style="margin:3px">
            <img
              src="@/assets/sin_foto.png"
              :alt="props.item.name+' '+props.item.last"
              class="img-responsive"
            />
          </v-avatar>
        </td>
        <td
          :class="(props.item.ID == master) ? 'adminuser': (user.ID == props.item.ID)? 'selfuser':null"
        >{{props.item.email}}</td>
        <td>{{props.item.name}} {{props.item.last}}</td>
        <td>{{props.item.nac}}-{{props.item.doc}}</td>
        <td>{{levels[props.item.level]}}</td>
        <td>
          <app-user-form action="edit" :item="props.item"></app-user-form>
          <app-user-form action="del" :item="props.item"></app-user-form>

          <!--
          <span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <app-user-dialog-edit :udata="props.item"></app-user-dialog-edit>
                </span>
              </template>
              <span>Editar Usuario</span>
            </v-tooltip>
          </span>
          <span v-if="props.item.ID != master">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <app-user-dialog-delete :udata="props.item" :off="user.ID == props.item.ID"></app-user-dialog-delete>
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
                    <v-icon>fa-trash</v-icon>
                  </v-btn>
                </span>
              </template>
              <span>Eliminar Usuario</span>
            </v-tooltip>
          </span>
          -->
          <span style="overflow:hidden">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <app-popupuserinfo :user="props.item"></app-popupuserinfo>
                </span>
              </template>
              <span>Mostrar detalles</span>
            </v-tooltip>
          </span>
        </td>
      </template>
    </v-data-table>
  </span>
</template>

<script>
import axios from "axios";

import cmpPopupProfile from "@/components/modules/user/popup_profile";
import cmpUserForm from "@/components/modules/user/dialogs/user_form.vue";

export default {
  props: ["users", "search"],
  data() {
    return {
      pagination: "0",
      master: "100000000000000000000000000001",
      levels: [
        "Usuario",
        "Vendedor",
        "Mayorista",
        "Agente",
        "Supervisor",
        "Administrador"
      ],
      headers: [
        {
          text: "Foto",
          align: "center",
          sortable: false,
          value: "image"
        },
        {
          text: "Email",
          align: "left",
          sortable: true,
          value: "email"
        },
        {
          text: "Nombre",
          value: "name"
        },
        {
          text: "Cedula",
          value: "doc"
        },
        {
          text: "Tipo",
          value: "level"
        },
        {
          text: "Opciones",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.getters.user_g_user;
    },
    baseurl() {
      return axios.defaults.baseURL;
    }
  },
  components: {
    "app-user-form": cmpUserForm,
    "app-popupuserinfo": cmpPopupProfile
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
