<template>
  <v-data-table
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
              :src="basedir + props.item.image"
              :alt="props.item.name"
              class="img-responsive"
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
      <td>{{props.item.subpart}}</td>
      <td>{{props.item.part}}</td>
      <td>{{props.item.brand}}</td>
      <td>{{props.item.model}}</td>
      <td>{{props.item.year}}</td>
      <td>0</td>
    </template>
  </v-data-table>
</template>
<script>
import axios from "axios";
export default {
  props: ["search", "items", "brands", "models"],
  data: () => ({
    list: {
      headers: [
        {
          text: "Imagen",
          align: "center",
          sortable: false,
          value: "image"
        },
        { text: "Descripcion", value: "details" },

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
        { text: "Presupuestos", value: "response" }
      ],
      nodatatext: "No hay preguntas que mostrar",
      rowsperpage: [10, 25, 50, 100, { text: "Todos", value: -1 }]
    }
  }),
  computed: {
    parts() {
      return [];
    },
    subparts() {
      return [];
    },
    basedir() {
      return axios.defaults.baseURL;
    }
  },
  methods: {
    enterAsk(value) {
      this.$router.push("/system/asked/" + value);
    }
  },
  created() {}
};
</script>

