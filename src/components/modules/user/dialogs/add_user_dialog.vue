<template>
  <span>
    <v-dialog v-model="form.dialog" :width="form.width" :persistent="form.persistent">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon class="text-white">{{form.icon}}</v-icon>
        </v-btn>
      </template>
      <app-panel dark noerror noloading>
        <template slot="title">
          <v-icon left>{{form.icon}}</v-icon>
          {{form.action}} {{form.title}}
        </template>
        <template slot="button">
          <v-menu
            v-if="userdata.image"
            v-model="imageprev"
            :close-on-content-click="true"
            width="200"
            :nudge-width="200"
          >
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <app-tooltip bottom tooltip="Vista previa">
                  <v-avatar size="32" icon>
                    <img :src="userdata.image" class="img-responsive" />
                  </v-avatar>
                </app-tooltip>
              </v-btn>
            </template>
            <v-card>
              <v-container>
                <v-layout>
                  <v-flex xs12>
                    <v-responsive :aspect-ratio="2/3" max-height="500" max-width="500">
                      <img :src="userdata.image" class="img-responsive" />
                    </v-responsive>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout>
                  <v-card-actions>
                    <v-flex xs12>
                      <v-btn flat @click="imageprev = false">Cerrar</v-btn>
                    </v-flex>
                  </v-card-actions>
                </v-layout>
              </v-container>
            </v-card>
          </v-menu>

          <app-tooltip bottom tooltip="Añadir Foto">
            <app-file-upload iconbtn icon="fa-camera" accept="image/*" @base64="get64encode"></app-file-upload>
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
                <v-flex sm6>
                  <v-text-field
                    name="name"
                    label="Nombre"
                    id="name"
                    type="text"
                    v-model="userdata.name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    name="last"
                    label="Apellido"
                    id="last"
                    type="text"
                    v-model="userdata.last"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    item-value="value"
                    v-model="userdata.doctype"
                    :items="docs"
                    :rules="[v => !!v || 'Coloca el tipo de documento']"
                    label="Documento"
                    required
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex xs2 sm1>
                  <v-select
                    item-value="value"
                    v-model="userdata.nac"
                    :items="nacs"
                    :rules="[v => !!v || 'Coloca nacionalidad']"
                    label
                    required
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex xs10 sm5>
                  <v-text-field
                    name="cedula"
                    :label="doctypelabel"
                    id="cedula"
                    type="text"
                    v-model="userdata.doc"
                    mask="########"
                    required
                    :rules="[docused]"
                    @blur="onBlurDoc(userdata.doc)"
                  ></v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    name="email"
                    label="Correo electrónico"
                    id="email"
                    type="email"
                    v-model="userdata.email"
                    required
                    :rules="[emailmessage,emailused]"
                    @blur="onBlurEmail(userdata.email)"
                  ></v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    name="telefono"
                    label="Teléfono"
                    id="telefono"
                    type="text"
                    v-model="userdata.phone"
                    required
                    mask="(####) - ### ####"
                  ></v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-select
                    item-value="value"
                    v-model="userdata.level"
                    :items="niveles"
                    :rules="[v => !!v || 'Establece el nivel de acceso']"
                    label="Nivel de acceso"
                    required
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex sm6>
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
                        name="birth"
                        label="Fecha de Nacimiento"
                        id="birth"
                        type="text"
                        v-model="birthdateFormatted"
                        hint
                        persistent-hint
                        prepend-icon="event"
                        required
                        :rules="[userdata.birth.length == 0?'establece tu fcha de nacimiento':false]"
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
                      :show-current="false"
                      :scrollable="true"
                      header-color="primary"
                      color="primary"
                      v-model="birthdate"
                      no-title
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    name="password"
                    label="Contraseña"
                    id="password"
                    type="password"
                    v-model="userdata.password"
                    :rules="[minlength]"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    name="confirmpassword"
                    label="Confirmar la Contraseña"
                    id="confirmpassword"
                    type="password"
                    v-model="userdata.confirmpassword"
                    :rules="[comparePasswords]"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-flex xs6>
                <center>
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
                </center>
              </v-flex>
              <v-flex>
                <center>
                  <v-btn
                    type="submit"
                    color="success"
                    :disabled="loading||changed"
                    :loading="loading"
                  >
                    <v-icon left>{{form.ok_icon}}</v-icon>
                    {{form.ok}}
                  </v-btn>
                </center>
              </v-flex>
            </v-card-actions>
          </form>
        </v-container>
      </app-panel>
    </v-dialog>
    <code>{{emailused}}</code>
  </span>
</template>
<script>
import axios from "axios";

