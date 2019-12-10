<template>
  <app-tooltip right :tooltip="formatDate(notification.created)">
    <v-list-tile :class="darkset?'notif_dark':'notif'">
      <v-list-tile-avatar>
        <v-avatar style="background-color:#AAA">
          <v-icon x-large v-text="action.icon"></v-icon>
        </v-avatar>
      </v-list-tile-avatar>
      <v-list-tile-title>Texto de prueba</v-list-tile-title>
    </v-list-tile>
    <v-divider></v-divider>
  </app-tooltip>
</template>

<script>
export default {
  props: ["notification"],
  data: () => ({
    modules: ["fa-user", "ask"],
    actions: [
      {
        text: "añadir",
        icon: "fa-plus"
      },
      {
        text: "editar",
        icon: "fa-edit"
      },
      {
        text: "eliminar",
        icon: "fa-trash"
      }
    ]
  }),
  computed: {
    darkset() {
      return this.$store.getters.ui_g_dark;
    },
    action() {
      return this.action_get(this.notification.action);
    }
  },
  watch: {},
  methods: {
    action_get(value) {
      return this.actions[value];
    },
    formatDate(date) {
      if (!date) {
        return null;
      } else {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
      }
    },
    parseDate(date) {
      if (!date) {
        return null;
      } else {
        const [month, day, year] = date.split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      }
    }
  }
};
</script>

<style>
.notif:hover {
  background-color: #eeeeee;
}

.notif_dark:hover {
  background-color: #555;
}
</style>
