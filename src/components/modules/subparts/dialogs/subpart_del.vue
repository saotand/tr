<template>
  <span>
    <v-dialog v-model="form.dialog" :width="form.width" :persistent="form.persistent">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>{{form.icon}}</v-icon>
        </v-btn>
      </template>
      <app-panel dark noerror noloading>
        <template slot="title">
          <v-icon left>{{form.icon}}</v-icon>
          {{form.action}} {{form.title}}
        </template>
        <template slot="button">
          <app-tooltip right tooltip="Cerrar Ventana">
            <v-btn icon @click="oncancel">
              <v-icon>fa-times</v-icon>
            </v-btn>
          </app-tooltip>
        </template>
        <form @submit.prevent="onsubmit">
          <v-card-text>
            <v-layout row>
              <v-flex xs12>
                <center>
                  <h3>Esta seguro que desea eliminar?</h3>
                  <br>
                  <h2>{{item.name}}</h2>
                  <br>
                </center>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :outline="!darkset"
              :color="!darkset?'primary':''"
              v-if="!loading"
              @click="closewindow"
              :disabled="loading"
              :loading="loading"
            >
              <v-icon left>{{form.cancel_icon}}</v-icon>
              {{form.cancel}}
            </v-btn>
            <v-btn type="submit" color="success" :disabled="loading" :loading="loading">
              <v-icon left>{{form.ok_icon}}</v-icon>
              {{form.ok}}
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
  props: ["item"],
  data: () => ({
    form: {
      action: "Eliminar",
      title: "Sub Partes",
      icon: "fa-trash",
      ok: "Eliminar",
      cancel: "Cancelar",
      ok_icon: "fa-trash",
      cancel_icon: "fa-times",
      persistent: true,
      activetooltip: "Eliminar Elementos Relacionados",
      width: "500",
      switchcolor: "red",
      minlength: 3,
      dialog: false
    },
    dialog: false
  }),
  computed: {
    darkset() {
      return this.$store.getters.ui_g_dark;
    },
    loading() {
      return this.$store.getters.ui_g_loading;
    }
  },
  methods: {
    onsubmit() {
      let ID = this.item.ID;
      this.$store.dispatch("admin_a_del_subparts", ID);
      this.closewindow();
    },
    oncancel() {
      this.closewindow();
    },
    closewindow() {
      this.form.dialog = false;
    },
    onDismissed() {
      this.$store.dispatch("ui_a_clear_error");
    }
  }
};
</script>