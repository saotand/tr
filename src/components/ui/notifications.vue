<template>
  <div class="text-xs-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="300"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          style="margin-right:10px"
          v-on="on"
        >
          <v-badge
            :color="cnotifications"
            top
          >
            <template v-slot:badge>
              <span>{{nnotifications}}</span>
            </template>
            <v-icon :color="cnotifications">notifications</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dense></v-toolbar>
        <v-list>
          <app-notification-item
            :notification="notification"
            v-for="notification in notifications"
            :key="notification.text"
          ></app-notification-item>
          <v-list-tile-content v-if="nnotifications == 0">
            <v-list-tile-title>
              <center>Sin Notificaciones</center>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
    props: ['notifications'],
    data: () => ({
        fav: true,
        menu: false,
        message: false,
        hints: true
    }),
    computed: {
        nnotifications () {
            return this.notifications.length;
        },
        cnotifications () {
            return this.nnotifications > 0 ? 'red' : '#999999';
        }
    }
};
</script>