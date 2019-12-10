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
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  name="name"
                  label="Nombre"
                  id="name"
                  type="text"
                  v-model="brand.name"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout v-if="false">
              <v-flex xs12>
                <center>
                  <v-avatar size="80">
                    <img :src="brand.image" class="img-responsive" />
                  </v-avatar>
                </center>
                <app-file-upload
                  size="100"
                  color="primary"
                  accept="image/*"
                  @base64="get64encode"
                  block
                ></app-file-upload>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-switch
                    :color="form.switchcolor"
                    v-model="active"
                    :label="active?'Activa':'Inactiva'"
                  ></v-switch>
                </span>
              </template>
              <span>{{form.activetooltip}}</span>
            </v-tooltip>
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
/* eslint-disable */
export default {
  props: ["item"],
  data: () => ({
    form: {
      action: "Editar",
      title: "Marca",
      icon: "fa-edit",
      ok: "Guardar",
      cancel: "Cancelar",
      ok_icon: "fa-save",
      cancel_icon: "fa-times",
      persistent: true,
      activetooltip:
        "Al desactivar, esta marca y todas sus referencias no serán visibles en los formularios de consultas (inicio)",
      width: "500",
      switchcolor: "red",
      dialog: false
    },
    brand: {
      ID: "",
      name: "",
      image: "",
      count: "",
      active: ""
    },
    active: true
  }),
  watch: {
    active(value) {
      this.brand.active = value ? "1" : "0";
    }
  },
  computed: {
    darkset() {
      return this.$store.getters.ui_g_dark;
    },
    user() {
      return this.$store.getters.user_g_user;
    },
    loading() {
      return this.$store.getters.ui_g_loading;
    },
    changed() {
      return (
        (this.brand.name == this.item.name &&
          this.brand.active == this.item.active &&
          this.brand.image == this.item.image) ||
        this.brand.name.length < 1
      );
    }
  },

  methods: {
    onsubmit() {
      this.$store.dispatch("admin_a_edit_brands", this.brand);
      this.closewindow();
    },
    oncancel() {
      this.closewindow();
      this.clearform();
    },
    closewindow() {
      this.form.dialog = false;
    },
    onDismissed() {
      this.$store.dispatch("ui_a_clear_error");
    },
    clearform() {
      this.brand.ID = this.item.ID;
      this.brand.name = this.item.name;
      this.brand.image = this.item.image;
      this.brand.count = this.item.count;
      this.brand.active = this.item.active;
      this.active = this.item.active == "1" ? true : false;
    },
    get64encode(base64) {
      this.brand.image = base64;
    }
  },
  updated() {
    if (this.brand.ID != this.item.ID) this.clearform();
  }
};
</script>


