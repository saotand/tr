import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';

export default {
    state: {
        users: [],
        brands: [],
        models: [],
        parts: [],
        subparts: [],
        years: [], // Tentativo a usar [Sin Usar]
        levels: [{
            value: '0',
            text: 'Usuario'
        },
        {
            value: '1',
            text: 'Vendedor'
        },
        {
            value: '2',
            text: 'Mayorista'
        },
        {
            value: '3',
            text: 'Agente'
        },
        {
            value: '4',
            text: 'Supervisor'
        },
        {
            value: '5',
            text: 'Administrador'
        }
        ],
        docs: [{
            value: 'C',
            text: 'Cedula'
        },
        {
            value: 'R',
            text: 'R.I.F.'
        },
        {
            value: 'P',
            text: 'Pasaporte'
        }
        ],
        nacs: ['V', 'E', 'J', 'G'],
        masterID: '100000000000000000000000000001',
        allask: []
    },
    mutations,
    actions,
    getters
};