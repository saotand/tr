<template>
  <span>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="items"
      item-key="items.ID"
      :rows-per-page-items="[10,25,50,100,{'text':'Todos','value':-1}]"
      no-data-text="No hay modelos que mostrar"
      class="elevation-1"
    >
      <template v-slot:no-results>
        <div style="height:140px;margin-top:80px">
          <center>
            <h3>Buscar "{{ search }}" no dio resultados.</h3>
          </center>
        </div>
      </template>
      <template v-slot:items="props">
        <td :class="!props.item.bname?redbg:''">
          <center>
            <v-avatar style="margin:3px">
              <img src="@/assets/no-photo-available.png" class="img-responsive" />
            </v-avatar>
            <!--
            <v-img
              src="@/assets/no-photo-available.png"
              lazy-src="@/assets/no-photo-available.png"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>
              </template>
            </v-img>-->
          </center>
        </td>
        <td :class="!props.item.bname?redbg:''">{{props.item.name}}</td>
        <td
          :class="!props.item.bname?redbg:''"
          v-html="props.item.bname?props.item.bname:'<b style=\'color:red\'>No asignado</b>'"
        ></td>
        <td :class="!props.item.bname?redbg:''">
          <v-icon
            :style="darkside?'color:lightgreen':'color:green'"
            v-if="props.item.active==true"
          >fa-eye</v-icon>
          <v-icon style="color:red" v-else>fa-eye-slash</v-icon>
        </td>
        <td :class="!props.item.bname?redbg:''">
          <center>
            <span>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    <app-model-dialog-edit :item="props.item" :brands="brands"></app-model-dialog-edit>
                  </span>
                </template>
                <span>Editar Modelo</span>
              </v-tooltip>
            </span>
            <span>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    <!-- <app-brand-dialog-delete :item="props.item"></app-brand-dialog-delete>-->
                    <app-model-dialog-del :item="props.item"></app-model-dialog-del>
                  </span>
                </template>
                <span>Eliminar Modelo</span>
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
  props: ["items", "brands", "search"],
  data() {
    return {
      pagination: "0",
      headers: [
        {
          text: "Foto",
          align: "center",
          sortable: false,
          value: "image"
        },
        {
          text: "Nombre",
          value: "name"
        },
        {
          text: "Marca",
          value: "bname"
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
    },
    redbg() {
      return this.darkside ? "reddark" : "redlight";
    }
  },
  methods: {
    brandIndex(ID) {
      let getBrand = this.brands.find((brand, index) => {
        if (brand.ID == ID) {
          return this.brands[index];
        }
      });
      return getBrand ? getBrand.name : "*** NO ASIGNADO ***";
    }
  },
  updated() {
    //this.$store.dispatch("loadModels");
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

.reddark {
  background-color: rgb(110, 2, 2);
}

.redlight {
  background-color: rgb(255, 153, 153);
}
</style>
