import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';

export default {
    state: {
        ask: {
            brands: [],
            models: [],
            years: [],
            parts: [],
            mparts: [],
            status: [
                'activo',
                'Pausado',
                'Eliminado',
                'Finalizado'
            ]
        },
        myask: [],
        responses: [],
    },
    mutations,
    actions,
    getters
};