export default {
    ask_m_ask: (state, payload) => {
        state.myask = payload;
    },
    /* FORM MUTATIONS FOR ASK COMPONENT */
    ask_m_years: (state) => {
        const year_s = new Date().getFullYear() - 100;
        const year_e = new Date().getFullYear();
        let i = year_s;
        for (; i < year_e + 2; i++) {
            state.ask.years.push(i.toString());
        }
        state.ask.years.reverse();
    },
    /*
    ask_m_selask: (state, ask) => {
        alert('updateask');
    },*/
    ask_m_brands: (state, payload) => {
        state.ask.brands = payload;
    },
    ask_m_models: (state, payload) => {
        state.ask.models = payload;
    },
    ask_m_parts: (state, payload) => {
        state.ask.parts = payload;
    },
    ask_m_mparts: (state, payload) => {
        state.ask.mparts = payload;
    },
    ask_m_responses: (state, payload) => {
        state.responses = payload;
    }
};