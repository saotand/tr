<template>
  <div>
    <v-flex row wrap>
      <v-input>
        <span
          v-if="!nitems"
        >Selecciona las piezas de modelos, marcas y partes que recibiras notificaciones</span>
        <v-chip v-for="(item,index) in value" :key="index">
          <v-icon small>fa-car</v-icon>&nbsp;&nbsp;&nbsp;
          <span>
            <b>{{item}}</b>&nbsp;
            <i>(Type)</i>
          </span>
          <v-btn icon small class="chipclosebtn" @input="remove(item)">
            <v-icon small style="color:#aaa">fa-times</v-icon>
          </v-btn>
        </v-chip>
      </v-input>
    </v-flex>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  props: {
    value: {
      default: false,
      required: false
    }
  },
  data: () => ({
    items: []
  }),
  watch: {},
  computed: {
    listparts() {
      let full_list = [];
      return full_list;
    },
    nitems() {
      return this.value.length;
    },
    parts() {
      return this.$store.getters.admin_g_parts;
    }
  },
  methods: {
    remove(item) {
      alert(item);
      /*
      this.value.find((cursor, index) => {
        if (item.value == cursor) {
          this.sell.splice(index, 1);
        }
      });*/
    },
    loadnotificationprofile() {
      const Token = sessionStorage.getItem("token");
      const options = { headers: { Authorization: Token } };
      const url = "ask/notilist";
      Axios.get(url, options)
        .then(response => {
          const list = response.data.data;
          this.items = list;
        })
        .catch(error => {
          let message = "";
          if (error.response != undefined) {
            message = error.response.data.error.message;
          } else {
            message = error;
          }
          this.$store.dispatch("ui_a_error", message);
        })
        .then(() => {});
    }
  },
  created() {}
};
</script>

<style>
.chipclosebtn {
  margin: 0;
  padding: 0;
  position: relative;
  left: 6px;
}
</style>
