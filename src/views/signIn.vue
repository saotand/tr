<template>
  <div>
    <v-container justify-center>
      <v-layout>
        <v-flex
          column
          xs12
          sm6
          offset-sm3
        >
          <app-panel noerror>
            <template slot="title">
              <v-icon left>fa-user</v-icon>Ingresa
            </template>
            <v-card-text>
              <form @submit.prevent="onSignUp">
                <v-layout column>
                  <v-flex xs12>
                    <v-text-field
                      prepend-icon="fa-envelope"
                      name="email"
                      label="Correo electrónico"
                      id="email"
                      type="email"
                      v-model="userdata.email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      prepend-icon="fa-lock"
                      name="password"
                      label="Contraseña"
                      id="password"
                      type="password"
                      v-model="userdata.pass"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex
                    xs12
                    align-center
                  >
                    <center>
                      <v-btn
                        class="primary"
                        type="submit"
                        :disabled="loading"
                        :loading="loading"
                      >
                        Registrar
                        <span
                          slot="loader"
                          class="custom-loader"
                        >
                          <v-icon light>cached</v-icon>
                        </span>
                      </v-btn>
                    </center>
                  </v-flex>
                </v-layout>
              </form>
            </v-card-text>
          </app-panel>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      userdata: {
        email: "admin@turepuesto.com",
        pass: "d0708aca."
      }
    };
  },
  computed: {
    user () {
      return this.$store.getters.user_g_user;
    },
    error () {
      return this.$store.getters.ui_g_error;
    },
    loading () {
      return this.$store.getters.ui_g_loading;
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push({ name: "resumen" });
      }
    }
  },
  methods: {
    onSignUp () {
      this.$store.dispatch("user_a_signin", this.userdata);
    },
    onDismissed () {
      this.$store.dispatch("ui_a_clear_error");
    }
  }
};
</script>