import axios from 'axios';

export default {
    ui_a_clear_error: ({
        commit
    }) => {
        commit('ui_m_error', false);
    },
    ui_a_loading: ({
        commit
    }, payload) => {
        commit('ui_m_loading', payload);
    },
    ui_a_dark: ({
        commit
    }, payload) => {
        commit('ui_m_dark', payload);
    },
    ui_a_sucess({
        commit
    }, payload) {
        commit('ui_m_success', payload);
    },
    ui_a_error({
        commit
    }, payload) {
        commit('ui_m_error', payload);
    },
    ui_a_warning({
        commit
    }, payload) {
        commit('ui_m_warning', payload);
    },
    ui_a_info({
        commit
    }, payload) {
        commit('ui_m_info', payload);
    },
    ui_a_locationlist({
        commit
    }) {
        let URL = '/location';
        axios.get(URL)
            .then(response => {
                let locations = response.data.data;
                commit('ui_m_locationlist', locations);
            })
            .catch(error => {
                let message = '';
                if (error.response != undefined) {
                    message = error.response.data.error.message;
                    commit('ui_m_error', message);
                } else {
                    message = error;
                    commit('ui_m_warning', message);
                }
            })
            .then(() => {});


    }
};