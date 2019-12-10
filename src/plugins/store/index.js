import Vue from "vue";
import Vuex from "vuex";
import ui from "./ui/state";
import user from "./user/state";
import ask from "./ask/state";
import admin from "./admin/state";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { ui, user, ask, admin }
});
