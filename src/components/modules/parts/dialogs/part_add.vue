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
          <v-icon class="text-white">{{form.action}} {{form.icon}}</v-icon>
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
                  v-model="part.name"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs11>
                <v-autocomplete
                  item-value="value"
                  item-text="text"
                  v-model="part.classID"
                  :items="subpartslist"
                  :rules="[v => !!v || 'Establece la Sub Parte']"
                  label="Sub Parte"
                  required
                ></v-autocomplete>
              </v-flex>
              <v-flex xs1>
                <app-subparts-dialog-add :black="true"></app-subparts-dialog-add>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-tooltip bottom :tooltip="form.activetooltip">
              <v-switch
                :color="form.switchcolor"
                v-model="part.active"
                :label="part.active?'Activa':'Inactiva'"
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
  /* eslint-disable */
  props: ["subparts", "tpart", "list", "black"],
  data: () => ({
    form: {
      action: "Añadir",
      title: "Parte",
      icon: "fa-plus",
      ok: "Guardar",
      cancel: "Cancelar",
      ok_icon: "fa-save",
      cancel_icon: "fa-times",
      persistent: true,
      activetooltip:
        "Al desactivar no se mostraran en el listado de Partes (incio)",
      width: "500",
      switchcolor: "primary",
      dialog: false
    },
    dialog: false,
    part: {
      //ID:"",
      name: "",
      image: "",
      classID: "",
      count: "0",
      active: true
    }
  }),
  computed: {
    changed() {
      let p = this.part;
      return p.name == "" || p.classID == "" || p.name.length < 3;
    },
    darkset() {
      return this.$store.getters.ui_g_dark;
    },
    loading() {
      return this.$store.getters.ui_g_loading;
    },
    subpartslist() {
      let mysubparts = [];
      this.subparts.forEach(function(x) {
        let curobj = { text: x.name, value: x.ID };
        mysubparts.push(curobj);
      });
      return mysubparts;
    }
  },
  watch: {},
  methods: {
    onsubmit() {
      let addpart = {
        name: this.part.name,
        image: this.part.image,
        classID: this.part.classID,
        count: this.part.count,
        active: this.part.active ? "1" : "0"
      };
      this.$store.dispatch("admin_a_add_parts", addpart);
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
      this.part.name = "";
      this.part.image = "";
      this.part.classID = "";
      this.part.count = "";
      this.part.active = true;
    },
    onDismissed() {
      this.$store.dispatch("ui_a_clear_error");
    },
    cliked() {
      alert("que");
    }
  },
  mounted() {
    this.clearform();
  }
};
</script>