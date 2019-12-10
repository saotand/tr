<template>
  <div>
    <v-footer fixed class="elevation-10">
      <strong v-if="logoint">
        <img src="@/assets/logo_footer.png" class="img-responsive" />
      </strong>
      <v-spacer></v-spacer>&copy;2018 —
      <strong>&nbsp;www.turepuesto.com</strong>
      <v-spacer></v-spacer>

      <v-tooltip :color="icon.color" top v-for="icon in socialSites" :key="icon.text">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" :href="icon.link" class="mx-1" icon>
            <v-icon size="24px" :color="icon.color">{{ icon.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{icon.text}}</span>
      </v-tooltip>

      <a to="/"></a>
    </v-footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    logoint: false
  }),
  computed: {
    socialSites() {
      return this.$store.getters.ui_g_social;
    }
  }
};
</script>