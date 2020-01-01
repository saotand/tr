export default {
    ask_g_asks: (state) => {
        return state.myask;
    },
    ask_g_ask: (state) => {
        return ((askID) => {
            return state.myask.find((mask) => {
                return mask.ID === askID;
            });
        });
    },
    /* FORM GETTERS FOR ASK COMPONENT */
    ask_g_years: (state) => {
        return state.ask.years;
    },
    ask_g_brands: (state) => {
        return state.ask.brands;
    },
    ask_g_models: (state) => {
        return state.ask.models;
    },
    ask_g_parts: (state) => {
        return state.ask.parts;
    },
    ask_g_mparts: (state) => {
        return state.ask.mparts;
    },
    ask_g_responses: (state) => {
        return state.responses;
    }
};