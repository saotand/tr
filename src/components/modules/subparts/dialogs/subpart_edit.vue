<template>
  <span>
    <v-dialog
      v-model="form.dialog"
      :width="form.width"
      :persistent="form.persistent"
      @keyup.escape.stop="oncancel"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon :class="!black?'text-white':''">{{form.icon}}</v-icon>
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
                v-model="active"
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
  props: ["item", "brands", "black"],
  data: () => ({
    form: {
      action: "Editar",
      title: "Sub Parte",
      icon: "fa-edit",
      ok: "Guardar",
      cancel: "Cancelar",
      ok_icon: "fa-save",
      cancel_icon: "fa-times",
      activetooltip:
        "Al desactivar no se mostraran en el listado de partes (incio)",
      persistent: true,
      width: "500",
      switchcolor: "red",
      dialog: false
    },
    subpart: {
      ID: "",
      name: "",
      count: "0",
      active: ""
    },
    active: true
  }),
  computed: {
    changed() {
      let s = this.subpart,
        i = this.item;
      return s.name == i.name && s.active == i.active;
    },
    darkset() {
      return this.$store.getters.ui_g_dark;
    },
    error() {
      return this.$store.getters.ui_g_error;
    },
    loading() {
      return this.$store.getters.ui_g_loading;
    }
  },
  watch: {
    active(value) {
      this.subpart.active = value ? "1" : "0";
    }
  },
  methods: {
    onsubmit() {
      let addsubpart = {
        ID: this.subpart.ID,
        name: this.subpart.name,
        count: this.subpart.count,
        active: this.subpart.active
      };
      this.$store.dispatch("admin_a_edit_subparts", addsubpart);
      this.closewindow();
    },
    oncancel() {
      this.closewindow();
      this.clearform();
    },
    closewindow() {
      this.form.dialog = false;
    },
    clearform() {
      this.subpart.ID = this.item.ID;
      this.subpart.name = this.item.name;
      this.subpart.count = this.item.count;
      this.subpart.active = this.item.active;
      this.active = this.item.active == "1" ? true : false;
    },
    onDismissed() {
      this.$store.dispatch("ui_a_clear_error");
    }
  },
  updated() {
    if (this.item.ID != this.subpart.ID) {
      this.clearform();
    }
  }
};
</script>