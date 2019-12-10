<template>
  <v-card :color="color" style="overflow:hidden;" height="186px">
    <v-container style="padding:0;margin:0;">
      <v-layout>
        <v-flex xs8 sm8 md8 lg8 xl8>
          <div style="padding:15px; height:138px; ">
            <div style="margin:0px; font-size:18px">
              <b>{{title}}</b>
            </div>
            <br />
            <span style="font-size:78px; line-height:40px;">
              <b>{{value}}</b>
            </span>
          </div>
        </v-flex>
        <v-flex
          xs4
          sm4
          md4
          lg4
          xl4
          style="text-align:right;margin-top:15px; margin-right:10px; height:100px"
        >
          <v-icon size="100">{{icon}}</v-icon>
          <v-icon class="transparent iconscale" style="position:relative;z-index:1">{{icon}}</v-icon>
        </v-flex>
      </v-layout>
      <v-layout
        column
        class="seccolor"
        style="margin:0px; padding:0px; position:relative; z-index:1"
      >
        <v-flex xs12 class="baselinebar">
          <center>
            <v-btn flat block style="margin:0;padding:0;text-transform:capitalize !important;">
              Más info
              <v-icon small right>fa-arrow-circle-right</v-icon>
            </v-btn>
          </center>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    url: {
      default: "/",
      type: String,
      required: false
    },
    title: {
      default: "title",
      type: String,
      required: false
    },
    icon: {
      default: "fa-home",
      type: String,
      required: false
    },
    color: {
      default: "",
      type: String,
      required: false
    },
    value: {
      default: "N/A",
      required: false
    }
  }
};
</script>

<style scoped>
.valuescale {
  transform: scale(1.5);
}

.transparent {
  opacity: 0.3;
}

.seccolor {
  background-color: rgba(0, 0, 0, 0.466);
  /*transform: scale(1.9);*/
}

.iconscale {
  transform: scale(15);
}
</style>
