/* eslint-disable */
import axios from "axios";


export default {
    ask_a_selectresponse ({ commit }, payload) {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        const URL = 'ask/sel/' + payload;
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .post(URL, null, options)
                .then(() => { })
                .catch(error => {
                    let message = '';
                    if (error.response != undefined) {
                        message = error.response.data.error.message;
                        commit("ui_m_error", message);
                    } else {
                        message = error;
                        commit("ui_m_warning", message);
                    }
                })
                .then(() => {
                    commit("ui_m_loading", false);
                });
        }
    },
    ask_a_create: ({ commit }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        const URL = 'ask/add';
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .post(URL, payload, options)
                .then(response => {
                    commit("ui_m_success", "Pregunta Enviada");
                }).catch(error => {
                    let message = '';
                    if (error.response != undefined) {
                        message = error.response.data.error.message;
                        commit("ui_m_error", message);
                    } else {
                        message = error;
                        commit("ui_m_warning", message);
                    }
                })
                .then(function () {
                    commit("ui_m_loading", false);
                });
        }
    },
    ask_a_myasks: ({ commit }) => {
        commit("ui_m_loading", true);

        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        const URL = 'ask';
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios.get(URL, options)
                .then(response => {
                    //alert('go');
                    const data = response.data.data;
                    commit("ask_m_ask", data);
                    //commit("ui_m_success", "Pregunta Enviada");
                }).catch(error => {
                    let message = '';
                    if (error.response != undefined) {
                        message = error.response.data.error.message;
                        commit("ui_m_error", message);
                    } else {
                        message = error;
                        commit("ui_m_warning", message);
                    }
                })
                .then(function () {
                    commit("ui_m_loading", false);
                });
        }

    },
    /* FORM ACTIONS FOR ASK COMPONENT */
    ask_a_years: ({ commit }) => {
        commit("ask_m_years");
    },
    ask_a_brands: ({ commit }) => {
        const url = "car/brands";
        commit("ui_m_loading", true);
        commit("ui_m_error", false);
        axios
            .get(url)
            .then(response => {
                const brands = response.data.data;
                let selectBrands = [];
                brands.forEach(x => {
                    selectBrands.push({
                        text: x.name,
                        value: x.ID
                    });
                });
                commit("ask_m_brands", selectBrands);
            })
            .catch(error => {
                let message = '';
                if (error.response != undefined) {
                    message = error.response.data.error.message;
                    commit("ui_m_error", message);
                } else {
                    message = error;
                    commit("ui_m_warning", message);
                }
            })
            .then(function () {
                commit("ui_m_loading", false);
            });
    },
    ask_a_models: ({ commit }, payload) => {
        const url = "/car/models/brand/" + payload;
        commit("ui_m_loading", true);
        commit("ui_m_error", false);
        axios
            .get(url)
            .then(response => {
                const models = response.data.data;
                let selectModels = [];
                models.forEach(x => {
                    selectModels.push({
                        text: x.name,
                        value: x.ID
                    });
                });
                commit("ask_m_models", selectModels);
            })
            .catch(error => {
                let message = '';
                if (error.response != undefined) {
                    message = error.response.data.error.message;
                    commit("ui_m_error", message);
                } else {
                    message = error;
                    commit("ui_m_warning", message);
                }
                //commit("ui_m_error", message);
            })
            .then(function () {
                commit("ui_m_loading", false);
            });
    },
    ask_a_parts: ({ commit }) => {
        const url = "car/parts";
        commit("ui_m_loading", true);
        commit("ui_m_error", false);
        axios
            .get(url)
            .then(response => {
                const parts = response.data.data;
                commit("ask_m_parts", parts);
            })
            .catch(error => {
                let message = '';
                if (error.response != undefined) {
                    message = error.response.data.error.message;
                    commit("ui_m_error", message);
                } else {
                    message = error;
                    commit("ui_m_warning", message);
                }
                //commit("ui_m_error", message);
            })
            .then(function () {
                commit("ui_m_loading", false);
            });
    },
    ask_a_mparts: ({ commit }) => {
        commit("ui_m_loading", true);
        commit("ui_m_error", false);
        const url = "car/mparts";
        axios
            .get(url)
            .then(response => {
                const mparts = response.data.data;
                commit("ask_m_mparts", mparts);
            })
            .catch(error => {
                let message = '';
                if (error.response != undefined) {
                    message = error.response.data.error.message;
                    commit("ui_m_error", message);
                } else {
                    message = error;
                    commit("ui_m_warning", message);
                }
                //commit("ui_m_error", message);
            })
            .then(function () {
                commit("ui_m_loading", false);
            });
    },
    ask_a_setresponses: ({ commit }) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                "Authorization": Token
            }
        };
        const URL = '/ask?format=json';
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios.post(URL, null, options)
                .then(response => {
                    let profile = response.data.data;
                    commit("ask_m_responses", profile);
                })
                .catch(error => {
                    let message = '';
                    if (error.response != undefined) {
                        message = error.response.data.error.message;
                        commit("ui_m_error", "La session ha expirado");
                    } else {
                        message = error;
                        commit("ui_m_warning", message);
                    }
                }).then(() => {
                    commit('ui_m_loading', false);
                });
        }
    },
    ask_a_saveresponseto: ({ commit }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                "Authorization": Token
            }
        };
        const ID = payload.requestID;
        const URL = '/response/add/' + ID + "?format=json";
        if (Token) {
            commit("ui_m_loading", true);
            axios
                .post(URL, payload, options)
                .then((response) => {
                    let message = response.data.message;
                    commit("ui_m_success", message);
                })
                .catch((error) => {
                    let message = '';
                    if (error.response != undefined) {
                        message = error.response.data.error.code + ' - ' + error.response.data.error.message;
                        commit("ui_m_error", message);
                    } else {
                        message = error;
                        commit("ui_m_warning", message);
                    }
                    commit("ui_m_loading", false);
                })
                .then(() => {
                    commit("ui_m_loading", false);
                });
        }
    },
    ask_a_deleteresponseto: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                "Authorization": Token
            }
        };
        const ID = payload.ID;
        const URL = '/response/remove/' + ID + '?format=json';
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios.post(URL, null, options)
                .then((response) => {
                    let message = response.data.message;
                    commit("ui_m_success", message);
                })
                .catch(error => {
                    let message = '';
                    if (error.response != undefined) {
                        message = error.response.data.error.code + ' - ' + error.response.data.error.message;
                        commit("ui_m_error", message);
                    } else {
                        message = error;
                        commit("ui_m_warning", message);
                    }
                })
                .then(() => {
                    commit("ui_m_loading", false);
                });
        }
    }
};