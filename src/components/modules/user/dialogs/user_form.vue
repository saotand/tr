<template>
  <span class="dialog-btn">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <span v-on="on">
          <v-btn
            :disabled="action=='del'&& item.ID == master"
            icon
            @click="openDialog"
            style="display:inline-block"
          >
            <v-icon>{{icon}}</v-icon>
          </v-btn>
        </span>
      </template>
      <span>{{title}}</span>
    </v-tooltip>

    <v-dialog
      v-model="form.dialog"
      :width="form.width"
      :persistent="form.persistent"
    >
      <app-panel
        dark
        noerror
        noloading
      >
        <template slot="title">
          <v-icon left>{{icon}}</v-icon>
          {{title}} {{form.title}}
        </template>
        <template slot="button">
          <template v-show="action!='del'">
            <v-menu
              v-if="userdata.image"
              v-model="imageprev"
              :close-on-content-click="true"
              width="200"
              :nudge-width="200"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  v-on="on"
                >
                  <app-tooltip
                    bottom
                    tooltip="Vista previa"
                  >
                    <v-avatar
                      size="32"
                      icon
                    >
                      <img
                        :src="tempimage"
                        class="img-responsive"
                      />
                    </v-avatar>
                  </app-tooltip>
                </v-btn>
              </template>
              <v-card>
                <v-container>
                  <v-layout>
                    <v-flex xs12>
                      <v-responsive
                        :aspect-ratio="2/3"
                        max-height="500"
                        max-width="500"
                      >
                        <img
                          :src="tempimage"
                          class="img-responsive"
                        />
                      </v-responsive>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout>
                    <v-card-actions>
                      <v-flex xs12>
                        <v-btn
                          flat
                          @click="imageprev = false"
                        >Cerrar</v-btn>
                      </v-flex>
                    </v-card-actions>
                  </v-layout>
                </v-container>
              </v-card>
            </v-menu>
            <app-tooltip
              bottom
              tooltip="Añadir Foto"
            >
              <app-file-upload
                iconbtn
                icon="fa-camera"
                accept="image/*"
                @base64="get64encode"
              ></app-file-upload>
            </app-tooltip>
          </template>
          <app-tooltip
            right
            tooltip="Cerrar Ventana"
          >
            <v-btn
              icon
              @click="onCancel"
            >
              <v-icon>fa-times</v-icon>
            </v-btn>
          </app-tooltip>
        </template>
        <v-container
          grid-list-md
          style="padding:5px"
        >
          <form @submit.prevent="onsubmit">
            <template v-if="action!='del'">
              <v-card-text>
                <v-layout
                  row
                  wrap
                >
                  <v-flex sm6>
                    <v-text-field
                      :name="'name'+item.ID"
                      label="Nombre"
                      type="text"
                      v-model="userdata.name"
                      :rules="[v => !!v || 'Coloca tu nombre']"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex sm6>
                    <v-text-field
                      :name="'last'+item.ID"
                      label="Apellido"
                      type="text"
                      v-model="userdata.last"
                      :rules="[v => !!v || 'Coloca tu apellido']"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex
                    xs12
                    sm6
                  >
                    <v-select
                      :name="'doctype'+item.ID"
                      item-value="value"
                      v-model="userdata.doctype"
                      :disabled="item.ID == master"
                      :items="docs"
                      :rules="[v => !!v || 'Coloca el tipo de documento']"
                      label="Documento"
                      required
                      persistent-hint
                    ></v-select>
                  </v-flex>
                  <v-flex
                    xs2
                    sm1
                  >
                    <v-select
                      :name="'nac'+item.ID"
                      item-value="value"
                      v-model="userdata.nac"
                      :disabled="item.ID == master"
                      :items="nacs"
                      :rules="[v => !!v || 'Coloca nacionalidad']"
                      label
                      required
                      persistent-hint
                    ></v-select>
                  </v-flex>
                  <v-flex
                    xs10
                    sm5
                  >
                    <v-text-field
                      :name="'cedula'+item.ID"
                      :label="doctypelabel"
                      :disabled="item.ID == master"
                      type="text"
                      v-model="userdata.doc"
                      mask="########"
                      required
                      :rules="[v => !!v || 'Coloca tu ' + doctypelabel ,docused]"
                      @blur="onBlurDoc(userdata.doc)"
                    ></v-text-field>
                  </v-flex>
                  <v-flex sm6>
                    <v-text-field
                      :name="'email'+item.ID"
                      label="Correo electrónico"
                      type="email"
                      v-model="userdata.email"
                      required
                      :rules="[emailmessage,emailused]"
                      @blur="onBlurEmail(userdata.email)"
                    ></v-text-field>
                  </v-flex>
                  <v-flex sm6>
                    <v-text-field
                      :name="'telefono'+item.ID"
                      label="Teléfono"
                      type="text"
                      v-model="userdata.phone"
                      required
                      mask="(####) - ### ####"
                    ></v-text-field>
                  </v-flex>
                  <v-flex sm6>
                    <v-select
                      :name="'level'+item.ID"
                      item-value="value"
                      v-model="userdata.level"
                      :disabled="item.ID == master"
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
                          :name="'birth'+item.ID"
                          :disabled="item.ID == master"
                          readonly
                          label="Fecha de Nacimiento"
                          type="text"
                          v-model="birthdateFormatted"
                          hint
                          persistent-hint
                          prepend-icon="event"
                          required
                          :rules="[v => !!v || 'Establece el fecha de nacimiento']"
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
                  <v-flex
                    sm6
                    v-if="cpass || action == 'new'"
                  >
                    <v-text-field
                      :name="'password'+item.ID"
                      @click="userdata.confirmpassword=''"
                      label="Contraseña"
                      type="password"
                      v-model="userdata.password"
                      :rules="[minlength]"
                      required
                      autocomplete
                    ></v-text-field>
                  </v-flex>
                  <v-flex
                    sm6
                    v-if="cpass || action == 'new'"
                  >
                    <v-text-field
                      :name="'confirmpassword'+item.ID"
                      label="Confirmar la Contraseña"
                      type="password"
                      v-model="userdata.confirmpassword"
                      :rules="[comparePasswords]"
                      required
                      autocomplete
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </template>
            <template v-else>
              <v-layout row>
                <v-flex xs12>
                  <center>
                    <h3>Esta seguro de eliminar el siguiente Usuario?</h3>
                    <br />
                    <h2>
                      {{userdata.name+' '+ userdata.last}}
                      <br />
                      <app-tooltip
                        bottom
                        tooltip="Al hacer click puedes enviarle un mensaje a este dirección de correo"
                      >
                        <a :href="'mailto:'+userdata.email">{{userdata.email}}</a>
                      </app-tooltip>
                    </h2>
                    <br />
                    <br />
                    <code>{{form.ref}}</code>
                  </center>
                </v-flex>
              </v-layout>
            </template>
            <v-divider></v-divider>
            <v-card-actions>
              <v-flex
                v-if="action=='edit'"
                :xs4="action=='edit'"
              >
                <v-switch
                  :color="form.switchcolor"
                  v-model="cpass"
                  label="Cambiar Contraseña"
                ></v-switch>
              </v-flex>
              <v-flex>
                <center>
                  <v-btn
                    :outline="!darkset"
                    :color="!darkset?'primary':''"
                    @click="onCancel"
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
                    {{ok_btn}}
                  </v-btn>
                </center>
              </v-flex>
            </v-card-actions>
          </form>
        </v-container>
      </app-panel>
    </v-dialog>
  </span>
