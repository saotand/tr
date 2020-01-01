<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="300"
    offset-x
  >
    <template
      v-slot:activator="{ on }"
      tag="span"
    >
      <v-btn
        icon
        v-on="on"
      >
        <v-icon>info</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar v-if="user.image">
            <img
              style="margin-top:1px"
              :src="baseurl+user.image"
              :alt="user.name+' '+user.last"
              class="img-responsive"
            />
          </v-list-tile-avatar>
          <v-list-tile-avatar v-else>
            <img
              style="margin-top:1px"
              src="@/assets/sin_foto.png"
              :alt="user.name+' '+user.last"
              class="img-responsive"
            />
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{user.name+' '+user.last}}</v-list-tile-title>
            <v-list-tile-sub-title>{{levels[user.level]+' - '+active[user.active]}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <!--
            <v-list-tile-action>
              <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                <v-icon>favorite</v-icon>
              </v-btn>
          </v-list-tile-action>-->
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>fa-credit-card</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{user.nac+'-'+user.doc}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>fa-envelope</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{user.email}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action class="text--right">
            <v-icon>fa-whatsapp</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{user.phone}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>fa-birthday-cake</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{user.birth}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>fa-asterisk</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{user.created}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          @click="menu = false"
        >Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import axios from 'axios';
export default {
    props: ['user'],
    data: () => ({
        active: ['Inactivo', 'Activo'],
        levels: [
            'Usuario',
            'Vendedor',
            'Mayorista',
            'Agente',
            'Supervisor',
            'Administrador'
        ],
        fav: true,
        menu: false,
        message: false,
        hints: false
    }),
    computed: {
        baseurl () {
            return axios.defaults.baseURL;
        }
    }
};
</script>

