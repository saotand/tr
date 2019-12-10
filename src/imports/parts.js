import Vue from "vue";

import cmpPartsList from "@/components/modules/parts/list/part_list";
import cmpParsAdd from "@/components/modules/parts/dialogs/part_add";
import cmpPartEdit from "@/components/modules/parts/dialogs/part_edit";
import cmpPartDel from "@/components/modules/parts/dialogs/part_del";

Vue.component("app-parts-list", cmpPartsList);
Vue.component("app-parts-dialog-add", cmpParsAdd);
Vue.component("app-part-dialog-edit", cmpPartEdit);
Vue.component("app-part-dialog-del", cmpPartDel);