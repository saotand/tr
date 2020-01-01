import Vue from 'vue';

import cmpSubPartList from '@/components/modules/subparts/list/subparts_list';
import cmpSubpartAdd from '@/components/modules/subparts/dialogs/subpart_add';
import cmpSubpartEdit from '@/components/modules/subparts/dialogs/subpart_edit';
import cmpSubpartDel from '@/components/modules/subparts/dialogs/subpart_del';

Vue.component('app-subparts-list', cmpSubPartList);
Vue.component('app-subparts-dialog-add', cmpSubpartAdd);
Vue.component('app-subparts-dialog-edit', cmpSubpartEdit);
Vue.component('app-subparts-dialog-del', cmpSubpartDel);