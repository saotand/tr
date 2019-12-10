<template>
  <span>
    <v-alert
      style="margin:0px;padding:10px 15px;"
      :type="color"
      dismissible
      @input="onClose"
      :value="true"
    >
      <h2>{{text}}</h2>
      <v-progress-linear height="2" :value="timer" color="white" style="margin:-2px;padding:-5px;"></v-progress-linear>
    </v-alert>
  </span>
</template>
<script>
import { setInterval } from "timers";
export default {
  props: ["text"],
  data: () => ({
    timer: 0,
    percent: 100,
    interval: 100
  }),
  computed: {
    color() {
      return this.$store.getters.ui_g_ecolor;
    }
  },
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  },
  created() {
    setInterval(() => {
      this.timer += 1;
      if (this.timer >= this.percent + 2) {
        this.$emit("dismissed");
      }
    }, this.interval);
  }
};
</script>