
<template>
  <v-container fluid justify-space-around grid-list-xs>
    <app-navdrawer
      :userdata="user"
      :drawer="drawer"
      :items="items"
      :logout="logout"
      :notifications="notifications"
      permanent
      :config="config"
    ></app-navdrawer>
    <router-view></router-view>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      drawer: true,
      rightside: false,
      mini: false,
      absolute: false,
      drawer_width: 300,
      config: true,
      logout: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user_g_user;
    },
    noticolor() {
      if (this.notifications > 0) {
        return "red--text";
      } else {
        return "gray--text";
      }
    },
    items() {
      let menu = this.$store.getters.ui_g_menulogin;
      let userlevel = this.user ? this.user.level : "6";
      return menu[userlevel];
    },
    notifications() {
      return [];
    }
  },
  watch: {
    user(value) {
      if (value == null || value == undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    loadMain() {
      if (this.user) {
        if (this.user.level > 3) {
          this.$store.dispatch("admin_a_set_users");
          this.$store.dispatch("admin_a_set_allask");
        }
      }
      this.$store.dispatch("admin_a_set_models");
      this.$store.dispatch("admin_a_set_brands");
      this.$store.dispatch("admin_a_set_subparts");
      this.$store.dispatch("admin_a_set_parts");
      this.$store.dispatch("ask_a_myasks");
    }
  },
  created() {},
  updated() {
    this.loadMain();
    console.log("updated System");
    let Token = sessionStorage.getItem("token");
    if (!Token) {
      alert("no");
    }
  }
};
</script>

<style scoped>
.red {
  color: red !important;
}
.v-btn--active {
  background-color: red !important;
}
.v-list__tile--active {
  background-color: aliceblue;
}
.topspacer {
  width: 100%;
  height: 10px;
}
</style>