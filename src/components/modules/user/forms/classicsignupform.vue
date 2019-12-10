<template>
  <v-layout v-if="classic">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title dark class="primary">
          <h1 style="color:white">Registrate</h1>
        </v-card-title>
        <v-container grid-list-md>
          <form @submit.prevent="onsubmit">
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  name="name"
                  label="Nombre"
                  id="name"
                  type="text"
                  v-model="userdata.name"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="last"
                  label="Apellido"
                  id="last"
                  type="text"
                  v-model="userdata.last"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
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
              <v-flex xs1>
                <v-select
                  item-value="value"
                  v-model="userdata.nac"
                  :items="nacs"
                  :rules="[v => !!v || 'Coloca nacionalidad']"
                  label
                  required
                ></v-select>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  name="cedula"
                  label="Cedula"
                  id="cedula"
                  type="text"
                  v-model="userdata.doc"
                  hint="Numero de documento"
                  mask="########"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  name="email"
                  label="Correo electrónico"
                  id="email"
                  type="email"
                  v-model="userdata.email"
                  hint="Tu correo será verificado"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6>
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
              <v-flex xs6>
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
            <v-layout row>
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
                  <v-date-picker locale="es-es" v-model="birthdate" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 align-center>
                <center>
                  <v-btn class="primary" type="submit" :disabled="loading" :loading="loading">
                    Registrar
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                  </v-btn>
                </center>
              </v-flex>
            </v-layout>
          </form>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {};
</script>

<style>
</style>
