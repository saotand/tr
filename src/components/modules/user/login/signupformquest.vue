<template>
  <span>
    <v-stepper v-model="pasos" alt-labels style="margin:0px;padding:0px">
      <v-stepper-header v-if="!userdata.level">
        <v-stepper-step :complete="pasos > 1" step="1" :color="(pasos > 1)?'success':'primary'">
          Compras o Vendes?
          <small v-if="pasos > 1">({{userdata.level?'Vender':'Comprar'}})</small>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="pasos > 2" step="2" :color="(pasos > 2)?'success':'primary'">
          Registro
          <small v-if="pasos > 2">(Completo)</small>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="pasos > 3" step="3" :color="(pasos > 3)?'success':'primary'">
          Condiciones
          <small v-if="pasos > 3">(Completo)</small>
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-header v-else>
        <v-stepper-step :complete="pasos > 0" step="1" :color="(pasos > 1)?'success':'primary'">
          Compras o Vendes?
          <small v-if="pasos > 0">({{userdata.level?'Vender':'Comprar'}})</small>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="pasos > 2" step="2" :color="(pasos > 2)?'success':'primary'">
          Registro
          <small v-if="pasos > 2">(Completo)</small>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="pasos > 3" step="3" :color="(pasos > 3)?'success':'primary'">
          Empresa
          <small v-if="pasos > 3">(Completo)</small>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="pasos > 4" step="4" :color="(pasos > 4)?'success':'primary'">
          Perfil
          <small v-if="pasos > 4">(Completo)</small>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          :complete="pasos > 5"
          step="5"
          :color="(pasos > 5)?'success':'primary'"
        >Condiciones</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items v-if="!userdata.level">
        <v-stepper-content step="1">
          <v-container grid-list-lg text-xs-center align-content-center>
            <v-layout row wrap>
              <v-flex xs12>
                <h1>¿Que deseas hacer?</h1>
              </v-flex>
              <v-flex xs12 sm6>
                <v-btn
                  @click="do_action(0)"
                  dark
                  round
                  class="buy_gradient"
                  style="height:200px;width:200px"
                >
                  <v-container>
                    <v-layout column>
                      <v-flex xs12>
                        <v-icon size="110">fa-hand-pointer-o</v-icon>
                      </v-flex>
                      <v-flex xs12>
                        <h1>Comprar</h1>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-btn>
              </v-flex>
              <v-flex xs12 sm6>
                <v-btn
                  @click="do_action(1)"
                  dark
                  round
                  class="sell_gradient"
                  style="height:200px;width:200px"
                >
                  <v-container>
                    <v-layout column>
                      <v-flex xs12>
                        <v-icon size="110">fa-dollar</v-icon>
                      </v-flex>
                      <v-flex xs12>
                        <h1>Vender</h1>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-btn>
              </v-flex>
              <div style="height:70px">&nbsp;</div>
            </v-layout>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="2">
          <form>
            <v-container grid-list-lg align-content-center text-xs-center>
              <v-layout row wrap align-center align-content-center>
                <v-flex xs12 md3>
                  <v-text-field
                    name="email"
                    label="Correo electrónico"
                    id="email"
                    type="email"
                    v-model="userdata.email"
                    hint="Tu correo será verificado"
                    required
                    :rules="[emailmessage,emailused]"
                    @blur="onBlurEmail(userdata.email)"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    name="name"
                    label="Nombre"
                    id="name"
                    type="text"
                    v-model="userdata.name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    name="last"
                    label="Apellido"
                    id="last"
                    type="text"
                    v-model="userdata.last"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <app-file-upload
                    preview
                    previewfirst
                    accept="image/*"
                    @base64="get64encode2"
                    text="Foto"
                  ></app-file-upload>
                </v-flex>
                <v-flex xs5>
                  <v-select
                    item-value="value"
                    v-model="userdata.doctype"
                    :items="docs"
                    :rules="[v => !!v || 'Coloca el tipo de documento']"
                    label="Documento"
                    hint="Tipo de documento de identificación"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs2>
                  <v-select
                    item-value="value"
                    v-model="userdata.nac"
                    :items="nacs"
                    :rules="[v => !!v || 'Coloca nacionalidad']"
                    label
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs5>
                  <v-text-field
                    name="cedula"
                    label="Cedula"
                    id="cedula"
                    type="text"
                    v-model="userdata.doc"
                    hint="Numero de documento"
                    :rules="[v => !!v || 'Coloca tu ' + doctypelabel ,docused]"
                    mask="########"
                    required
                    @blur="onBlurDoc(userdata.doc)"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    name="password"
                    label="Contraseña"
                    id="password"
                    type="password"
                    v-model="userdata.pass"
                    :rules="[minlength]"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    name="confirmpassword"
                    label="Confirmar la Contraseña"
                    id="confirmpassword"
                    type="password"
                    v-model="userdata.confirmpass"
                    :rules="[comparePasswords]"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6 v-show="showlevel">
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
                <v-flex xs6>
                  <v-text-field
                    name="telefono"
                    label="Teléfono"
                    id="telefono"
                    type="text"
                    v-model="userdata.phone"
                    required
                    hint="(####) - ### ####"
                    mask="(####) - ### ####"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
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
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      :show-current="false"
                      locale="es-es"
                      :max="maxdate"
                      :min="mindate"
                      v-model="birthdate"
                      no-title
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs6>
                  <v-btn @click="prevStep">
                    <v-icon left small>fa-arrow-left</v-icon>Anterior
                  </v-btn>
                </v-flex>
                <v-flex xs6>
                  <v-btn color="primary" :disabled="proxpaso" @click="nextStep">
                    Siguiente
                    <v-icon right small>fa-arrow-right</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </form>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-container grid-list-lg text-xs-center align-content-center>
            <v-layout row wrap>
              <v-flex xs12>
                <h1>Terminos y Condiciones del sitio</h1>
                <v-divider></v-divider>
                <br />
                <br />
                <div v-html="termstext"></div>
              </v-flex>
              <v-flex xs8 offset-xs-4>
                <p align="center">
                  <center>
                    <v-checkbox
                      label="Estoy de acuerdo con los terminos y condiciones del uso de este sitio"
                      v-model="terms"
                      color="primary"
                    ></v-checkbox>
                  </center>
                </p>
              </v-flex>
              <v-flex xs6>
                <v-btn @click="prevStep">
                  <v-icon left small>fa-arrow-left</v-icon>Anterior
                </v-btn>
              </v-flex>
              <v-flex xs6>
                <v-btn color="primary" :disabled="!terms" @click="onSignUp">Aceptar y registrarse</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="4">
          <center>
            <img src="@/assets/gracias.png" class="img-responsive" />
            <h2>Gracias por registrarte!</h2>
            <br />
            <br />
          </center>
        </v-stepper-content>
      </v-stepper-items>

      <v-stepper-items v-else>
        <v-stepper-content step="1">
          <v-container grid-list-lg text-xs-center align-content-center>
            <v-layout row wrap>
              <v-flex xs12>
                <h1>¿Que deseas hacer?</h1>
              </v-flex>
              <v-flex xs12 sm6>
                <v-btn
                  @click="do_action(0)"
                  dark
                  round
                  class="buy_gradient"
                  style="height:200px;width:200px"
                >
                  <v-container>
                    <v-layout column>
                      <v-flex xs12>
                        <v-icon size="110">fa-hand-pointer-o</v-icon>
                      </v-flex>
                      <v-flex xs12>
                        <h1>Comprar</h1>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-btn>
              </v-flex>
              <v-flex xs12 sm6>
                <v-btn
                  @click="do_action(1)"
                  dark
                  round
                  class="sell_gradient"
                  style="height:200px;width:200px"
                >
                  <v-container>
                    <v-layout column>
                      <v-flex xs12>
                        <v-icon size="110">fa-dollar</v-icon>
                      </v-flex>
                      <v-flex xs12>
                        <h1>Vender</h1>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-btn>
              </v-flex>
              <div style="height:70px">&nbsp;</div>
            </v-layout>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="2">
          <form>
            <v-container grid-list-lg align-content-center text-xs-center>
              <v-layout row wrap align-center align-content-center>
                <v-flex xs12>
                  <center>
                    <h2>Datos Personales</h2>
                    <br />
                  </center>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    name="email"
                    label="Correo electrónico"
                    id="email"
                    type="email"
                    v-model="userdata.email"
                    hint="Tu correo será verificado"
                    :rules="[emailmessage,emailused]"
                    required
                    @blur="onBlurEmail(userdata.email)"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    name="name"
                    label="Nombre"
                    id="name"
                    type="text"
                    v-model="userdata.name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    name="last"
                    label="Apellido"
                    id="last"
                    type="text"
                    v-model="userdata.last"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <app-file-upload
                    preview
                    previewfirst
                    accept="image/*"
                    @base64="get64encode2"
                    text="Foto"
                  ></app-file-upload>
                </v-flex>
                <v-flex xs5>
                  <v-select
                    v-model="userdata.doctype"
                    :items="docs"
                    :rules="[v => !!v || 'Coloca el tipo de documento']"
                    label="Documento"
                    hint="Tipo de documento de identificación"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs2>
                  <v-select
                    v-model="userdata.nac"
                    :items="nacs"
                    :rules="[v => !!v || 'Coloca nacionalidad']"
                    label
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs5>
                  <v-text-field
                    name="cedula"
                    label="Cedula"
                    id="cedula"
                    type="text"
                    v-model="userdata.doc"
                    hint="Numero de documento"
                    :rules="[v => !!v || 'Coloca tu ' + doctypelabel ,docused]"
                    mask="########"
                    required
                    @blur="onBlurDoc(userdata.doc)"
                  ></v-text-field>
                </v-flex>

                <v-flex xs6>
                  <v-text-field
                    name="password"
                    label="Contraseña"
                    id="password"
                    type="password"
                    v-model="userdata.pass"
                    :rules="[minlength]"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    name="confirmpassword"
                    label="Confirmar la Contraseña"
                    id="confirmpassword"
                    type="password"
                    v-model="userdata.confirmpass"
                    :rules="[comparePasswords]"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6 v-show="showlevel">
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
                <v-flex xs6>
                  <v-text-field
                    name="telefono"
                    label="Teléfono"
                    id="telefono"
                    type="text"
                    v-model="userdata.phone"
                    required
                    hint="(####) - ### ####"
                    mask="(####) - ### ####"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
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
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      :show-current="false"
                      locale="es-es"
                      :max="maxdate"
                      :min="mindate"
                      v-model="birthdate"
                      no-title
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs6>
                  <v-btn @click="prevStep">
                    <v-icon left small>fa-arrow-left</v-icon>Anterior
                  </v-btn>
                </v-flex>
                <v-flex xs6>
                  <v-btn color="primary" :disabled="proxpaso" @click="nextStep">
                    Siguiente
                    <v-icon right small>fa-arrow-right</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </form>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-container grid-list-lg align-content-center text-xs-center>
            <v-layout row wrap>
              <v-flex xs12>
                <center>
                  <h2>Datos de la Empresa</h2>
                </center>
              </v-flex>
              <v-flex xs12 md8>
                <v-text-field
                  name="sellername"
                  label="Nombre o Razón Social"
                  id="rif"
                  type="text"
                  v-model="userdata.seller.name"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <app-file-upload preview previewfirst accept="image/*" @base64="get64encode"></app-file-upload>
              </v-flex>
              <v-flex xs2>
                <v-select
                  v-model="userdata.seller.nac"
                  :items="nacsg"
                  :rules="[v => !!v || 'Coloca nacionalidad']"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  name="rif"
                  label="Rif"
                  id="rif"
                  type="text"
                  v-model="userdata.seller.rif"
                  required
                  mask="########-#"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  name="telefonos"
                  label="Teléfono de la Empresa"
                  id="telefonos"
                  type="text"
                  v-model="userdata.seller.phone"
                  required
                  hint="(####) - ### ####"
                  mask="(####) - ### ####"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  name="city"
                  label="Ciudad"
                  id="city"
                  type="text"
                  v-model="userdata.seller.city"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  name="address"
                  label="Dirección"
                  id="address"
                  type="text"
                  v-model="userdata.seller.address"
                  required
                  counter="300"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-btn @click="prevStep">
                  <v-icon left small>fa-arrow-left</v-icon>Anterior
                </v-btn>
              </v-flex>
              <v-flex xs6>
                <v-btn color="primary" :disabled="proxpaso" @click="nextStep">
                  Siguiente
                  <v-icon right small>fa-arrow-right</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-container grid-list-lg align-content-center text-xs-center>
            <v-layout row wrap text-align-center>
              <v-flex xs12>
                <center>
                  <h2>Perfil de Venta [{{tabs + 1}}/2]</h2>
                  <code>Todos estos datos serán verificados para su autentificación</code>
                  <br />
                  <br />
                </center>
                <v-divider></v-divider>
                <v-tabs dark v-model="tabs" slider-color="white" color="#303030">
                  <v-spacer v-show="showtabs"></v-spacer>
                  <v-tab ripple v-show="showtabs">Marcas</v-tab>
                  <v-spacer v-show="showtabs"></v-spacer>
                  <v-tab ripple v-show="showtabs">Partes</v-tab>
                  <v-spacer v-show="showtabs"></v-spacer>
                  <v-tab-item>
                    <center>
                      <h2>¿En que marcas de vehiculos te Especializas?</h2>
                    </center>
                    <v-container>
                      <v-layout row wrap>
                        <v-flex xs12 sm12 md2 lg2 xl2>
                          <v-checkbox
                            color="primary"
                            v-model="userdata.profile"
                            :label="'[Todos]'"
                            :value="'000000000000000000000000000000'"
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 sm12 md2 lg2 xl2 v-for="(brand) in brands" :key="brand.ID">
                          <v-checkbox
                            :disabled="userdata.profile.indexOf('000000000000000000000000000000')!=-1"
                            :ref="brand.ID"
                            color="primary"
                            :key="brand.ID"
                            v-model="userdata.profile"
                            :label="brand.text"
                            :value="brand.value"
                          ></v-checkbox>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-tab-item>
                  <v-tab-item>
                    <center>
                      <h2>¿Eres especialista en una clase de repuestos en particular?</h2>
                      <h3 v-if="profilequest.subparts">Selecciona las clases de repuestos que vendes</h3>
                    </center>
                    <v-container>
                      <v-layout row wrap v-if="profilequest.subparts">
                        <v-expansion-panel>
                          <v-expansion-panel-content
                            v-for="(subpart,index) in subparts"
                            :key="index"
                          >
                            <template v-slot:header>
                              <h3 style="width:100%">{{subpart.text}}</h3>
                              <v-spacer></v-spacer>
                            </template>
                            <v-card>
                              <v-card-text>
                                <v-container>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm12 md2 lg2 xl2>
                                      <app-tooltip
                                        top
                                        :tooltip="'Seleccionar todo de ' + subpart.text"
                                      >
                                        <v-checkbox
                                          color="primary"
                                          v-model="userdata.profile"
                                          :label="'[Todos]'"
                                          :value="subpart.value"
                                        ></v-checkbox>
                                      </app-tooltip>
                                    </v-flex>
                                    <template v-for="(part,index) in subpart.childs">
                                      <v-flex xs12 sm12 md2 lg2 xl2 :key="index">
                                        <v-checkbox
                                          :disabled="userdata.profile.indexOf(subpart.value) != -1"
                                          color="primary"
                                          :key="index"
                                          v-model="userdata.profile"
                                          :label="part.text"
                                          :value="part.value"
                                        ></v-checkbox>
                                      </v-flex>
                                    </template>
                                  </v-layout>
                                </v-container>
                              </v-card-text>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs6>
                          <app-tooltip bottom :tooltip="infospecialparts">
                            <v-btn
                              :color="profilequest.subparts===false?'':profilequest.subparts===0?'':'success'"
                              @click="allParts"
                            >Si</v-btn>
                          </app-tooltip>
                        </v-flex>
                        <v-flex xs6>
                          <app-tooltip bottom :tooltip="infoallparts">
                            <v-btn
                              :color="profilequest.subparts===false?'':profilequest.subparts===0?'success':''"
                              @click="allpartsset"
                            >No</v-btn>
                          </app-tooltip>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-tab-item>
                </v-tabs>
              </v-flex>
              <v-flex xs6 v-if="tabs">
                <v-btn @click="prevTab">
                  <v-icon left small>fa-arrow-left</v-icon>Anterior
                </v-btn>
              </v-flex>
              <v-flex xs6 v-else>
                <v-btn @click="prevStep">
                  <v-icon left small>fa-arrow-left</v-icon>Anterior
                </v-btn>
              </v-flex>
              <v-flex xs6 v-if="tabs<1">
                <v-btn color="primary" :disabled="nextttab" @click="nextTab">
                  Siguiente
                  <v-icon right small>fa-arrow-right</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs6 v-else>
                <v-btn color="primary" :disabled="nextttab || partscheck" @click="nextStep">
                  Siguiente
                  <v-icon right small>fa-arrow-right</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="5">
          <v-container grid-list-lg text-xs-center align-content-center>
            <v-layout row wrap>
              <v-flex xs12>
                <h1>Terminos y Condiciones del sitio</h1>
                <v-divider></v-divider>
                <br />
                <br />
                <div v-html="termstext"></div>
              </v-flex>
              <v-flex xs8 offset-xs-4>
                <p align="center">
                  <center>
                    <v-checkbox
                      label="Estoy de acuerdo con los terminos y condiciones del uso de este sitio"
                      v-model="terms"
                      color="primary"
                    ></v-checkbox>
                  </center>
                </p>
              </v-flex>
              <v-flex xs6>
                <v-btn @click="prevStep">
                  <v-icon left small>fa-arrow-left</v-icon>Anterior
                </v-btn>
              </v-flex>
              <v-flex xs6>
                <v-btn color="primary" :disabled="!terms" @click="onSignUp">Registrar</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="6">
          <center>
            <img src="@/assets/gracias.png" class="img-responsive" />
            <h2>Gracias por registrarte!</h2>
            <br />
            <v-btn color="primary" to="signin">Ingresar</v-btn>
            <br />
            <br />
          </center>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </span>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        infoallparts: 'Sera notificado por todos los tipos de partes.',
        infospecialparts: 'Debes seleccionar las partes que vendes.',
        tempprofile: [],
        sectab: false,
        showtabs: true,
        tabs: 0,
        pasos: 0,
        docused: false,
        emailused: false,
        userdata: {
            redirect: false,
            email: 'saotand@gmail.com',
            pass: '123123',
            confirmpass: '123123',
            doc: '15879381',
            doctype: 'C',
            nac: 'V',
            name: 'David',
            last: 'Salinas',
            level: 0,
            phone: '04163231120',
            birth: '1983-04-13',
            created: '',
            active: '1',
            verified: '0',
            image: '',
            seller: {
                name: 'Empresa XXX',
                image: '',
                rif: '123123123',
                nac: 'J',
                phone: '12311231212',
                city: 'Somewhere Somehow',
                address: '123'
            },
            profile: []
        },
        birthdate: '0000-00-00',
        birthdateFormatted: '0000-00-00',
        showlevel: false,
        menu1: false,
        terms: false,
        profilequest: {
            brands: false,
            models: false,
            subparts: false,
            parts: false
        },
        childs: [],
        PH: {
            brands: [],
            models: [],
            subparts: [],
            parts: []
        },
        termstext: '<p align=\'justify\'> Officia ut laboris exercitation aute eiusmod labore. Voluptate nostrud non aliquip voluptate duis Lorem minim deserunt aliqua. Ullamco culpa qui consequat adipisicing aliqua occaecat. </p> <p align=\'justify\'>Ut Lorem sunt ea elit ex dolore veniam esse. Minim ea tempor ea elit labore laborum labore do deserunt do nulla. Ipsum minim sint consequat elit amet occaecat proident sint labore. Quis laborum tempor non magna sunt velit veniam do adipisicing Lorem cupidatat duis laborum nisi. Anim ea ut eu commodo tempor incididunt proident pariatur. Dolore sit tempor ut eu elit. Sunt reprehenderit est esse Lorem tempor magna officia Lorem officia mollit consequat est. </p> <p align=\'justify\'> Sunt dolore excepteur cillum amet proident nulla sunt excepteur do eu anim velit aliqua irure. Consequat sunt commodo anim tempor labore ad voluptate. Aliqua eiusmod consectetur anim esse culpa.</p> <p align="justify"> Ea irure aliqua officia est in. Eiusmod amet duis irure non mollit quis esse nulla cillum. Labore elit ex exercitation officia do non occaecat laborum ea ea do officia nulla anim. Duis ullamco dolor cillum duis sit occaecat ut do duis eu dolor. Eiusmod magna id ncididunt sunt magna sunt qui.</p> <p align="justify">Officia anim dolor quis nulla nisi ad cillum dolore cillum magna aliquip nostrud. Ullamco ea et ad ex laboris excepteur nulla quis eiusmod consequat ea est ut in. Ea labore sit irure occaecat ullamco. Elit Lorem labore aliquip eiusmod dolore ad consequat anim pariatur. Amet culpa aute et non sit est laboris nostrud dolore laboris eu aliqua non mollit.</p>'
    }),
    computed: {
        partscheck() {
            let check = true;
            this.subparts.forEach(spart => {
                this.userdata.profile.forEach(profile => {
                    if (spart.value == profile) {
                        check = false;
                    }
                });
                spart.childs.forEach(profilec => {
                    this.userdata.profile.forEach(profilex => {
                        if (profilec.value == profilex) {
                            check = false;
                        }
                    });
                });
            });
            return check;
        },
        proxpaso() {
            let condition;
            if (this.pasos == 2) {
                condition =
          !this.emailformatted ||
          this.userdata.name.length < 3 ||
          this.userdata.last.length < 3 ||
          this.userdata.doctype.length < 0 ||
          this.userdata.nac.length < 0 ||
          this.userdata.doc.length < 7 ||
          this.pml ||
          this.cpp ||
          this.userdata.phone.length <= 10 ||
          this.emailused != '' ||
          this.docused != '';
            } else if (this.pasos == 3) {
                condition =
          this.userdata.seller.name.length < 3 ||
          this.userdata.seller.nac.length == 0 ||
          this.userdata.seller.rif.length < 9 ||
          this.userdata.seller.phone.length <= 10 ||
          this.userdata.seller.city.length == 0 ||
          this.userdata.seller.address == 0;
            }
            return condition;
        },
        emailformatted() {
            let regexemail = /^[a-zA-Z0-9!#$&*?^{}˜.Çç-]+(\.[a-zA-Z0-9!#$&*?^{}˜.Çç-]+)*@([a-zA-Z0-9]+([a-zA-Z0-9-]*)\.)+[a-zA-Z]+$/;
            let validemail = this.userdata.email.match(regexemail) ? true : false;
            return validemail;
        },
        emailmessage() {
            return this.emailformatted ? false : 'Escribe un formato de email válido';
        },
        error() {
            return this.$store.getters.ui_g_ecolor;
        },
        profiled() {
            return this.userdata.profile.length;
        },
        nextttab() {
            if (this.tabs === 0) {
                if (this.profiled) {
                    return false;
                } else {
                    return true;
                }
            } else {
                if (this.sectab) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        allbrands() {
            let abitem = '000000000000000000000000000000';
            return this.userdata.profile.indexOf(abitem) != -1;
        },
        profilen() {
            return this.userdata.profile.length;
        },
        brands() {
            return this.PH.brands;
        },
        models() {
            return this.PH.models;
        },
        subparts() {
            return this.PH.subparts;
        },
        parts() {
            return this.PH.parts;
        },
        mindate() {
            let ys = 80;
            return this.datediff(ys);
        },
        maxdate() {
            let ys = 18;
            return this.datediff(ys);
        },
        pml() {
            return this.userdata.pass.length < 6 ? true : false;
        },
        minlength() {
            return this.pml ? 'Minimo 6 caracteres' : false;
        },
        cpp() {
            return this.userdata.pass != this.userdata.confirmpass ? true : false;
        },
        comparePasswords() {
            return this.cpp ? 'Las contraseñas deben ser iguales' : false;
        },
        levels() {
            return this.$store.getters.admin_g_levels;
        },
        docs() {
            return this.$store.getters.admin_g_docs;
        },
        nacs() {
            return [
                {
                    text: 'V',
                    value: 'V'
                },
                {
                    text: 'E',
                    value: 'E'
                }
            ];
        },
        nacsg() {
            return [
                {
                    text: 'J',
                    value: 'J'
                },
                {
                    text: 'V',
                    value: 'V'
                }
            ];
        },
        niveles() {
            return [
                { text: 'usuario', value: '0' },
                { text: 'vendedor', value: '1' }
            ];
        },
        loading() {
            return !this.$store.getters.ui_g_loading;
        }
    },
    watch: {
        error(value) {
            if (value == 'success') {
                this.nextStep();
            }
        },

        birthdate() {
            this.birthdateFormatted = this.formatDate(this.birthdate);
            this.userdata.birth = this.birthdate;
        },
        'userdata.profile'() {
            if (this.tabs > 0) {
                this.actsectab();
            }
            this.subparts.forEach((part, index) => {
                this.userdata.profile.forEach(item => {
                    if (item == part.value) {
                        this.subparts[index].childs.forEach(spart => {
                            this.userdata.profile.find((pfdata, indexpf) => {
                                if (pfdata) {
                                    if (pfdata == spart.value) {
                                        this.userdata.profile.splice(indexpf, 1);
                                    }
                                }
                            });
                        });
                    }
                });
            });
        },
        allbrands(value) {
            if (value) {
                let br = this.brands;
                let pf = this.userdata.profile;
                br.forEach(br_elm => {
                    pf.forEach((elm, index) => {
                        if (elm == br_elm.value) {
                            this.userdata.profile.splice(index, 1);
                        }
                    });
                });
            }
        }
    },
    methods: {
        allParts() {
            this.profilequest.subparts = 1;
            this.subparts.forEach(spart => {
                this.userdata.profile.forEach((profile, index) => {
                    if (spart.value == profile) {
                        this.userdata.profile.splice(index, 1);
                    }
                });
            });
        },
        allpartsset() {
            this.profilequest.subparts = 0;
            this.subparts.forEach(item => {
                this.userdata.profile.push(item.value);
            });
        },
        onSignUp() {
            this.$store.dispatch('user_a_signup', this.userdata);
            if (this.ecolor == 'success') {
                this.nextStep();
            }
        },
        actsectab() {
            this.sectab = true;
        },
        profile_brands() {
            axios
                .get('ask/notilist/brands')
                .then(response => {
                    const list = response.data.data;
                    this.PH.brands = list;
                })
                .catch(error => {
                    let message = '';
                    if (error.response != undefined) {
                        message = error.response.data.error.message;
                    } else {
                        message = error;
                    }
                    this.$store.dispatch('ui_a_error', message);
                })
                .then(() => {});
        },
        profile_subparts() {
            axios
                .get('ask/notilist/subparts')
                .then(response => {
                    const list = response.data.data;
                    this.PH.subparts = list;
                })
                .catch(error => {
                    let message = '';
                    if (error.response != undefined) {
                        message = error.response.data.error.message;
                    } else {
                        message = error;
                    }
                    this.$store.dispatch('ui_a_error', message);
                })
                .then(() => {});
        },
        getfile(event) {
            if (event) {
                let image = event.target.files[0];
                this.image = image;
            }
        },
        get64encode(base64) {
            this.userdata.seller.image = base64;
        },
        get64encode2(base64) {
            this.userdata.image = base64;
        },
        prevTab() {
            const tabs = parseInt(this.tabs);
            this.tabs = tabs > 0 ? tabs - 1 : 0;
        },
        nextTab() {
            const tabs = parseInt(this.tabs);
            this.tabs = tabs < 3 ? tabs + 1 : 0;
        },
        datediff(ddiff = 80) {
            let dnow = new Date();
            let ystart = dnow.getFullYear() - ddiff;
            let mstart = dnow.getMonth();
            let dystart = dnow.getUTCDate();
            let dstart = new Date(ystart + '-' + (mstart + 1) + '-' + dystart);
            return this.$moment(dstart).format('YYYY-MM-DD');
        },
        restarfechas(f1, f2) {
            let aFecha1 = f1.split('-');
            let aFecha2 = f2.split('-');
            let fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
            let fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
            let dif = fFecha2 - fFecha1;
            let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
            return dias;
        },
        formatDate(date) {
            if (!date) return null;
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        },
        parseDate(date) {
            if (!date) return null;
            const [month, day, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },
        start() {
            this.pasos = 1;
        },
        nextStep() {
            this.pasos++;
        },
        prevStep() {
            this.pasos--;
        },
        do_action(who) {
            this.userdata.level = who;
            this.nextStep();
        },
        resetform() {
            this.userdata.email = '';
            this.userdata.pass = '';
            this.userdata.confirmpass = '';
            this.userdata.doc = '';
            this.userdata.doctype = '';
            this.userdata.nac = '';
            this.userdata.name = '';
            this.userdata.last = '';
            this.userdata.level = '';
            this.userdata.phone = '';
            this.userdata.birth = '';
            this.userdata.created = '';
            this.userdata.active = '';
            this.userdata.verified = '';
        },
        onBlurDoc(cData) {
            let data = { doc: cData };
            let url = 'user/check';
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
        },
        onBlurEmail(cData) {
            let data = { email: cData };
            let url = 'user/check';
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
                    } else {
                        message = error;
                    }
                    this.$store.dispatch('ui_a_error', message);
                })
                .then();
        }
    },
    created() {
        this.birthdate = this.maxdate;
        this.birthdateFormatted = this.formatDate(this.maxdate);
        this.profile_brands();
        this.profile_subparts();
    }
};
</script>

<style>
.buy_gradient {
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#a90329+0,8f0222+44,6d0019+100;Brown+Red+3D */
  background: #a90329; /* Old browsers */
  background: -moz-linear-gradient(
    top,
    #a90329 0%,
    #8f0222 44%,
    #6d0019 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #a90329 0%,
    #8f0222 44%,
    #6d0019 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #a90329 0%,
    #8f0222 44%,
    #6d0019 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a90329', endColorstr='#6d0019',GradientType=0 ); /* IE6-9 
  
  攀
  */
}

.sell_gradient {
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#627d4d+0,1f3b08+100;Olive+3D */
  background: #627d4d; /* Old browsers */
  background: -moz-linear-gradient(
    top,
    #627d4d 0%,
    #1f3b08 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #627d4d 0%,
    #1f3b08 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #627d4d 0%,
    #1f3b08 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#627d4d', endColorstr='#1f3b08',GradientType=0 ); /* IE6-9 */
}
</style>


