/* eslint-disable */

import axios from "axios";

export default {
    admin_a_set_users: ({
        commit
    }) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let url = "/users?format=json";
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .get(url, options)
                .then((response) => {
                    let userlist = response.data.data;
                    commit("admin_m_set_users", userlist);
                })
                .catch((error) => {
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
    admin_a_clear_users: ({
        commit
    }) => {
        commit('admin_m_clear_users');
    },
    admin_a_add_users: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let url = "/user/add?format=json";
        let useradd = {
            email: payload.email,
            name: payload.name,
            last: payload.last,
            doc: payload.doc,
            doctype: payload.doctype,
            nac: payload.nac,
            phone: payload.phone,
            level: payload.level,
            birth: payload.birth,
            pass: payload.password,
            image: payload.image
        };
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .post(url, useradd, options)
                .then(response => {
                    let useradded = response.data.data;
                    console.log(useradded);
                    commit('admin_m_add_users', useradded);
                    commit('ui_m_success', "Usuario guardado");
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
        }
    },
    admin_a_edit_users: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        commit('ui_m_loading', true);
        let ID = payload.ID;
        let url = '/user/edit/' + ID + '?format=json';
        let useredit = {
            image: payload.image,
            email: payload.email,
            name: payload.name,
            last: payload.last,
            doc: payload.doc,
            doctype: payload.doctype,
            nac: payload.nac,
            phone: payload.phone,
            level: payload.level,
            birth: payload.birth,
            pass: payload.password
        };
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .post(url, useredit, options)
                .then(response => {
                    let useredited = response.data.data;
                    commit('admin_m_edit_users', useredited);
                    commit('ui_m_success', "Usuario Editado");

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
        }
    },
    admin_a_del_users: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        commit('ui_m_loading', true);
        let ID = payload;
        let url = '/user/del/' + ID + '?format=json';
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios.post(url, null, options)
                .then(response => {
                    let userdeleted = response.data.data;
                    commit('admin_m_del_users', ID);
                    commit('ui_m_success', "Usuario eliminado");

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
        }
    },
    /* brands */
    admin_a_set_brands: ({
        commit
    }) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        commit("ui_m_loading", true);
        let url = "car/brands/all?format=json";
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .get(url, options)
                .then((response) => {
                    let loadedbrands = response.data.data;
                    commit("admin_m_set_brands", loadedbrands);
                })
                .catch((error) => {
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
        }
    },
    admin_a_add_brands: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let url = '/car/brands/add?format=json';
        let newbrand = {
            name: payload.name,
            image: payload.image,
            count: payload.count,
            active: payload.active
        };
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .post(url, newbrand, options)
                .then(response => {
                    let brandadded = response.data.data;
                    commit('admin_m_add_brands', brandadded);
                    commit('ui_m_success', "Marca guardada");
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
        }
    },
    admin_a_edit_brands: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let ID = payload.ID;
        let url = '/car/brands/edit/' + ID + '?format=json';
        let editbrand = {
            name: payload.name,
            image: payload.image,
            count: payload.count,
            active: payload.active
        };
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .post(url, editbrand, options)
                .then(response => {
                    let brandedited = response.data.data;
                    commit('admin_m_edit_brands', brandedited);
                    commit('ui_m_success', "Marca editada");
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
        }
    },
    admin_a_del_brands: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let ID = payload;
        let url = '/car/brands/del/' + ID + '?format=json';
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .post(url, null, options)
                .then(response => {
                    let branddeleted = response.data.data.delete;
                    commit('admin_m_del_brands', branddeleted);
                    commit('ui_m_success', "Marca eliminada");
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
        }
    },
    /* Models */
    admin_a_set_models: ({
        commit
    }) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let url = "/car/models/all?format=json";
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios.get(url, options)
                .then((response) => {
                    let loadedmodels = response.data.data;
                    commit("admin_m_set_models", loadedmodels);
                })
                .catch((error) => {
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
        }
    },
    admin_a_add_model: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let url = '/car/models/add?format=json';
        let addmodel = {
            name: payload.name,
            image: payload.image,
            brandID: payload.brandID,
            count: payload.count,
            active: payload.active
        };
        commit("ui_m_loading", true);
        commit("ui_m_error", false);
        if (Token) {
            axios
                .post(url, addmodel, options)
                .then(response => {
                    let modeladded = response.data.data;
                    commit('admin_m_add_models', modeladded);
                    commit('ui_m_success', "Modelo guardado");

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
        }
    },
    admin_a_edit_model: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let ID = payload.ID;
        let url = '/car/models/edit/' + ID + '?format=json';
        let editmodel = {
            ID: payload.ID,
            name: payload.name,
            image: payload.image,
            count: payload.count,
            brandID: payload.brandID,
            created: payload.created,
            active: payload.active
        };
        commit("ui_m_loading", true);
        commit("ui_m_error", false);
        if (Token) {
            axios
                .post(url, editmodel, options)
                .then(response => {
                    let modeledited = response.data.data;
                    commit('admin_m_edit_models', modeledited);
                    commit('ui_m_success', "Modelo editado");

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
        }
    },
    admin_a_del_model: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let ID = payload;
        let url = '/car/models/del/' + ID + '?format=json';
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .post(url, null, options)
                .then(response => {
                    let modeldeleted = response.data.data.delete;
                    commit('admin_m_del_models', modeldeleted);
                    commit('ui_m_success', "Modelo eliminado");

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
        }
    },
    /* Parts */
    admin_a_set_parts: ({
        commit
    }) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let url = "/car/parts/all?format=json";
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios.get(url, options)
                .then((response) => {
                    let loadedparts = response.data.data;
                    commit("admin_m_set_parts", loadedparts);
                })
                .catch((error) => {
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
        }
    },
    admin_a_add_parts: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let url = '/car/parts/add?format=json';
        let addpart = {
            name: payload.name,
            image: payload.image,
            classID: payload.classID,
            count: payload.count,
            active: payload.active
        };
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .post(url, addpart, options)
                .then(response => {
                    let partadded = response.data.data;
                    commit('admin_m_add_parts', partadded);
                    commit('ui_m_success', "Parte guardada");

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
        }
    },
    admin_a_edit_parts: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let ID = payload.ID;
        let url = '/car/parts/edit/' + ID + '?format=json';
        let editpart = {
            ID: payload.ID,
            name: payload.name,
            image: payload.image,
            classID: payload.classID,
            count: payload.count,
            active: payload.active
        };
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .post(url, editpart, options)
                .then(response => {
                    let parteditted = response.data.data;
                    commit('admin_m_edit_parts', parteditted);
                    commit('ui_m_success', "Parte editada");
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
        }
    },
    admin_a_del_parts: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let ID = payload;
        let url = '/car/parts/del/' + ID + '?format=json';
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .post(url, null, options)
                .then(response => {
                    let partdeleted = response.data.data.delete;
                    commit('admin_m_del_parts', partdeleted);
                    commit('ui_m_success', "Parte eliminada");
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
        }
    },
    /* Sub Parts */
    admin_a_set_subparts: ({
        commit
    }) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let url = "/car/subparts/all?format=json";
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios.get(url, options)
                .then((response) => {
                    let loadedsubparts = response.data.data;
                    commit("admin_m_set_subparts", loadedsubparts);
                })
                .catch((error) => {
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
        }
    },
    admin_a_add_subparts: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let url = "/car/subparts/add?format=json";
        let addsubpart = {
            name: payload.name,
            active: payload.active
        };
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios.post(url, addsubpart, options)
                .then(response => {
                    let addedsubpart = response.data.data;
                    commit('admin_m_add_subparts', addedsubpart);
                    commit('ui_m_success', "SubParte guardada");

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
                .then(commit("ui_m_loading", false));
        }
    },
    admin_a_edit_subparts: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let ID = payload.ID;
        let url = 'car/subparts/edit/' + ID + '?format=json';
        let editsubpart = {
            ID: payload.ID,
            name: payload.name,
            count: payload.count,
            active: payload.active
        };
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios.post(url, editsubpart, options)
                .then(response => {
                    let subparteditted = response.data.data;
                    commit('admin_m_edit_subparts', subparteditted);
                    commit('ui_m_success', "SubParte editada");
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
                .then(() => {
                    commit("ui_m_loading", false);
                });
        }
    },
    admin_a_del_subparts: ({
        commit
    }, payload) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let ID = payload;
        let url = 'car/subparts/del/' + ID + '?format=json';
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .post(url, null, options)
                .then(response => {
                    let subpartdeleted = response.data.data.delete;
                    commit('admin_m_del_subparts', subpartdeleted);
                    commit('ui_m_success', "SubParte eliminada");
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
        }
    },
    admin_a_set_allask: ({
        commit
    }) => {
        const Token = sessionStorage.getItem("token");
        const options = {
            headers: {
                'Authorization': Token
            }
        };
        let url = 'ask/all?format=json';
        if (Token) {
            commit("ui_m_loading", true);
            commit("ui_m_error", false);
            axios
                .get(url, options)
                .then(response => {
                    let askall = response.data.data;
                    commit('admin_m_set_ask', askall);
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
        }
    }
};