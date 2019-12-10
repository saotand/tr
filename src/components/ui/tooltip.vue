<template>
  <v-tooltip :bottom="bottom" :top="top" :left="left" :right="right">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <slot></slot>
      </span>
    </template>
    <span>{{tooltip}}</span>
  </v-tooltip>
</template>
<script>
export default {
  props: ["tooltip", "bottom", "left", "right", "top"]
};
</script>
