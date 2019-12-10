<template>
  <v-app :dark="darkset" id="inspire">
    <app-menu :menuitems="mainMenu"></app-menu>
    <v-content :class="darkset?'bgcontainerdark':'bgcontainer'">
      <router-view></router-view>
    </v-content>
    <app-footer></app-footer>
    <v-snackbar
      auto-height
      right
      bottom
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      <v-container style="padding:0;margin:0;">
        <v-layout>
          <v-flex xs11>
            <h2>{{ error }}</h2>
          </v-flex>
          <v-flex xs1>
            <v-btn icon @click="snackbar = false" @input="closesnack">
              <v-icon>fa-times</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    timeout: 10000,
    mode: "vertical",
    snackbar: false,
    dialog: false,
    drawer: false
  }),
  computed: {
    error() {
      return this.$store.getters.ui_g_error;
    },
    color() {
      return this.$store.getters.ui_g_ecolor;
    },
    user() {
      return this.$store.getters.user_g_user;
    },
    menu() {
      return this.$store.getters.ui_g_menu;
    },
    mainMenu() {
      let u = this.user ? 0 : 1;
      return this.menu[u];
    },
    darkset() {
      return this.$store.getters.ui_g_dark;
    }
  },
  watch: {
    error(val) {
      if (val) {
        this.snackbar = true;
      } else {
        this.snackbar = false;
      }
    }
  },
  methods: {
    closesnack() {
      alert("close");
    }
  }
};
</script>


<style>
.dialog-btn {
  display: inline-block;
  margin: 0;
  padding: 0;
}

img {
  vertical-align: middle;
}

.img-responsive,
.thumbnail > img,
.thumbnail a > img,
.carousel-inner > .item > img,
.carousel-inner > .item > a > img {
  display: block;
  max-width: 100%;
  height: auto;
  background-position: center center;
}
.img-rounded {
  border-radius: 6px;
}
.img-thumbnail {
  display: inline-block;
  max-width: 100%;
  height: auto;
  padding: 4px;
  line-height: 1.42857143;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.img-circle {
  border-radius: 50%;
}

.bgcontainer {
  background-image: url("./assets/bg_partners.png");
  background-repeat: repeat-x;
  background-size: contain;
  background-attachment: fixed;
}

.bgcontainerdark {
  background-image: url("./assets/bg_partners_dark.png");
  background-repeat: repeat-x;
  background-size: contain;
  background-attachment: fixed;
}

#inspire {
  overflow: hidden;
}

.text-white {
  color: white !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.iconbar {
  padding-top: 10px;
  max-width: 300px;
  max-height: 60px;
}

.v-btn--active {
  background-color: #ce0000;
  color: white !important;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.wrapper {
  margin: 0;
  padding: 0;
  border: 1px solid #000;
  height: 95%;
  width: 100%;
  z-index: 1;
}

.nomargin {
  margin: 0;
  padding: 0;
}
</style>


