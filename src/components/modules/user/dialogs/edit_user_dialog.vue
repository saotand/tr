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
          <app-tooltip bottom tooltip="Vista previa">
            <v-avatar v-if="userdata.image" size="32" icon>
              <img :src="baseurl+userdata.image" class="img-responsive" />
            </v-avatar>
          </app-tooltip>

          <app-tooltip bottom :tooltip="userdata.image?'Editar Foto':'Añadir Foto'">
            <app-file-upload icon="fa-camera" iconbtn accept="image/*" @base64="get64encode"></app-file-upload>
          </app-tooltip>
          <app-tooltip right tooltip="Cerrar Ventana">
            <v-btn icon @click="oncancel">
              <v-icon>fa-times</v-icon>
            </v-btn>
          </app-tooltip>
        </template>
        <v-container grid-list-md style="padding:5px">
          <form @submit.prevent="onsubmit">
            <v-card-text>
              <v-layout row wrap>
                <v-flex md6>
                  <v-text-field
                    :disabled="userdata.ID == masterID"
                    name="name"
                    label="Nombre"
                    :id="'name'+udata.ID"
                    type="text"
                    v-model="userdata.name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex md6>
                  <v-text-field
                    :disabled="userdata.ID == masterID"
                    name="last"
                    label="Apellido"
                    :id="'last'+udata.ID"
                    type="text"
                    v-model="userdata.last"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex md6>
                  <v-select
                    :disabled="userdata.ID == masterID"
                    item-value="value"
                    v-model="doctype"
                    :items="docs"
                    :rules="[v => !!v || 'Coloca el tipo de documento']"
                    label="Documento"
                    required
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex xs2 md1>
                  <v-select
                    :disabled="userdata.ID == masterID"
                    item-value="value"
                    v-model="userdata.nac"
                    :items="nacs"
                    :rules="[v => !!v || 'Coloca nacionalidad']"
                    label
                    required
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex xs10 md5>
                  <v-text-field
                    :disabled="userdata.ID == masterID"
                    name="cedula"
                    :label="doctypelabel"
                    :id="'cedula'+udata.ID"
                    type="text"
                    v-model="userdata.doc"
                    mask="########"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex md6>
                  <v-text-field
                    name="email"
                    label="Correo electrónico"
                    :id="'email'+udata.ID"
                    type="email"
                    v-model="userdata.email"
                    required
                    :rules="[emailmessage]"
                  ></v-text-field>
                </v-flex>
                <v-flex md6>
                  <v-text-field
                    name="telefono"
                    label="Teléfono"
                    :id="'telefono'+udata.ID"
                    type="text"
                    v-model="userdata.phone"
                    required
                    mask="(####) - ### ####"
                  ></v-text-field>
                </v-flex>
                <v-flex md6>
                  <v-select
                    item-value="value"
                    v-model="userdata.level"
                    :disabled="userdata.ID == masterID"
                    :items="niveles"
                    :rules="[v => !!v || 'Establece el nivel de acceso']"
                    label="Nivel de acceso"
                    required
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex md6>
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        readonly
                        :disabled="userdata.ID == masterID"
                        name="birth"
                        label="Fecha de Nacimiento"
                        :id="'birth'+udata.ID"
                        type="text"
                        v-model="birthdateFormatted"
                        hint
                        persistent-hint
                        prepend-icon="event"
                        required
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale="es-es"
                      :first-day-of-week="0"
                      year-icon="fa-calendar"
                      prev-icon="fa-arrow-circle-left"
                      next-icon="fa-arrow-circle-right"
                      :show-week="true"
                      :show-current="true"
                      :scrollable="true"
                      header-color="primary"
                      color="primary"
                      v-model="birthdate"
                      no-title
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs6 v-if="cpass">
                  <v-text-field
                    required
                    name="password"
                    label="Contraseña"
                    :id="'password'+udata.ID"
                    type="password"
                    v-model="userdata.password"
                    :rules="[minlength]"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6 v-if="cpass">
                  <v-text-field
                    required
                    name="confirmpassword"
                    label="Confirmar la Contraseña"
                    :id="'confirmpassword'+udata.ID"
                    type="password"
                    v-model="userdata.confirmpassword"
                    :rules="[comparePasswords]"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-switch :color="form.switchcolor" v-model="cpass" label="Cambiar Contraseña"></v-switch>
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
        </v-container>
      </app-panel>
    </v-dialog>
  </span>
