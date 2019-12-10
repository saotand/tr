<template>
  <span>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="items"
      item-key="items.ID"
      :rows-per-page-items="[10,25,50,100,{'text':'Todos','value':-1}]"
      class="elevation-1"
      no-data-text="No hay marcas que mostrar"
    >
      <template v-slot:no-results>
        <div style="height:140px;margin-top:80px">
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
                src="@/assets/no-photo-available.png"
                :alt="props.item.name"
                class="img-responsive"
              />
            </v-avatar>
          </center>
        </td>
        <td>{{props.item.name}}</td>
        <td>{{props.item.cars}}</td>
        <td>
          <v-icon
            :style="darkside?'color:lightgreen':'color:green'"
            v-if="props.item.active==true"
          >fa-eye</v-icon>
          <v-icon style="color:red" v-else>fa-eye-slash</v-icon>
        </td>
        <td>
          <center>
            <span>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    <app-brand-dialog-edit :item="props.item"></app-brand-dialog-edit>
                  </span>
                </template>
                <span>Editar Marca</span>
              </v-tooltip>
            </span>
            <span>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    <app-brand-dialog-delete :item="props.item"></app-brand-dialog-delete>
                  </span>
                </template>
                <span>Eliminar Marca</span>
              </v-tooltip>
            </span>
          </center>
        </td>
      </template>
    </v-data-table>
  </span>
</template>

<script>
export default {
  props: ["items", "search"],
  data() {
    return {
      pagination: "0",
      headers: [
        {
          text: "Imagen",
          align: "center",
          sortable: false,
          value: "image"
        },
        {
          text: "Nombre",
          value: "name"
        },
        {
          text: "Modelos",
          value: "cars"
        },
        {
          text: "Activo",
          value: "active"
        },
        {
          text: "Opciones",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  computed: {
    active() {
      return this.items.active ? true : false;
    },
    loading() {
      return this.$store.getters.ui_g_loading;
    },
    darkside() {
      return this.$store.getters.ui_g_dark;
    }
  }
};
</script>

<style>
.adminuser {
  color: navy;
  font-weight: bold !important;
}

.selfuser {
  color: darkgreen;
  font-weight: bold !important;
}
</style>
