<template>
  <span>
    <v-data-table
      v-if="!view"
      :search="search"
      :headers="list.headers"
      :items="items"
      :item-key="items.ID"
      :rows-per-page-items="list.rowsperpage"
      class="elevation-1"
      :no-data-text="list.nodatatext"
    >
      <template v-slot:no-results>
        <div style="height:120px;margin-top:80px">
          <center>
            <h3>Buscar "{{ search }}" no dio resultados.</h3>
          </center>
        </div>
      </template>
      <template v-slot:items="props">
        <td>
          <center>
            <v-avatar style="margin:3px">
              <img
                v-if="props.item.image"
                @click="showimage(props.item.image)"
                :src="basedir + props.item.image"
                :alt="props.item.name"
              />
              <img
                v-else
                src="@/assets/no-photo-available.png"
                :alt="props.item.name"
                class="img-responsive"
              />
            </v-avatar>
          </center>
        </td>
        <td>
          <span style="cursor:pointer;text-transform:capitalize" @click="enterAsk(props.item.ID)">
            <span v-if="props.item.details">{{props.item.details}}</span>
            <span v-else>
              <app-tooltip bottom tooltip="No Disponible">
                <v-chip draggable small dark>N/D</v-chip>
              </app-tooltip>
            </span>
          </span>
        </td>
        <td>
          <center>{{formatDate(cutDate(props.item.startdate))}}</center>
        </td>
        <td>{{props.item.subpart}}</td>
        <td>{{props.item.part}}</td>
        <td>{{props.item.brand}}</td>
        <td>{{props.item.model}}</td>
        <td>{{props.item.year}}</td>
        <td>
          <app-tooltip top tooltip="Responder" v-if="!props.item.asked">
            <v-btn icon color="green" @click="resp(props.item)">
              <v-icon>fa-comment</v-icon>
            </v-btn>
          </app-tooltip>
          <app-tooltip top tooltip="Cancelar Respuesta" v-else>
            <v-btn icon color="red" @click="cresp(props.item.asked)">
              <v-icon>fa-times</v-icon>
            </v-btn>
          </app-tooltip>
        </td>
      </template>
    </v-data-table>

    <v-data-iterator
      v-else
      :search="search"
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      content-tag="v-layout"
      row
      wrap
    >
      <template v-slot:item="props">
        <v-flex xs12 sm6 md4 lg3>
          <v-card style="border:1px solid #555">
            <v-responsive
              :aspect-ratio="4/3"
              max-height="200"
              max-width="300"
              style="background-color:#000"
            >
              <img
                @click="showimage(props.item.image)"
                v-if="props.item.image"
                :src="basedir+props.item.image"
                width="100%"
                style="padding:auto;"
              />
              <img
                v-else
                src="@/assets/no-photo-available.png"
                width="100%"
                style="padding:auto;"
                class="img-responsive"
              />
            </v-responsive>
            <v-card-title>
              <h4 class>{{ props.item.details?props.item.details:'[Sin descripcion]' }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Subparte:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.subpart }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Parte:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.part }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Marca:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.brand }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Modelo:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.model }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Año:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.year }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content class="align-end">
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <center>
                          <app-tooltip top tooltip="Responder" v-if="!props.item.asked">
                            <v-btn icon color="green" @click="resp(props.item)">
                              <v-icon>fa-comment</v-icon>
                            </v-btn>
                          </app-tooltip>
                          <app-tooltip top tooltip="Cancelar Respuesta" v-else>
                            <v-btn icon color="red" @click="cresp(props.item.asked)">
                              <v-icon>fa-times</v-icon>
                            </v-btn>
                          </app-tooltip>
                        </center>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>

    <v-dialog v-model="pictureshow" width="500px">
      <template v-slot:activator="{ on }"></template>
      <app-panel noerror noloading>
        <template slot="title">
          <v-icon left>fa-picture-o</v-icon>Ver imagen
        </template>
        <template slot="button">
          <app-tooltip right tooltip="Cerrar Ventana">
            <v-btn icon @click="hideimage">
              <v-icon>fa-times</v-icon>
            </v-btn>
          </app-tooltip>
        </template>
        <form>
          <v-card-text>
            <v-layout>
              <v-flex xs12>
                <center>
                  <img
                    style="display:flex; max-width:500px; max-height:500px"
                    :src="basedir + picture"
                  />
                </center>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="hideimage">
              <v-icon left>fa-times</v-icon>Cerrar
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </form>
      </app-panel>
    </v-dialog>

    <v-dialog v-model="cresponse" width="500">
      <app-panel noerror noloading>
        <template slot="title">Cancelar Respuesta?</template>
        <v-card-text>
          <center>
            <h2>Estas Seguro de cancelar esta respuesta?</h2>
          </center>
          <br />
          <v-card>
            <v-responsive v-if="rpayload.image">
              <img :src=" basedir+rpayload.image" class="img-responsive" />
            </v-responsive>
            <v-container>
              <v-layout>
                <v-flex xs3>
                  <b>Precio:</b>
                </v-flex>
                <v-flex>{{rpayload.price}} {{currency[rpayload.currency].text}}</v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs3>
                  <b>Descripcion:</b>
                </v-flex>
                <v-flex>{{rpayload.details}}</v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-layout>
            <v-flex>
              <center>
                <v-btn color="red" @click="hideCResponseWindow">No</v-btn>
              </center>
            </v-flex>
            <v-flex>
              <center>
                <v-btn color="green" @click="onSubmitCR">Si</v-btn>
              </center>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </app-panel>
    </v-dialog>

    <v-dialog v-model="response" width="600" persistent>
      <template v-slot:activator="{on}"></template>
      <app-panel noerror noloading>
        <template slot="title">Responder a:</template>
        <template slot="button">
          <v-btn icon @click="hideResponseWindow">
            <v-icon>fa-times</v-icon>
          </v-btn>
        </template>
        <v-card-text>
          <v-container style="margin0;padding:0">
            <v-layout>
              <v-flex xs10 sm5>
                <v-text-field
                  v-model="rpayload.price"
                  label="Precio"
                  type="number"
                  style="text-align:right"
                ></v-text-field>
              </v-flex>
              <v-flex xs2 sm1>
                <v-select v-model="rpayload.currency" :items="currency"></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <app-file-upload preview previewfirst accept="image/*" @base64="get64encode"></app-file-upload>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-textarea
                  v-model="rpayload.details"
                  multi-line
                  label="Descripcion"
                  hint="Por favor no colocar informacion de contacto o enlaces externos a este sitio, las respuestas serán verificadas"
                  persistent-hint
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" outline @click="hideResponseWindow()">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="readysend" @click="onSubmit">Enviar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </app-panel>
    </v-dialog>
    <code>{{crpayload}}</code>
    <br />
    <code>{{rpayload}}</code>
  </span>
