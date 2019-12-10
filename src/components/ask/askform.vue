<template>
  <div>
    <v-parallax dark src="./img/repuestos.jpg" class="autoblur">
      <v-container grid-list-md text-xs-center style="margin-top:50px">
        <v-layout row wrap>
          <v-flex xs3>
            <app-pubmainask></app-pubmainask>
          </v-flex>
          <v-flex xs6>
            <form @submit.prevent="sendAsk">
              <v-layout align-center column justify-center>
                <v-container grid-list-sm text-xs-center>
                  <v-layout row wrap class="blackbg">
                    <v-flex xs12>
                      <h2 class>
                        ¿Buscas un repuesto?
                        <br />Consultalo en nuestro sistema
                      </h2>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-select
                        required
                        @input="updatedBrand"
                        v-model="ask.brand"
                        :items="brands"
                        :rules="[v => !!v || 'Coloca la marca']"
                        label="Marca"
                        box
                        dark
                        persistent-hint
                        prepend-icon="fa-certificate"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-select
                        required
                        v-model="ask.model"
                        :items="models"
                        :rules="[v => !!v || 'Coloca el modelo']"
                        label="Modelo"
                        box
                        dark
                        persistent-hint
                        prepend-icon="fa-car"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-select
                        v-model="ask.year"
                        :items="years"
                        :rules="[v => !!v || 'Coloca el año']"
                        label="Año"
                        required
                        box
                        dark
                        persistent-hint
                        prepend-icon="calendar_today"
                      ></v-select>
                    </v-flex>
                    <v-flex xs11 v-if="simpleselect">
                      <v-autocomplete
                        required
                        solo
                        dark
                        @change="spartfromsimplepart"
                        v-model="ask.part"
                        :rules="[v => !!v || 'Selecciona el repuesto']"
                        :items="parts"
                        label="Que deseas buscar"
                        persistent-hint
                        prepend-icon="build"
                        hint="Selecciona el repuesto que estas buscando en el listado"
                        item-avatar="avatar"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs5 v-if="!simpleselect">
                      <v-autocomplete
                        required
                        solo
                        dark
                        @input="updatepartsm"
                        v-model="ask.spart"
                        :items="subparts"
                        :rules="[v => !!v || 'Coloca la parte']"
                        label="Partes"
                        persistent-hint
                        prepend-icon="build"
                        hint="Selecciona la partes"
                        placeholder="Seleccione..."
                        item-avatar="avatar"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs6 v-if="!simpleselect">
                      <v-autocomplete
                        required
                        solo
                        dark
                        v-model="ask.part"
                        :items="partsm"
                        :rules="[v => !!v || 'Coloca la Subparte']"
                        label="Sub Partes"
                        persistent-hint
                        hint="Selecciona la subparte"
                        placeholder="Seleccione..."
                        item-avatar="avatar"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs1>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            dark
                            right
                            class="partmenu"
                            v-on="on"
                            @click="simpleselect = !simpleselect"
                          >
                            <v-icon>fa-cog{{simpleselect?'':'s'}}</v-icon>
                          </v-btn>
                        </template>
                        <span v-if="simpleselect">Busqueda simple</span>
                        <span v-else>Busqueda detallada</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex xs6 v-if="readySend">
                      <v-text-field
                        clearable
                        counter="200"
                        hint="Describe los detalles de como quieres el repuesto"
                        solo
                        dark
                        v-model="ask.details"
                        label="Observaciones (opcional)"
                        persistent-hint
                        prepend-icon="visibility"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 v-if="readySend">
                      <app-file-upload accept="image/*" @base64="get64encode"></app-file-upload>
                    </v-flex>
                    <v-flex xs4></v-flex>
                    <v-flex xs4>
                      <v-btn class="primary" type="submit" :disabled="!readySend">
                        <v-icon>search</v-icon>Consultar
                      </v-btn>
                    </v-flex>
                    <v-flex xs4></v-flex>
                  </v-layout>
                </v-container>
              </v-layout>
            </form>
          </v-flex>
          <v-flex xs3>
            <app-pubmainask></app-pubmainask>
          </v-flex>
        </v-layout>
      </v-container>
      <!-- Cuadro de dialogo para no registrados -->
      <v-dialog v-model="intrologin" width="500">
        <v-card>
          <v-card-title
            :class="!darkset?'headline grey lighten-2':'headline grey darken-2'"
            primary-title
          >
            <span :style="darkset?'color:white':''">Aun no estas registrado?</span>
          </v-card-title>
          <v-card-text>
            <div style="margin:10px">
              <center>
                <img v-if="darkset" src="@/assets/logominidark.png" class="img-responsive" />
                <img v-else src="@/assets/logomini.png" class="img-responsive" />
                <br />
                <img src="@/assets/gracias.png" class="img-responsive" />
              </center>
            </div>
            <center>Para poder realizar consultas en debes registrarte o ingresar al sitio.</center>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="tosignup">
              <v-icon left>assignment_turned_in</v-icon>Registrar
            </v-btn>&nbsp;&nbsp;o&nbsp;&nbsp;
            <v-btn color="primary" flat @click="tosignin">
              <v-icon left>account_box</v-icon>Ingresar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Cuadro de dialogo para confirmacion de envio de Pregunta -->
      <v-dialog v-model="asked" width="500">
        <v-card>
          <v-card-title
            :class="!darkset?'headline grey lighten-2':'headline grey darken-2'"
            primary-title
          >
            <span :style="darkset?'color:white':''">Pregunta enviada</span>
          </v-card-title>
          <v-card-text>
            <div style="margin:10px">
              <center>
                <img v-if="darkset" src="@/assets/logominidark.png" class="img-responsive" />
                <img v-else src="@/assets/logomini.png" class="img-responsive" />
                <br />
                <img src="@/assets/gracias.png" class="img-responsive" />
              </center>
            </div>
            <center>
              <h2>Tu pregunta ha sido enviada</h2>
            </center>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" flat @click="gotoasked">
              <v-icon left>fa-comment</v-icon>Ir a mis Preguntas
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-parallax>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data: () => ({
    ask: {
      brand: "",
      model: "",
      year: "",
      part: "",
      spart: "",
      details: "",
      image: ""
    },
    simpleselect: false,
    intrologin: false,
    asked: false,
    partsm: []
  }),
  computed: {

    user() {
      return this.$store.getters.user_g_user;
    },
    darkset() {
      return this.$store.getters.dark;
    },
    readySend() {
      return this.ask.brand && this.ask.model && this.ask.year && this.ask.part
        ? true
        : false;
    },
    years() {
      return this.$store.getters.ask_g_years;
    },
    brands() {
      return this.$store.getters.ask_g_brands;
    },
    models() {
      return this.$store.getters.ask_g_models;
    },
    parts() {
      return this.$store.getters.ask_g_parts;
    },
    mparts() {
      return this.$store.getters.ask_g_mparts;
    },
    subparts() {
      let subp = [];
      this.mparts.forEach(currentItem => {
        subp.push({ text: currentItem.text, value: currentItem.value });
      });
      return subp;
    },
    ecolor() {
      return this.$store.getters.ui_g_ecolor;
    }
  },
  watch: {},
  methods: {
    get64encode(base64) {
      this.ask.image = base64;
    },
    updatedBrand(event) {
      this.$store.dispatch("ask_a_models", event);
      this.ask.model = "";
    },
    updatepartsm(event) {
      this.mparts.find(part => {
        if (part.value == event) {
          this.partsm = part.parts;
        }
      });
      this.ask.part = "";
    },
    spartfromsimplepart(event) {
      let m = this.mparts;
      m.forEach(spart => {
        spart.parts.forEach(parts => {
          if (parts.value == event) {
            this.ask.spart = spart.value;
            this.updatepartsm(spart.value);
            this.ask.part = parts.value;
          }
        });
      });
    },
    sendAsk() {
      if (this.user) {
        let requested = this.ask;
        this.$store.dispatch("ask_a_create", requested);
        this.$store.dispatch("ask_a_myasks");
        this.asked = true;
      } else {
        this.intrologin = true;
      }
    },
    tosignup() {
      this.$store.dispatch("ui_a_clear_error");
      this.intrologin = false;
      this.$router.push("/signup");
    },
    tosignin() {
      this.$store.dispatch("ui_a_clear_error");
      this.intrologin = false;
      this.$router.push("/signin");
    },
    gotoasked() {
      this.$store.dispatch("ask_a_myasks");
      this.asked = false;
      this.$router.push("/system/asked");
    },
    updateselects() {
      this.$store.dispatch("ask_a_years");
      this.$store.dispatch("ask_a_brands");
      this.$store.dispatch("ask_a_parts");
      this.$store.dispatch("ask_a_mparts");
    }
  },
  created() {
    this.updateselects();
  }
};
</script>

<style>
.partmenu {
  position: relative;
  min-width: 20px !important;
  height: 48px;
  top: -6px;
  left: -25px;
}
</style>
