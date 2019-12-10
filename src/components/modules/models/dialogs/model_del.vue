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
                  <h2>Esta seguro que desea eliminar?</h2>
                </center>
                <br>
                <center>
                  <h3>{{item.name}}</h3>
                </center>
                <br>
                <!-- <center class="text--red">Las referencias a esta marca seran eliminadas</center> -->
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
              @click="oncancel"
              :disabled="loading"
              :loading="loading"
            >
              <v-icon left>{{form.cancel_icon}}</v-icon>
              {{form.cancel}}
            </v-btn>
            <v-btn type="submit" color="primary" :disabled="loading" :loading="loading">
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
  /* eslint-disable */
  props: ["item"],
  data: () => ({
    form: {
      action: "Eliminar",
      title: "Modelo",
      icon: "fa-trash",
      ok: "Eliminar",
      cancel: "Cancelar",
      ok_icon: "fa-trash",
      cancel_icon: "fa-times",
      persistent: true,
      width: "500",
      dialog: false
    }
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
      let deleteID = this.item.ID;
      this.$store.dispatch("admin_a_del_model", deleteID);
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