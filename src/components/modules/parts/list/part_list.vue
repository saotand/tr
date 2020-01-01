<template>
  <span>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="parts"
      item-key="parts.ID"
      :rows-per-page-items="[10,25,50,100,{'text':'Todos','value':-1}]"
      class="elevation-1"
      no-data-text="No hay Partes que mostrar"
    >
      <template v-slot:no-results>
        <div style="height:140px;margin-top:80px">
          <center>
            <h3>Buscar "{{ search }}" no dio resultados.</h3>
          </center>
        </div>
      </template>
      <template v-slot:items="props">
        <td :class="!props.item.sname?redbg:''">
          <center>
            <v-avatar style="margin:3px">
              <img
                src="@/assets/no-photo-available.png"
                class="img-responsive"
              />
            </v-avatar>
          </center>
        </td>
        <td :class="!props.item.sname?redbg:''">{{props.item.name}}</td>
        <td :class="!props.item.sname?redbg:''">{{props.item.sname}}</td>
        <td :class="!props.item.sname?redbg:''">
          <v-icon
            :style="darkside?'color:lightgreen':'color:green'"
            v-if="props.item.active==true"
          >fa-eye</v-icon>
          <v-icon
            style="color:red"
            v-else
          >fa-eye-slash</v-icon>
        </td>
        <td :class="!props.item.sname?redbg:''">
          <center>
            <span>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    <app-part-dialog-edit
                      :item="props.item"
                      :subparts="subparts"
                    ></app-part-dialog-edit>
                  </span>
                </template>
                <span>Editar Parte</span>
              </v-tooltip>
            </span>
            <span>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    <app-part-dialog-del :item="props.item"></app-part-dialog-del>
                  </span>
                </template>
                <span>Eliminar Parte</span>
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
            pagination: '0',
            headers: [
                {
                    text: 'Imagen',
                    align: 'center',
                    sortable: false,
                    value: 'image'
                },
                {
                    text: 'Nombre',
                    value: 'name'
                },
                {
                    text: 'Sub-Parte',
                    value: 'sname'
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
        },
        redbg () {
            return this.darkside ? 'reddark' : 'redlight';
        }
    },
    methods: {
        subpartIndex (ID) {
            let getsubpart = this.subparts.find((subpart, index) => {
                if (subpart.ID == ID) {
                    return this.subparts[index];
                }
            });
            return getsubpart ? getsubpart.name : '*** NO ASIGNADO ***';
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
