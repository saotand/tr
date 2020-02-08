import Vue from 'vue';
import App from '@/App';
import VueMomentLib from 'vue-moment-lib';
import axios from '@/plugins/axios';
import router from '@/plugins/router/router';
import store from '@/plugins/store';
import '@/plugins/registerServiceWorker';
import './imports';

Vue.use(VueMomentLib);

// Estado de desarollo
Vue.config.productionTip = true;

new Vue({
    router,
    store,
    axios,
    render: h => h(App),
    mounted () {
        this.$store.dispatch('ui_a_locationlist');
        this.$store.dispatch('user_a_autosignin');

    }
}).$mount('#app');