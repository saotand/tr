<template>
  <app-panel dark noerror>
    <template slot="title">
      <v-icon left v-text="panel.icon"></v-icon>
      <b>{{panel.title}}</b>
    </template>
    <template slot="button">
      <app-tooltip bottom tooltip="Editar Perfil">
        <v-btn icon>
          <v-icon v-text="'fa-edit'" @click="onedit"></v-icon>
        </v-btn>
      </app-tooltip>
    </template>
    <v-card-text>
      Contenido
      <hr />
      <code>{{userdata}}</code>
      <hr />
      <code>{{user}}</code>
    </v-card-text>
  </app-panel>
</template>

<script>
/* eslint-disable */
export default {
  data: () => ({
    panel: {
      title: "Perfil",
      icon: "face"
    },
    userdata: {
      ID: "",
      email: "",
      pass: "",
      doc: "",
      nac: "",
      doctype: "",
      name: "",
      last: "",
      level: "",
      phone: "",
      birth: "",
      created: "",
      active: "",
      verified: "",
      login_count: "",
      ip: "",
      config: "",
      theme: "",
      user_ban_start: "",
      user_ban_end: "",
      user_ban_details: ""
    }
  }),
  computed: {
    comparePasswords() {
      return this.userdata.password != this.userdata.confirmpassword
        ? "Las contraseñas deben ser iguales"
        : false;
    },
    user() {
      return this.$store.getters.user_g_user;
    }
  },
  watch: {},
  methods: {
    onedit() {
      alert("editando");
    },
    onSignUp() {
      this.$store.dispatch("signUserUp", this.userdata);
    },
    onDismissed() {
      this.$store.dispatch("ui_a_clear_error");
    }
  },
  updated() {
    if (this.userdata.ID != this.user.ID) {
      this.userdata = this.user;
      alert("?");
    }
    console.log("updated profile");
  },
  activated() {
    alert("hola");
  }
};
</script>

<style>
</style>


