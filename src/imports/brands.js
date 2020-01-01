import Vue from 'vue';

import cmpBrandList from '@/components/modules/brands/list/brands_list';
import cmpBrandAdd from '@/components/modules/brands/dialogs/brand_add';
import cmpBrandEdit from '@/components/modules/brands/dialogs/brand_edit';
import cmpBrandDelete from '@/components/modules/brands/dialogs/brand_del';

Vue.component('app-brand-list', cmpBrandList);
Vue.component('app-brand-dialog-add', cmpBrandAdd);
Vue.component('app-brand-dialog-edit', cmpBrandEdit);
Vue.component('app-brand-dialog-delete', cmpBrandDelete);