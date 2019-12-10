<template>
  <span>
    <v-dialog v-model="form.dialog" :width="form.width" :persistent="form.persistent">
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
            <v-layout >
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
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-tooltip bottom :tooltip="form.activetooltip">
              <v-switch
                :color="form.switchcolor"
                v-model="brand.active"
                :label="brand.active?'Activa':'Inactiva'"
              ></v-switch>
            </app-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on"></span>
              </template>
              <span>{{}}</span>
            </v-tooltip>

            <v-spacer></v-spacer>
            <v-btn
              :outline="!darkset"
              :color="!darkset?'primary':''"
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
  props: ["black"],
  data: () => ({
    form: {
      action: "Añadir",
      title: "Marca",
      icon: "fa-plus",
      ok: "Guardar",
      cancel: "Cancelar",
      ok_icon: "fa-save",
      cancel_icon: "fa-times",
      persistent: true,
      activetooltip:
        "Al desactivar no se mostraran los Modelos de esta marca en el formulario de consultas de partes (incio)",
      width: "500",
      switchcolor: "red",
      dialog: false
    },
    brand: {
      name: "",
      image: "",
      count: "0",
      active: "1"
    }
  }),
  computed: {
    darkset() {
      return this.$store.getters.ui_g_dark;
    },
    user() {
      return this.$store.getters.user_g_user;
    },
    changed() {
      return this.brand.name == "";
    },
    loading() {
      return this.$store.getters.ui_g_loading;
    }
  },
  methods: {
    onsubmit() {
      const newBrand = {
        name: this.brand.name,
        image: this.brand.image,
        count: this.brand.count,
        active: this.brand.active
      };
      this.$store.dispatch("admin_a_add_brands", newBrand);
      this.closewindow();
      this.clearform();
    },
    oncancel() {
      this.closewindow();
      this.clearform();
    },
    closewindow() {
      this.form.dialog = false;
    },
    clearform() {
      this.brand.name = "";
      this.brand.image = "";
      this.brand.count = "0";
      this.brand.active = true;
    },
    onDismissed() {
      this.$store.dispatch("ui_a_clear_error");
    },
    get64encode(base64) {
      this.brand.image = base64;
    }
  },
  mounted() {
    this.clearform();
  }
};
</script>

