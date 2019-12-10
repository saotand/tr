import Vue from "vue"

import cmpModelList from "@/components/modules/models/list/models_list";
import cmpModelAdd from "@/components/modules/models/dialogs/model_add";
import cmpModelEdit from "@/components/modules/models/dialogs/model_edit";
import cmpModelDel from "@/components/modules/models/dialogs/model_del";

Vue.component("app-models-list", cmpModelList);
Vue.component("app-model-dialog-add", cmpModelAdd);
Vue.component("app-model-dialog-edit", cmpModelEdit);
Vue.component("app-model-dialog-del", cmpModelDel);