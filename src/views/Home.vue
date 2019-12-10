<template>
  <div class="home">
    <app-loading :loading="loading"></app-loading>
    <app-ask></app-ask>
    <!-- Seccion Extra -->
    <app-tutorial></app-tutorial>
    <!-- fin seccion extra -->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "home",
  components: {},
  data() {
    return {
      modelo: "",
      marca: "",
      ano: 100,
      buscar: "",
      i: 0
    };
  },
  computed: {
    loading() {
      return this.$store.getters.ui_g_loading;
    },
    user() {
      return this.$store.getters.user_g_user;
    }
  },
  watch: {
    user(val) {
      if (val == null || val == undefined) {
        this.$router.push({ name: "home" });
      }
    }
  },
  methods: {},
  updated() {
    console.log("updated home");
  }
};
</script>

<style>
.mainsearch {
  height: 300px;
}
.blackbg {
  padding: 1em;
  border-radius: 1em;
  /*margin-top: 90px !important;*/
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#000000+0,000000+100&0.22+1,0.35+100 */
  background: -moz-linear-gradient(
    top,
    rgba(0, 0, 0, 0.52) 0%,
    rgba(0, 0, 0, 0.52) 1%,
    rgba(0, 0, 0, 0.65) 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.52) 0%,
    rgba(0, 0, 0, 0.52) 1%,
    rgba(0, 0, 0, 0.65) 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.52) 0%,
    rgba(0, 0, 0, 0.52) 1%,
    rgba(0, 0, 0, 0.65) 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#38000000', endColorstr='#59000000',GradientType=0 ); /* IE6-9 */
}
</style>

