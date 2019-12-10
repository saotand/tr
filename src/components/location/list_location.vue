<template>
  <span>
    <v-data-table :headers="headers" :items="items" :search="search" class="elevation-1">
      <template v-slot:no-results>
        <div style="height:140px;margin-top:80px">
          <center>
            <h3>Buscar "{{ search }}" no dio resultados.</h3>
          </center>
        </div>
      </template>
      <template v-slot:items="local">
        <td style="cursor:pointer" width="70%" @click="getTo(local.item.value)">{{local.item.text}}</td>
        <td width="15%">{{local.item.childs.length}}</td>
        <td width="15%">
          <center>
            <app-location-form action="edit" :item="local.item"></app-location-form>
            <app-location-form action="del" :item="local.item"></app-location-form>
          </center>
        </td>
      </template>
    </v-data-table>
  </span>
</template>

<script>
import cmplocationform from "@/components/location/form_location";

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    search: "",
    headers: [
      {
        text: "Nombre",
        align: "left",
        sortable: true,
        value: "name"
      },
      { text: "Ciudades", align: "left", sotable: true, value: false },
      { text: "actions", align: "center", sortable: false, value: false }
    ]
  }),
  methods: {
    getTo(item) {
      //alert(item);
      this.$router.push("/system/locale/" + item);
    }
  },
  components: { "app-location-form": cmplocationform }
};
</script>

<style>
</style>