<template>
  <span>
    <v-dialog v-model="dialog" :width="form.width" :persistent="form.persistent">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" :disabled="off">
          <v-icon>fa-trash</v-icon>
        </v-btn>
      </template>
      <app-panel dark noerror noloading>
        <template slot="title">
          <v-icon left v-text="form.icon"></v-icon>
          {{form.action}} {{form.title}}
        </template>
        <template slot="button">
          
          <app-tooltip right tooltip="Cerrar Ventana">
            <v-btn icon @click="oncancel">
              <v-icon>fa-times</v-icon>
            </v-btn>
          </app-tooltip>
        </template>
        <v-card-text>
          <v-layout row>
            <v-flex xs12>
              <center>
                <h3>Esta seguro de eliminar el siguiente Usuario?</h3>
                <br>
                <h2>
                  {{udata.name+' '+udata.last}}
                  <br>
                  <app-tooltip
                    bottom
                    tooltip="Al hacer click puedes enviarle un mensaje a este dirección de correo"
                  >
                    <a :href="'mailto:'+udata.email">{{udata.email}}</a>
                  </app-tooltip>
                </h2>
                <br>
                <br>
                <code>{{form.ref}}</code>
              </center>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <form @submit.prevent="onsubmit">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :outline="!darkset"
              :color="!darkset?'primary':''"
              v-if="!loading"
              @click="oncancel"
              :disabled="loading"
              :loading="loading"
            >
              <v-icon left>fa-times</v-icon>Cancelar
            </v-btn>
            <v-btn type="submit" color="primary" :disabled="loading" :loading="loading">
              <v-icon left>fa-trash</v-icon>Eliminar
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </form>
      </app-panel>
    </v-dialog>
  </span>
</template>
<script>
export default {
  props: ["udata", "off"],
  data: () => ({
    form: {
      action: "Eliminar",
      title: "Usuario",
      icon: "fa-user-times",
      ok: "Guardar",
      cancel: "Cancelar",
      ok_icon: "fa-save",
      cancel_icon: "fa-times",
      persistent: true,
      width: "500",
      switchcolor: "red",
      dialog: false,
      ref:
        "Referencias y acciones de este usuario aun podran ser accedidas desde los reportes"
    },
    master: "",
    dialog: false
  }),
  computed: {
    darkset() {
      return this.$store.getters.ui_g_dark;
    },
    user() {
      return this.$store.getters.user_g_user;
    },
    loading() {
      return this.$store.getters.ui_g_loading;
    }
  },
  methods: {
    onsubmit() {
      let ID = this.udata.ID;
      this.$store.dispatch("admin_a_del_users", ID);
      this.dialog = false;
    },
    oncancel() {
      this.dialog = false;
    },
    onDismissed() {
      this.$store.dispatch("ui_a_clear_error");
    }
  }
};
</script>

<style>
</style>

