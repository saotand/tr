<template>
  <app-panel color="primary" dark noerror>
    <template slot="title">
      <v-icon left>{{panel.icon}}</v-icon>
      <b>{{panel.title}}</b>
    </template>
    <template slot="button">
      <app-tooltip bottom tooltip="Busqueda">
        <v-text-field
          clearable
          dark
          v-model="search"
          prepend-icon="fa-search"
          single-line
          style="position:relative;top:4px"
          placeholder="Buscar"
        ></v-text-field>
      </app-tooltip>
      <app-tooltip tooltip="Actualizar" bottom v-if="panel.refresh">
        <v-btn icon @click="refresh">
          <v-icon dark class="text-white">fa-refresh</v-icon>
        </v-btn>
      </app-tooltip>
      <app-user-form v-if="!loading"></app-user-form>
    </template>
    <template>
      <app-usersdetails v-if="details" :users="users" :search="search"></app-usersdetails>
      <app-userscards v-else :users="users" :search="search"></app-userscards>
    </template>
  </app-panel>
</template>
<script>
import cmpUserForm from "@/components/modules/user/dialogs/user_form.vue";
import cmpUserCards from "@/components/modules/user/user_list/user_cards_list";

export default {
  /* eslint-disable */
  data() {
    return {
      panel: {
        icon: "fa-users",
        title: "Usuarios",
        search: true,
        refresh: true
      },
      details: true,
      search: "",
      tottlelist: false
    };
  },
  computed: {
    loading() {
      return this.$store.getters.ui_g_loading;
    },
    users() {
      return this.$store.getters.admin_g_users;
    }
  },
  methods: {
    onDismissed() {
      this.$store.dispatch("ui_a_clear_error");
    },
    refresh() {
      this.$store.dispatch("admin_a_set_users");
      this.$store.dispatch("ui_a_clear_error");
    }
  },
  updated() {
    console.log("updated user");
  },
  components: {
    "app-user-form": cmpUserForm,
    "app-userscards": cmpUserCards
  }
};
</script>