</template>
<script>
import axios from "axios";
export default {
  props: ["udata"],
  data: vm => ({
    form: {
      action: "Editar",
      title: "Usuario",
      icon: "fa-edit",
      ok: "Guardar",
      cancel: "Cancelar",
      ok_icon: "fa-save",
      cancel_icon: "fa-times",
      persistent: true,
      width: "500",
      switchcolor: "red",
      dialog: false
    },
    menu1: false,
    cpass: false,
    birthdate: new Date().toISOString().substr(0, 10),
    birthdateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dialog: false,
    userdata: {
      ID: "",
      email: "",
      name: "",
      last: "",
      doc: "",
      doctype: "",
      nac: "",
      phone: "",
      level: "0",
      birth: "",
      password: false,
      confirmpassword: false,
      image: ""
    },
    doctype: "",
    doctypelabel: "Documento",
    imagechange: false
  }),
  computed: {
    baseurl() {
      return axios.defaults.baseURL;
    },
    emailformatted() {
      let regexemail = /^[a-zA-Z0-9!#$&*?^{}˜.Çç-]+(\.[a-zA-Z0-9!#$&*?^{}˜.Çç-]+)*@([a-zA-Z0-9]+([a-zA-Z0-9-]*)\.)+[a-zA-Z]+$/;
      let validemail = this.userdata.email.match(regexemail) ? true : false;
      return validemail;
    },
    emailmessage() {
      return this.emailformatted ? false : "Escribe un formato de email válido";
    },
    masterID() {
      return this.$store.getters.admin_g_masterid;
    },
    changed() {
      let u = this.userdata;
      let i = this.udata;
      if (this.cpass) {
        return (
          u.name.length < 1 ||
          u.last.length < 1 ||
          u.email.length < 5 ||
          !this.emailformatted ||
          u.phone.length <= 10 ||
          u.password == "" ||
          u.confirmpassword == "" ||
          u.password.length <= 5 ||
          u.confirmpassword.length <= 5 ||
          u.password != u.confirmpassword
        );
      } else {
        return (
          (u.name == i.name &&
            u.last == i.last &&
            u.email == i.email &&
            u.doctype == i.doctype &&
            u.nac == i.nac &&
            u.doc == i.doc &&
            u.phone == i.phone &&
            u.birth == i.birth &&
            u.level == i.level) ||
          u.name.length < 1 ||
          u.last.length < 1 ||
          u.email.length < 5 ||
          this.emailformatted ||
          u.phone.length <= 10
        );
      }
    },
    niveles() {
      return this.$store.getters.admin_g_levels;
    },
    docs() {
      return this.$store.getters.admin_g_docs;
    },
    nacs() {
      return this.$store.getters.admin_g_nacs;
    },
    darkset() {
      return this.$store.getters.ui_g_dark;
    },
    readyform() {
      return false;
    },
    minlength() {
      return this.userdata.password.length < 6 ? "Minimo 6 caracteres" : false;
    },
    comparePasswords() {
      return this.userdata.password != this.userdata.confirmpassword
        ? "Las contraseñas deben ser iguales"
        : false;
    },
    user() {
      return this.$store.getters.user;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    birthdate() {
      this.birthdateFormatted = this.formatDate(this.birthdate);
      this.userdata.birth = this.birthdate;
    },
    cpass(val) {
      if (!val) {
        this.userdata.password = "";
        this.userdata.confirmpassword = "";
      }
    },
    doctype(value) {
      this.userdata.doctype = value;
      if (value == "C") {
        this.doctypelabel = "Número de Cedula";
      } else if (value == "R") {
        this.doctypelabel = "Número de RIF";
      } else if (value == "P") {
        this.doctypelabel = "Número de Pasaporte";
      } else {
        this.doctypelabel = "Número de Documento";
      }
    },
    "userdata.image"(value) {
      if (value) {
        this.imagechange = true;
      } else {
        this.imagechange = false;
      }
    }
  },
  methods: {
    get64encode(base64) {
      this.userdata.image = base64;
    },
    onsubmit() {
      this.$store.dispatch("admin_a_edit_users", this.userdata);
      this.oncancel();
    },
    oncancel() {
      this.clearform();
      this.form.dialog = false;
    },
    clearform() {
      this.userdata.image = this.udata.image;
      this.userdata.ID = this.udata.ID;
      this.userdata.name = this.udata.name;
      this.userdata.last = this.udata.last;
      this.userdata.doctype = this.udata.doctype;
      this.doctype = this.udata.doctype;
      this.userdata.nac = this.udata.nac;
      this.userdata.doc = this.udata.doc;
      this.userdata.email = this.udata.email;
      this.cpass = false;
      this.userdata.password = "";
      this.userdata.confirmpassword = "";
      this.userdata.phone = this.udata.phone;
      this.userdata.birth = this.udata.birth;
      this.birthdate = this.udata.birth;
      this.userdata.level = this.udata.level;
    },
    onDismissed() {
      this.$store.dispatch("ui_a_clear_error");
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  updated() {
    if (this.userdata.ID != this.udata.ID) this.clearform();
  }
};
</script>
<style>
</style>

