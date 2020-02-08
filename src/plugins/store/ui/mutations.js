
export default {
    ui_m_loading: (state, payload) => {
        state.loading = payload;
    },
    ui_m_error: (state, payload) => {
        state.error = payload;
        state.ecolor = 'error';
    },
    ui_m_info: (state, payload) => {
        state.ecolor = 'info';
        state.error = payload;
    },
    ui_m_warning: (state, payload) => {
        state.ecolor = 'warning';
        state.error = payload;
    },
    ui_m_success: (state, payload) => {
        state.ecolor = 'success';
        state.error = payload;
    },
    ui_m_dark: (state, payload) => {
        state.dark = payload ? Boolean(payload) : !state.dark;
    },
    ui_m_locationlist: (state, payload) => {
        state.locationlist = payload;
    },
    ui_m_clearalldata: (state) => {
        delete state.user;
        delete state.users;
        delete state.brands;
        delete state.models;
        delete state.parts;
        delete state.subparts;
        delete state.allask;
        delete state.ask.brands;
        delete state.ask.models;
        delete state.ask.parts;
        delete state.ask.mparts;
        delete state.locationlist;
    }
};