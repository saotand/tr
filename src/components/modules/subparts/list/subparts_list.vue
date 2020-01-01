<template>
  <span>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="subparts"
      item-key="subparts.ID"
      :rows-per-page-items="rppi"
      class="elevation-1"
      :no-data-text="nodata"
    >
      <template v-slot:no-results>
        <div style="height:140px;margin-top:80px">
          <center>
            <h3>Buscar "{{ search }}" no dio resultados.</h3>
          </center>
        </div>
      </template>
      <template v-slot:items="props">
        <td>{{props.item.name}}</td>
        <td>
          <v-icon
            :style="darkside?'color:lightgreen':'color:green'"
            v-if="props.item.active==true"
          >fa-eye</v-icon>
          <v-icon
            style="color:red"
            v-else
          >fa-eye-slash</v-icon>
        </td>
        <td>
          <center>
            <span>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    <app-subparts-dialog-edit
                      :black="true"
                      :item="props.item"
                    ></app-subparts-dialog-edit>
                  </span>
                </template>
                <span>Editar {{title}}</span>
              </v-tooltip>
            </span>
            <span>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    <app-subparts-dialog-del :item="props.item"></app-subparts-dialog-del>
                  </span>
                </template>
                <span>Eliminar {{title}}</span>
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
    props: ['parts', 'subparts', 'search'],
    data () {
        return {
            nodata: 'No hay Subpartes que mostrar',
            rppi: [10, 25, 50, 100, { text: 'Todos', value: -1 }],
            title: 'Subpartes',
            pagination: '0',
            headers: [
                /*
        {
          text: "Imagen",
          align: "center",
          sortable: false,
          value: "image"
        },
        */
                {
                    text: 'Nombre',
                    value: 'name'
                },
                {
                    text: 'Activo',
                    value: 'active'
                },
                {
                    text: 'Opciones',
                    align: 'center',
                    sortable: false
                }
            ]
        };
    },
    computed: {
        active () {
            return this.items.active ? true : false;
        },
        loading () {
            return this.$store.getters.ui_g_loading;
        },
        darkside () {
            return this.$store.getters.ui_g_dark;
        }
    },
    methods: {
        subpartIndex (ID) {
            let getsubpart = this.subparts.find((subpart, index) => {
                if (subpart.ID == ID) {
                    return this.subparts[index];
                }
            });
            return getsubpart.name;
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