export default {
  data: vm => ({
    form: {
      action: "Añadir",
      title: "Usuario",
      icon: "fa-user-plus",
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
    menu2: false,
    imageprev: false,

    // Fecha de inicio del calendario
    birthdate: new Date("2000-01-01").toISOString().substr(0, 10),
    // Fecha de inicio del formulario
    birthdateFormatted: vm.formatDate(
      new Date("2000-01-01").toISOString().substr(0, 10)
    ),
    dialog: false,
    userdata: {
      image: "",
      name: "",
      last: "",
      doctype: "",
      nac: "",
      doc: "",
      email: "",
      password: "",
      confirmpassword: "",
      phone: "",
      birth: "",
      level: ""
    },
    doctypelabel: "Documento",
    minlenght: 2,
    imageadd: true,
    changed: true,
    docused: false,
    emailused: false
  }),
  computed: {
    emailformatted() {
      let regexemail = /^[a-zA-Z0-9!#$&*?^{}˜.Çç-]+(\.[a-zA-Z0-9!#$&*?^{}˜.Çç-]+)*@([a-zA-Z0-9]+([a-zA-Z0-9-]*)\.)+[a-zA-Z]+$/;
      let validemail = this.userdata.email.match(regexemail) ? true : false;
      return validemail;
    },
    emailmessage() {
      return this.emailformatted ? false : "Escribe un formato de email válido";
    },
    formvalidate() {
      let form = {
        name: this.userdata.name.length <= this.minlenght,
        last: this.userdata.last.length <= this.minlenght,
        doctype: this.userdata.doctype.length == 0,
        nac: this.userdata.nac.length == 0,
        doc: this.userdata.doc.length <= 6,
        docused: this.docused == false,
        email: {
          valid: !this.emailformatted,
          len: this.userdata.email.length < 4,
          used: this.emailused
        },
        level: this.userdata.level.length == 0,
        birth: this.userdata.birth.length == 0,
        pasword: this.userdata.password.length == 0,
        confirmpassword: this.userdata.confirmpassword.length == 0,
        comparePass:
          this.userdata.password != this.userdata.confirmpassword ||
          (this.userdata.password.length == 0 &&
            this.userdata.confirmpassword.length == 0),
        phone: this.userdata.phone.length <= 10
      };
      return form;
    },
    computedDateFormatted() {
      return this.formatDate(this.birhtdate);
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
      return this.$store.getters.user_g_user;
    },
    loading() {
      return this.$store.getters.ui_g_loading;
    }
  },
  watch: {
    formvalidate(item) {
      this.changed =
        item.name ||
        item.last ||
        item.doctype ||
        item.nac ||
        item.doc ||
        item.docused ||
        item.email.valid ||
        item.email.len ||
        item.email.used ||
        item.phone ||
        item.level ||
        item.password ||
        item.confirmpassword ||
        item.comparePass ||
        item.birth;
    },
    birthdate() {
      this.birthdateFormatted = this.formatDate(this.birthdate);
      this.userdata.birth = this.birthdate;
    },
    "userdata.doctype"(value) {
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
    "userdata.image"(val) {
      if (val) {
        this.imageadd = false;
      } else {
        this.imageadd = true;
      }
    }
  },
  methods: {
    get64encode(base64) {
      this.userdata.image = base64;
    },
    onsubmit() {
      this.$store.dispatch("admin_a_add_users", this.userdata);
      this.oncancel();
    },
    clearform() {
      this.userdata.image = "";
      this.userdata.name = "";
      this.userdata.last = "";
      this.userdata.doctype = "";
      this.doctype = "";
      this.docused = false;
      this.userdata.nac = "";
      this.userdata.doc = "";
      this.userdata.email = "";
      this.userdata.password = "";
      this.userdata.confirmpassword = "";
      this.userdata.phone = "";
      this.userdata.birth = "";
      this.userdata.level = "";
    },
    oncancel() {
      this.form.dialog = false;
      this.clearform();
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
    },
    onBlurDoc(cData) {
      let data = { doc: cData };
      let url = "user/check";
      axios
        .post(url, data)
        .then(response => {
          let exists = response.data.data;
          if (exists) {
            this.docused = "Ya Existe";
          } else {
            this.docused = null;
          }
        })
        .catch(error => {
          let message = "";
          if (error.response != undefined) {
            message = error.response.data.error.message;

            this.$store.dispatch("ui_a_error", message);
          } else {
            message = error;
            //commit("ui_m_warning", message);
          }
        })
        .then();
    },
    onBlurEmail(cData) {
      let data = { email: cData };
      let url = "user/check";
      if (this.emailformatted) {
        axios
          .post(url, data)
          .then(response => {
            let exists = response.data.data;
            if (exists) {
              this.emailused = "Ya Existe";
            } else {
              this.emailused = null;
            }
          })
          .catch(error => {
            let message = "";
            if (error.response != undefined) {
              message = error.response.data.error.message;
              this.$store.dispatch("ui_a_error", message);
            } else {
              message = error;
              //commit("ui_m_warning", message);
            }
          })
          .then();
      }
    }
  }
};
</script>

<style>
</style>

