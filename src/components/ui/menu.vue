<template>
  <span>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      fixed
    >
      <v-toolbar-title>
        <v-btn
          flat
          style="margin:0;padding:0;height:64px;"
        >
          <span style="position:relative; top:-3px;">
            <img
              class="logomain img-responsive"
              v-if="darkset"
              src="@/assets/logominidark.png"
            />
            <img
              class="logomain img-responsive"
              v-else
              src="@/assets/logomini.png"
            />
          </span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          v-for="item in menuitems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title == "USER"?user.name:item.title}}
        </v-btn>
        <v-btn
          flat
          v-if="user"
          @click="userSignOut"
        >
          <v-icon left>fa-power-off</v-icon>Salir
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
    </v-toolbar>
    <app-navdrawer
      class="hidden-md-and-up"
      :drawer="drawer"
      :items="menuitems"
      :right="right"
      :temporary="temporary"
      :logout="logout"
    ></app-navdrawer>
  </span>
</template>

<script>
export default {
    props: ['menuitems'],
    data: () => ({
        drawer: false,
        right: true,
        temporary: true,
        logout: true
    }),
    computed: {
        user () {
            return this.$store.getters.user_g_user;
        },
        menu () {
            return this.$store.getters.ui_g_menu;
        },
        darkset () {
            return this.$store.getters.ui_g_dark;
        }
    },
    methods: {
        userSignOut () {
            this.$store.dispatch('user_a_signout');
            this.$router.push('/');
        }
    },
    created () { }
};
</script>

<style>
.menustyle {
  -webkit-box-shadow: 0px 1px 10px 3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 1px 10px 3px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 1px 10px 3px rgba(0, 0, 0, 0.75);
  z-index: 99999;
}
.margincell {
  height: 52px;
  width: 50px;
}

.logomain {
  position: relative;
  top: 5px;
  width: 300px;
}
</style>