</template>
<script>
import axios from 'axios';

export default {
    props: {
        action: {
            type: String,
            required: false,
            default: 'new'
        },
        item: {
            type: Object,
            required: false,
            default: () => {
                return {
                    ID: '',
                    image: '',
                    name: '',
                    last: '',
                    doctype: '',
                    nac: '',
                    doc: '',
                    email: '',
                    password: '',
                    confirmpassword: '',
                    phone: '',
                    birth: '',
                    level: ''
                };
            }
        }
    },
    data: () => ({
        master: '100000000000000000000000000001',
        form: {
            title: 'Usuario',
            ok: 'Guardar',
            cancel: 'Cancelar',
            ok_icon: 'fa-save',
            cancel_icon: 'fa-times',
            persistent: true,
            width: '500',
            switchcolor: 'red',
            dialog: false,
            ref:
        'Referencias y acciones de este usuario aun podran ser accedidas desde los reportes'
        },
        menu1: false,
        menu2: false,
        imageprev: false,
        cpass: false,
        birthdate: new Date('2000-01-01').toISOString().substr(0, 10),
        birthdateFormatted: '',
        dialog: false,
        userdata: {
            ID: '',
            image: '',
            name: '',
            last: '',
            doctype: '',
            nac: '',
            doc: '',
            email: '',
            password: '',
            confirmpassword: '',
            phone: '',
            birth: '',
            level: ''
        },
        doctypelabel: 'Documento',
        minlenght: 2,
        imageadd: true,
        changed: true,
        docused: false,
        emailused: false,
        editimg: false
    }),
    computed: {
        ok_btn () {
            return 'Aceptar';
        },
        cancel_btn () {
            return 'Cancelar';
        },
        samedata () {
            let pass = this.userdata.password == '12345678';
            if (!this.cpass) {
                return false;
            } else {
                return pass;
            }
        },
        icon () {
            let icon = '';
            if (this.action == 'edit') {
                icon = 'fa-edit';
            } else if (this.action == 'del') {
                icon = 'fa-trash';
            } else {
                icon = 'fa-user-plus';
            }
            return icon;
        },
        title () {
            let action = 'Nuevo';
            if (this.action == 'edit') {
                action = 'Editar';
            } else if (this.action == 'del') {
                action = 'Eliminar';
            }
            return action;
        },
        emailformatted () {
            let regexemail = /^[a-zA-Z0-9!#$&*?^{}˜.Çç-]+(\.[a-zA-Z0-9!#$&*?^{}˜.Çç-]+)*@([a-zA-Z0-9]+([a-zA-Z0-9-]*)\.)+[a-zA-Z]+$/;
            let validemail = this.userdata.email.match(regexemail) ? true : false;
            return validemail;
        },
        emailmessage () {
            return this.emailformatted ? false : 'Escribe un formato de email válido';
        },
        formvalidate () {
            let form = {
                name: this.userdata.name.length <= this.minlenght,
                last: this.userdata.last.length <= this.minlenght,
                doctype: this.userdata.doctype.length == 0,
                nac: this.userdata.nac.length == 0,
                doc: this.userdata.doc.length <= 6,
                docused: this.docused,
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
                phone: this.userdata.phone.length <= 10,
                samedata: this.samedata,
                edited: this.edited
            };
            return form;
        },
        edited () {
            let origen = this.item;
            let destino = this.userdata;
            let compdata = false;

            compdata =
        origen.name == destino.name &&
        origen.last == destino.last &&
        origen.doc == destino.doc &&
        origen.doctype == destino.doctype &&
        origen.nac == destino.nac &&
        origen.email == destino.email &&
        origen.phone == destino.phone &&
        origen.level == destino.level &&
        origen.birth == destino.birth &&
        origen.image == destino.image &&
        destino.password == '12345678';

            return compdata;
        },
        computedDateFormatted () {
            return this.formatDate(this.birthdate);
        },
        niveles () {
            return this.$store.getters.admin_g_levels;
        },
        docs () {
            return this.$store.getters.admin_g_docs;
        },
        nacs () {
            return this.$store.getters.admin_g_nacs;
        },
        darkset () {
            return this.$store.getters.ui_g_dark;
        },
        minlength () {
            return this.userdata.password.length < 6 ? 'Minimo 6 caracteres' : false;
        },
        comparePasswords () {
            return this.userdata.password != this.userdata.confirmpassword
                ? 'Las contraseñas deben ser iguales'
                : false;
        },
        user () {
            return this.$store.getters.user_g_user;
        },
        loading () {
            return this.$store.getters.ui_g_loading;
        },
        baseurl () {
            return axios.defaults.baseURL;
        },
        tempimage () {
            let imagen = '';
            if (!this.editimg) {
                imagen = this.baseurl + this.userdata.image;
            } else {
                imagen = this.userdata.image;
            }
            return imagen;
        }
    },
    watch: {
        formvalidate (item) {
            if (this.action == 'del') {
                this.changed = false;
            } else {
                if (this.action == 'edit') {
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
            item.birth ||
            item.samedata ||
            item.edited;
                } else {
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
            item.birth ||
            item.samedata;
                }
            }
        },
        birthdate () {
            this.birthdateFormatted = this.formatDate(this.birthdate);
            this.userdata.birth = this.birthdate;
        },
        'userdata.doctype' (value) {
            this.userdata.doctype = value;
            if (value == 'C') {
                this.doctypelabel = 'Número de Cedula';
            } else if (value == 'R') {
                this.doctypelabel = 'Número de RIF';
            } else if (value == 'P') {
                this.doctypelabel = 'Número de Pasaporte';
            } else {
                this.doctypelabel = 'Número de Documento';
            }
        },
        'userdata.image' (val) {
            if (val) {
                this.imageadd = false;
            } else {
                this.imageadd = true;
            }
        }
    },
    methods: {
        onsubmit () {
            if (this.action == 'edit') {
                let editdata = {
                    ID: this.userdata.ID,
                    image: this.userdata.image,
                    name: this.userdata.name,
                    last: this.userdata.last,
                    doctype: this.userdata.doctype,
                    nac: this.userdata.nac,
                    doc: this.userdata.doc,
                    email: this.userdata.email,
                    password: this.userdata.password,
                    phone: this.userdata.phone,
                    birth: this.userdata.birth,
                    level: this.userdata.level
                };
                if (!this.cpass) delete editdata.password;
                this.$store.dispatch('admin_a_edit_users', editdata);
            } else if (this.action == 'del') {
                let deldata = this.userdata.ID;
                this.$store.dispatch('admin_a_del_users', deldata);
            } else {
                let newdata = {
                    image: this.userdata.image,
                    name: this.userdata.name,
                    last: this.userdata.last,
                    doctype: this.userdata.doctype,
                    nac: this.userdata.nac,
                    doc: this.userdata.doc,
                    email: this.userdata.email,
                    password: this.userdata.password,
                    phone: this.userdata.phone,
                    birth: this.userdata.birth,
                    level: this.userdata.level
                };

                this.$store.dispatch('admin_a_add_users', newdata);
            }
            this.onCancel();
        },
        get64encode (base64) {
            this.editimg = true;
            this.userdata.image = base64;
        },
        clearForm () {
            this.userdata.image = '';
            this.userdata.name = '';
            this.userdata.last = '';
            this.userdata.doctype = '';
            this.doctype = '';
            this.docused = false;
            this.userdata.nac = '';
            this.userdata.doc = '';
            this.userdata.email = '';
            this.userdata.password = '';
            this.userdata.confirmpassword = '';
            this.userdata.phone = '';
            this.userdata.birth = '';
            this.userdata.level = '';
            this.editimg = false;
        },
        clearfromeditForm () {
            this.userdata.ID = this.item.ID;
            this.userdata.image = this.item.image;
            this.userdata.name = this.item.name;
            this.userdata.last = this.item.last;
            this.userdata.doctype = this.item.doctype;
            this.doctype = this.item.doctype;
            this.docused = false;
            this.userdata.nac = this.item.nac;
            this.userdata.doc = this.item.doc;
            this.userdata.email = this.item.email;
            this.userdata.phone = this.item.phone;
            this.userdata.level = this.item.level;
            this.userdata.birth = this.item.birth;
            this.birth = this.formatDate(this.item.birth);
            this.birthdateFormatted = this.formatDate(this.item.birth);
            this.userdata.password = '12345678';
            this.userdata.confirmpassword = '12345678';
            this.editimg = false;
        },
        openDialog () {
            this.showWindow();
        },
        onCancel () {
            if (this.action == 'edit') {
                this.clearfromeditForm();
            } else if (this.action == 'del') {
                this.clearfromeditForm();
            } else {
                this.clearForm();
            }
            this.hideWindow();
        },
        showWindow () {
            this.form.dialog = true;
        },
        hideWindow () {
            this.form.dialog = false;
        },
        onDismissed () {
            this.$store.dispatch('ui_a_clear_error');
        },
        formatDate (date) {
            if (!date) return null;
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        },
        parseDate (date) {
            if (!date) return null;
            const [month, day, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },
        onBlurDoc (cData) {
            let data = { doc: cData };
            let url = 'user/check';
            let check = false;

            if (cData != '') {
                if (this.action == 'new') {
                    check = true;
                } else if (this.action == 'edit') {
                    if (this.item.doc == this.userdata.doc) {
                        this.docused = false;
                    } else {
                        check = true;
                    }
                }
            }

            if (check) {
                axios
                    .post(url, data)
                    .then(response => {
                        let exists = response.data.data;
                        if (exists) {
                            this.docused = 'Ya Existe';
                        } else {
                            this.docused = false;
                        }
                    })
                    .catch(error => {
                        let message = '';
                        if (error.response != undefined) {
                            message = error.response.data.error.message;

                            this.$store.dispatch('ui_a_error', message);
                        } else {
                            message = error;
                            //commit("ui_m_warning", message);
                        }
                    })
                    .then();
            }
        },
        onBlurEmail (cData) {
            let data = { email: cData };
            let url = 'user/check';
            let check = false;

            if (this.emailformatted) {
                if (this.action == 'new') {
                    check = true;
                } else if (this.action == 'edit') {
                    if (this.item.email == this.userdata.email) {
                        this.emailused = false;
                    } else {
                        check = true;
                    }
                }
            }

            if (check) {
                axios
                    .post(url, data)
                    .then(response => {
                        let exists = response.data.data;
                        if (exists) {
                            this.emailused = 'Ya Existe';
                        } else {
                            this.emailused = false;
                        }
                    })
                    .catch(error => {
                        let message = '';
                        if (error.response != undefined) {
                            message = error.response.data.error.message;
                            this.$store.dispatch('ui_a_error', message);
                        } else {
                            message = error;
                        }
                    })
                    .then();
            }
        }
    },
    updated () {
    // eslint-disable-next-line
    console.log(this.userdata.ID);
        if (this.action == 'edit') {
            if (this.userdata.ID != this.item.ID) this.clearfromeditForm();
        } else if (this.action == 'del') {
            if (this.userdata.ID != this.item.ID) this.clearfromeditForm();
        } else {
            this.userdata.ID == '';
            if (
                this.userdata.ID != '' ||
        this.userdata.ID == undefined ||
        this.userdata.ID == null
            ) {
                this.clearForm();
            }
        }
    }
};
</script>

<style>
</style>

