<template>
  <div>
    <!--
    <v-btn block color="primary" dark @click="snackbar = true">Show Snackbar</v-btn>
    -->
    <v-snackbar
      @input="ontimeout"
      right
      bottom
      v-model="snackbar"
      :color="toast.type"
      :multi-line="toast.mode === 'multi-line'"
      :timeout="toast.timeout"
      :vertical="toast.mode === 'vertical'"
    >
      {{ toast.message }}
      <v-btn dark flat @click="snackbar = false">&times;</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: ["toast"],
  data() {
    return {
      snackbar: false
    };
  },
  watch: {
    toast(value) {
      this.snackbar = value;
    }
  },
  computed: {},
  methods: {
    ontimeout() {
      this.$emit("snackout");
    }
  }
};
</script>

<style>
</style>

