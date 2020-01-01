<template>
  <span>
    <v-card-text>
      <v-layout wrap>
        <v-flex
          offset-xs0
          xs12
          sm8
          md10
        >
          <h1>
            <app-tooltip
              bottom
              tooltip="Marca, Modelo y Año"
            >
              <v-icon
                x-large
                style="margin:2px 0"
              >fa-car</v-icon>
              {{ask.brand}}, {{ask.model}} - {{ask.year}}
            </app-tooltip>
          </h1>
          <hr>
        </v-flex>
        <v-flex
          offset-xs0
          xs12
          sm4
          md2
        >
          <br>
          <app-tooltip
            bottom
            tooltip="Creado"
          >
            <v-icon small>fa-calendar</v-icon>
            {{createdformatted}}
          </app-tooltip>
          <br>
          <br>
        </v-flex>
        <v-flex
          offset-xs0
          xs12
        >
          <h2>
            <app-tooltip
              bottom
              tooltip="Parte y Subparte"
            >
              <v-icon>fa-cogs</v-icon>
              {{ask.subpart}}, {{ask.part}}
            </app-tooltip>
          </h2>
        </v-flex>
        <v-flex
          offset-xs0
          xs12
        >
          <br>
          <v-card flat>
            <v-card-text>
              <p style="text-transform:capitalize">{{ask.details ? ask.details:'Sin descripción'}}</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-chip
        style="margin-left:10px"
        text-color="red"
        outline
        disabled
      >
        <b>0 Respuestas</b>
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        to="/system/asked"
        round
      >
        <v-icon left>fa-reply</v-icon>Regresar
      </v-btn>
    </v-card-actions>
  </span>
</template>
<script>
/* eslint-disable */
export default {
  data () {
    return {
      panel: {
        title: "Preguntas",
        icon: "fa-comment",
        refresh: true,
        add: true,
        edit: true,
        delete: true,
        pause: true,
        search: true
      },
      details: true,
      search: ""
    };
  },
  watch: {},
  computed: {
    askID () {
      return this.$route.params.askid;
    },
    ask () {
      return this.$store.getters.ask_g_ask(this.askID);
    },
    createdformatted () {
      return this.formatDate(this.ask.startdate.substr(0, 10));
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate (date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  updated () {
    console.log("updated user");
  }
};
</script>

