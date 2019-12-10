<template>
  <form @submit.prevent="onSignUp">
    <v-layout row>
      <v-flex xs12>
        <v-text-field
          name="name"
          label="Nombre"
          id="name"
          type="text"
          v-model="userdata.name"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          name="last"
          label="Apellido"
          id="last"
          type="text"
          v-model="userdata.last"
          required
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs5>
        <v-select
          v-model="userdata.doctype"
          :items="docs"
          :rules="[v => !!v || 'Coloca el tipo de documento']"
          label="Documento"
          required
          dark
          persistent-hint
        ></v-select>
      </v-flex>
      <v-flex xs1>
        <v-select
          v-model="userdata.nac"
          :items="nacs"
          :rules="[v => !!v || 'Coloca nacionalidad']"
          label
          required
          dark
          persistent-hint
        ></v-select>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          name="cedula"
          label="Cedula"
          id="cedula"
          type="text"
          v-model="userdata.doc"
          mask="########"
          required
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-text-field
          name="email"
          label="Correo electrónico"
          id="email"
          type="email"
          v-model="userdata.email"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          name="telefono"
          label="Teléfono"
          id="telefono"
          type="text"
          v-model="userdata.phone"
          required
          mask="(####) - ### ####"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-text-field
          name="password"
          label="Contraseña"
          id="password"
          type="password"
          v-model="userdata.password"
          required
          :rules="[minlength]"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          name="confirmpassword"
          label="Confirmar la Contraseña"
          id="confirmpassword"
          type="password"
          v-model="userdata.confirmpassword"
          :rules="[comparePasswords]"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 align-center>
        <center>
          <v-btn class="primary" type="submit" :disabled="loading" :loading="loading">
            Registrar
            <span slot="loader" class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </v-btn>
        </center>
      </v-flex>
    </v-layout>
  </form>
</template>
<script>
export default {
  data() {
    return {
      userdata: {
        name: "",
        last: "",
        doctype: "",
        nac: "",
        doc: "",
        email: "",
        password: "",
        confirmpassword: "",
        business: "P",
        phone: ""
      },
      docs: ["Cedula", "R.I.F.", "Pasaporte"],
      nacs: ["V", "E", "J", "G"]
    };
  },
  computed: {
    minlength() {
      return this.password.length < 6 ? "Minimo 6 caracteres" : false;
    },
    comparePasswords() {
      return this.userdata.password != this.userdata.confirmpassword
        ? "Las contraseñas deben ser iguales"
        : false;
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
<style>
</style>

