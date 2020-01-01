<template>
  <div>
    <!--
    <div class="text-xs-center">
      
      <v-btn
        app
        persistent
        :disabled="dialog"
        :loading="dialog"
        class="white--text"
        color="red darken-2"
        @click.stop="dialog = true"
      >Start loading</v-btn>
    -->
    <v-dialog
      fixed
      v-model="loading"
      hide-overlay
      persistent
      width="300"
      max-width="490"
      class="text-xs-center"
    >
      <v-card>
        <v-card-text class="text--center">
          <center>
            <h3>
              <v-icon left>query_builder</v-icon>Cargando
            </h3>
          </center>
          <v-progress-linear
            indeterminate
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- </div> -->
    <div
      class="overlay"
      v-if="loading"
    ></div>
  </div>
</template>

<script>
export default {
    props: {
        loading: Boolean
    },
    data () {
        return {
            dialog: false
        };
    }
    /* ,
  watch: {
    dialog(val) {
      if (!val) return;
      setTimeout(() => (this.dialog = false), 4000);
    }
  }*/
};
</script>

<style scopped>
.overlay {
  position: fixed; /* Sit on top of the page content */
  /*display: none;  Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); /* Black background with opacity */
  z-index: 5; /* Specify a stack order in case you're using a different order for other elements */
}
</style>
