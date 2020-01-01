<template>
  <span>
    <v-navigation-drawer
      v-model="drawer"
      :right="right"
      :width="width"
      :clipped="$vuetify.breakpoint.lgAndUp"
      :temporary="temporary"
      :permanent="permanent"
      fixed
      :mini-variant="mini"
      app
    >
      <v-toolbar
        dense
        v-if="userdata"
      >
        <v-toolbar-title v-if="!mini">
          <app-tooltip
            bottom
            tooltip="Usuario"
          >{{user.name}}</app-tooltip>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <app-notifications :notifications="notifications"></app-notifications>
        <v-spacer></v-spacer>
      </v-toolbar>
      <template v-for="(item, i) in items">
        <v-divider
          v-if="item.divider"
          :key="i"
          dark
          class="my-3"
        ></v-divider>
        <v-list-tile
          v-else
          :key="i"
          :to="item.link"
        >
          <app-tooltip
            bottom
            :tooltip="item.title == 'USER'?user.name:item.title"
            v-if="mini"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
          </app-tooltip>
          <v-list-tile-action v-else>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content></v-list-tile-content>
          <v-list-tile-title>{{item.title == "USER"?user.name:item.title}}</v-list-tile-title>
        </v-list-tile>
      </template>
      <app-tooltip
        bottom
        tooltip="Salir"
      >
        <v-list-tile
          v-if="logoutshow"
          @click="userSignOut"
        >
          <v-list-tile-action>
            <v-icon>fa-power-off</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Salir</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </app-tooltip>
      <center>
        <app-tooltip
          bottom
          tooltip="Configuracion"
        >
          <v-btn
            v-if="config"
            icon
            flat
            to="/system/config"
          >
            <v-icon>fa-cogs</v-icon>
          </v-btn>
        </app-tooltip>
        <app-tooltip
          bottom
          tooltip="Minimizar Menú"
        >
          <v-btn
            icon
            flat
            @click="mini = !mini"
          >
            <v-icon v-if="mini">fa-caret-right</v-icon>
            <v-icon v-else>fa-caret-left</v-icon>
          </v-btn>
        </app-tooltip>
      </center>
    </v-navigation-drawer>
  </span>
</template>

<script>
export default {
    props: [
        'userdata',
        'drawer',
        'items',
        'right',
        'temporary',
        'permanent',
        'logout',
        'notifications',
        'config'
    ],
    data: () => ({
        width: 191,
        mini: false
    }),
    computed: {
        user () {
            return this.$store.getters.user_g_user;
        },
        usertype () {
            return this.$store.getters.user_g_user;
        },
        logoutshow () {
            return this.user && this.logout ? true : false;
        }
    },
    methods: {
        dummyfunction () {
            alert('demo');
        },
        userSignOut () {
            this.$store.dispatch('user_a_signout');
            this.$router.push('/');
        }
    }
};
</script>
