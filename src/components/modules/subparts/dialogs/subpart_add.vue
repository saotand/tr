<template>
  <span>
    <v-dialog v-model="form.dialog" :width="form.width" :persistent="form.persistent">
      <template v-slot:activator="{ on }">
        <v-list-tile v-if="list" v-on="on">
          <v-list-tile-action>
            <v-icon :class="!black?'text-white':''">{{form.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{form.title}}</v-list-tile-title>
        </v-list-tile>
        <v-btn v-else icon v-on="on" ref="part_add">
          <v-icon :class="!black?'text-white':''">{{form.action}} {{form.icon}}</v-icon>
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
                <v-text-field
                  name="name"
                  label="Nombre"
                  id="name"
                  type="text"
                  v-model="subpart.name"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-tooltip bottom :tooltip="form.activetooltip">
              <v-switch
                :color="form.switchcolor"
                v-model="subpart.active"
                :label="subpart.active?'Activa':'Inactiva'"
              ></v-switch>
            </app-tooltip>
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
            <v-btn type="submit" color="success" :disabled="loading||changed" :loading="loading">
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
  props: ["tsubpart", "brands", "black", "list", "dark"],
  data: () => ({
    form: {
      action: "Añadir",
      title: "Sub Parte",
      icon: "fa-plus",
      ok: "Guardar",
      cancel: "Cancelar",
      ok_icon: "fa-save",
      cancel_icon: "fa-times",
      activetooltip:
        "Al desactivar no se mostraran en el listado de partes (incio)",
      persistent: true,
      width: "500",
      switchcolor: "primary",
      dialog: false
    },
    dialog: false,
    subpart: {
      //ID:"",
      name: "",
      count: "0",
      active: true
    }
  }),
  computed: {
    changed() {
      let s = this.subpart;
      return s.name == "";
    },
    darkset() {
      return this.$store.getters.ui_g_dark;
    },
    loading() {
      return this.$store.getters.ui_g_loading;
    }
  },
  watch: {},
  methods: {
    onsubmit() {
      let addsubpart = {
        name: this.subpart.name,
        count: this.subpart.count,
        active: this.subpart.active ? "1" : "0"
      };
      this.$store.dispatch("admin_a_add_subparts", addsubpart);
      this.closewindow();
    },
    oncancel() {
      this.clearform();
      this.closewindow();
    },
    closewindow() {
      this.form.dialog = false;
    },
    clearform() {
      this.subpart.name = "";
      this.subpart.count = "0";
      this.subpart.active = "1";
    },
    onDismissed() {
      this.$store.dispatch("ui_a_clear_error");
    },
    cliked() {}
  },
  mounted() {
    this.clearform();
  }
};
</script>