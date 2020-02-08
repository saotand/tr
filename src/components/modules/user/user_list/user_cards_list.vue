<template>
  <v-data-iterator
    item-key="users.ID"
    :expand="true"
    :items="users"
    :rows-per-page-items="rowsPerPageItems"
    :pagination.sync="pagination"
    content-tag="v-layout"
    row
    wrap
    :search="search"
    no-data-text="No hay Usuarios que mostrar"
  >
    <template v-slot:item="props">
      <v-flex xs12 sm4 md4 lg3>
        <div style="margin:10px">
          <app-miniucard :cuser="props.item"></app-miniucard>
        </div>
      </v-flex>
    </template>
    <template v-slot:no-results>
      <div style="height:140px;margin-top:80px">
        <center>
          <h3>Buscar "{{ search }}" no dio resultados.</h3>
        </center>
      </div>
    </template>
  </v-data-iterator>
</template>

<script>
import cmpucard from '@/components/modules/user/user_cards/mini_user_info_card';

export default {
    props: ['users', 'search'],
    data() {
        return {
            pagination: {},
            rowsPerPageItems: [12, 24, 48, 96, { text: 'Todos', value: -1 }]
        };
    },
    methods: {},
    computed: {},
    components: {
        'app-miniucard': cmpucard
    }
};
</script>

<style>
</style>