</template>

<script>
import axios from "axios";
export default {
  props: ["items", "search", "view"],
  data: () => ({
    currency: [{ text: "Bs.", value: "0" }, { text: "$", value: "1" }],
    response: false,
    cresponse: false,
    crpayload: "",
    rpayload: {
      ID: "",
      currency: "0",
      price: "",
      details: "",
      image: ""
    },
    cancelable: false,
    picture: false,
    list: {
      headers: [
        {
          text: "Imagen",
          align: "center",
          sortable: false,
          value: "image"
        },
        { text: "Descripcion", value: "details" },
        { text: "Creado", value: "startdate", align: "center" },
        { text: "Sub-Parte", value: "subpart" },
        {
          text: "Parte",
          value: "part"
        },
        { text: "Marca", value: "brand" },
        { text: "Modelo", value: "model" },
        {
          text: "Año",
          value: "year"
        },
        { text: "Acciones", value: "response" }
      ]
    },
    rowsPerPageItems: [10, 25, 50, 100, { text: "Todos", value: -1 }],
    nodatatext: "Sin datos"
  }),
  watch: {
    "rpayload.ID"() {
      this.update_ask();
    }
  },
  computed: {
    readysend() {
      return (
        this.rpayload.price.length == 0 || this.rpayload.details.length == 0
      );
    },
    basedir() {
      return axios.defaults.baseURL;
    },
    pictureshow() {
      if (this.picture) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    onSubmit() {
      let payload;
      if (this.rpayload) {
        payload = {
          requestID: this.rpayload.ID,
          price: this.rpayload.price,
          image: this.rpayload.image,
          currency: this.rpayload.currency,
          details: this.rpayload.details
        };
      }
      this.$store.dispatch("ask_a_saveresponseto", payload);
      this.hideResponseWindow();
      this.update_ask();
      this.clean_rpayload();
    },
    onSubmitCR() {
      this.$store.dispatch("ask_a_deleteresponseto", this.rpayload);
      this.hideCResponseWindow();
      this.clean_rpayload();
      this.update_ask();
    },
    get64encode(base64) {
      this.rpayload.image = base64;
    },
    showimage(imagen) {
      this.picture = imagen;
    },
    hideimage() {
      this.picture = false;
    },
    showResponseWindow() {
      this.response = true;
    },
    showCResponseWindow() {
      this.cresponse = true;
    },
    hideResponseWindow() {
      this.response = false;

      this.clean_rpayload();
    },
    hideCResponseWindow() {
      this.cresponse = false;
      this.clean_rpayload();
      this.clean_crpayload();
    },
    clean_rpayload() {
      this.rpayload = {
        ID: "",
        currency: "0",
        price: "",
        details: "",
        image: ""
      };
    },
    clean_crpayload() {
      this.crpayload = "";
    },
    resp(payload) {
      if (payload) {
        this.rpayload.ID = payload.ID;
        this.showResponseWindow();
      }
    },
    cresp(payload) {
      if (payload) {
        this.rpayload.ID = payload.ID;
        this.rpayload.currency = payload.currency;
        this.rpayload.price = payload.price;
        this.rpayload.details = payload.details;
        this.rpayload.image = payload.image;
        this.showCResponseWindow();
      }
    },
    cutDate(date) {
      return date.slice(0, 10);
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
    update_ask() {
      this.$store.dispatch("ask_a_setresponses");
    }
  }
};
</script>

<style>
</style>