<template>
  <app-panel dark noerror>
    <template slot="title">
      <v-icon left>{{form.icon}}</v-icon>
      {{form.title}}
    </template>
    <template slot="button">
      <v-btn icon>
        <v-icon>fa-edit</v-icon>
      </v-btn>
    </template>
    <v-card-text>
      <form @submit.prevent="onsubmit">
        <img v-if="image" :src="image">
        <app-file-upload :name="fileimput" color="primary" accept="image/*" @base64="get64encode"></app-file-upload>
        <v-text-field v-model="text"></v-text-field>
        <v-btn color="primary" type="submit">Enviar</v-btn>
      </form>
      <code>{{image}}</code>
    </v-card-text>
  </app-panel>
</template>

<script>
/* eslint-disable */
import Axios from "axios";
export default {
  data: () => ({
    form: {
      title: "Directorio",
      icon: "fa-book"
    },
    image: "",
    fileimput: "file",
    text: "Mensaje"
  }),
  methods: {
    onsubmit() {
      let url = "upload";
      let msg = { _image: this.image, text: this.text };
      Axios.post(url, msg)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        })
        .then(() => {
          console.log("done");
        });
    },
    getfile(event) {
      if (event) {
        let image = event.target.files[0];
        this.image = image;
        console.log(event.target.files);
      }
    },
    get64encode(base64) {
      this.image = base64;
    }
  },
  updated() {
    console.log("updated address");
  }
};
</script>

<style>
</style>
