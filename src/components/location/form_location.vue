<template>
  <span class="dialog-btn">
    <v-btn icon @click="openWindow">
      <v-icon>{{icon}}</v-icon>
    </v-btn>
    <v-dialog v-model="form.dialog" :width="form.width" :persistent="form.persistent">
      <app-panel noloading noerror>
        <template slot="title">
          <v-icon left>{{icon}}</v-icon>
          {{actiontext}} {{form.title}}
        </template>
        <template slot="button">
          <v-btn icon @click="closeWindow">
            <v-icon>fa-times</v-icon>
          </v-btn>
        </template>
        <v-card-text>
          <v-container style="margin:0; padding:0">
            <v-layout v-if="action=='edit'">
              <v-flex>
                <v-text-field label="Nombre" v-model="element.text"></v-text-field>
                <v-switch v-model="element.active" label="Mostar esta Localizacion en el sitio"></v-switch>
              </v-flex>
            </v-layout>
            <v-layout v-else-if="action=='del'">
              <v-flex>Eliminar Form Contenido</v-flex>
            </v-layout>
            <v-layout v-else>
              <v-flex>
                <v-text-field label="Nombre" v-model="element.text"></v-text-field>
                <v-switch v-model="element.active" label="Mostar esta Localizacion en el sitio"></v-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-container style="margin:0;padding:0;">
            <v-layout>
              <v-flex xs6>
                <center>
                  <v-btn @click="closeWindow">
                    <v-icon left>fa-times</v-icon>Cancelar
                  </v-btn>
                </center>
              </v-flex>
              <v-flex xs6>
                <center>
                  <v-btn @click="onSubmit" color="success">
                    <v-icon left>fa-check</v-icon>Aceptar
                  </v-btn>
                </center>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
      </app-panel>
      <code>{{element}}</code>
      <code>{{item}}</code>
    </v-dialog>
  </span>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      default: "add",
      required: false
    },
    item: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    element: {
      text: "",
      value: "",
      active: true
    },
    form: {
      title: "Localizacion",
      persistent: true,
      dialog: false,
      width: 500
    }
  }),
  computed: {
    icon() {
      let icon = "";
      if (this.action == "edit") {
        icon = "fa-edit";
      } else if (this.action == "del") {
        icon = "fa-trash";
      } else {
        icon = "fa-plus";
      }
      return icon;
    },
    actiontext() {
      let a = "Nuevo";
      if (this.action == "edit") {
        a = "Editar";
      } else if (this.action == "del") {
        a = "Eliminar";
      } else {
        a = "Nuevo";
      }
      return a;
    },
    error() {
      return this.$store.getters.ui_g_error;
    },
    ecolor() {
      return this.$store.getters.ui_g_ecolor;
    }
  },
  watch: {
    item(val) {
      // eslint-disable-next-line
      console.log(val);
      //alert(val);
    }
  },
  methods: {
    onSubmit() {
      if (this.action == "edit") {
        this.Edit();
      } else if (this.action == "del") {
        this.Del();
      } else {
        this.Add();
      }
      if (!this.error || this.ecolor != "error") {
        this.closeWindow();
      }
    },
    Add() {
      alert("Add");
    },
    Edit() {
      alert("Edit " + this.element.value);
    },
    Del() {
      alert("Del " + this.element.value);
    },
    openWindow() {
      this.form.dialog = true;
    },
    closeWindow() {
      this.form.dialog = false;
      this.prepare();
    },
    setFromItem() {
      this.element.text = this.item.text;
      this.element.value = this.item.value;
      this.element.active = this.item.active;
    },
    cleanElement() {
      this.element.text = "";
      this.element.value = "";
      this.element.active = true;
    },
    prepare() {
      if (this.action == "edit") {
        this.setFromItem();
      } else if (this.action == "del") {
        this.setFromItem();
      } else {
        this.cleanElement();
      }
    }
  },
  update() {
    this.prepare();
  },
  activated() {
    alert("activated");
  },
  created() {
    this.prepare();
  }
};
</script>