<template>
  <span :class="'panel-margin ' + maxed" v-if="panel.show">
    <v-card dark class>
      <v-card-title class="title-panel primary">
        <span class="panel-title-text">
          <v-icon left small>{{panel.icon}}</v-icon>
          {{panel.title}}
        </span>
        <v-spacer></v-spacer>
        <v-btn small icon v-if="panel.btn.maximize" @click="maximize">
          <v-icon small>fa-arrows-alt</v-icon>
        </v-btn>
        <v-btn small icon v-if="panel.btn.minimize" @click="minimize">
          <v-icon small v-if="panel.content">fa-caret-square-o-up</v-icon>
          <v-icon small v-else>fa-caret-square-o-down</v-icon>
        </v-btn>
        <v-btn small icon v-if="panel.btn.closable" @click="close">
          <v-icon small>fa-times</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text v-if="panel.content">
        <slot id="wincontent">demo</slot>
      </v-card-text>
    </v-card>
    <span></span>
  </span>
</template>

<script>
export default {
  props: ["title", "c", "max", "min", "slotname"],
  data: () => ({
    panel: {
      show: true,
      icon: "fa-paperclip",
      title: "Panel",
      content: true,
      layer: 1,
      color: "red",
      drag: false,
      dragable: false,
      max: false,
      btn: {
        maximize: false,
        minimize: true,
        closable: true
      }
    }
  }),
  computed: {
    maxed() {
      return this.panel.max ? "max" : "";
    }
  },
  methods: {
    minimize() {
      this.panel.content = !this.panel.content;
    },
    maximize() {
      this.panel.max = !this.panel.max;
    },
    close() {
      this.panel.show = false;
    }
  },
  created() {
    if (this.title !== undefined) this.panel.title = this.title;
    if (this.c !== undefined) this.panel.btn.closable = this.c;
    if (this.max !== undefined) this.panel.btn.maximize = this.max;
    if (this.min !== undefined) this.panel.btn.minimize = this.min;
  }
};
</script>

<style>
.max {
  position: absolute;
  width: 100% !important;
  height: 100% !important;
}
.title-panel {
  margin: 0px;
  padding: 0px 10px;
}
.panel-title-text {
  /*border: 1px solid #000;*/
  margin: 2px;
  padding: 10px;
}
.panel-margin {
  margin: 1px;
}
</style>