<template>
  <app-panel noerror>
    <template slot="title">
      <v-icon left>{{card.icon}}</v-icon>
      {{card.title}}
    </template>
    <template slot="button">
      <app-tooltip
        bottom
        tooltip="Cambiar"
      >
        <v-btn icon>
          <v-icon>fa-user</v-icon>
        </v-btn>
      </app-tooltip>
    </template>
    <v-card-text>
      <h3>{{ulevel[user.level].text}}</h3>
      <v-divider></v-divider>
      <br>
      <span>
        <b>Vendo:</b>
        <br>
        {{profile}}
        <v-divider></v-divider>
        <br>
        <b>Ventas:</b>
        <br>
        {{sells?sells:'Ninguna'}}
        <v-divider></v-divider>
        <br>
        <b>Preguntas:</b>
        <br>Ninguna
        <v-divider></v-divider>
      </span>
    </v-card-text>
    <v-card-actions></v-card-actions>
  </app-panel>
</template>

<script>
export default {
    data: () => ({
        card: {
            title: 'Ventas',
            icon: 'home'
        }
    }),
    computed: {
        sells () {
            return 0;
        },
        responses () {
            return 0;
        },
        ulevel () {
            return this.$store.getters.admin_g_levels;
        },
        user () {
            return this.$store.getters.user_g_user;
        },
        profile () {
            return [];
        }
    },
    methods: {}
};
</script>

<style>
</style>
