/* eslint-disable */

export default {
    /* users */
    admin_m_set_users(state, payload) {
        state.users = payload
    },
    admin_m_clear_users(state) {
        state.users = [];
    },
    admin_m_add_users(state, userdata) {
        state.users.push(userdata);
    },
    admin_m_edit_users(state, payload) {
        state.users.find((user, index) => {
            if (user) {
                if (user.ID == payload.ID) {
                    state.users[index].ID = payload.ID;
                    state.users[index].email = payload.email;
                    state.users[index].name = payload.name;
                    state.users[index].last = payload.last;
                    state.users[index].doc = payload.doc;
                    state.users[index].nac = payload.nac;
                    state.users[index].birth = payload.birth;
                    state.users[index].doctype = payload.doctype;
                    state.users[index].phone = payload.phone;
                    state.users[index].level = payload.level;
                }
            }
        })
    },
    admin_m_del_users(state, userID) {
        state.users.find((user, index) => {
            if (user) {
                if (user.ID == userID) {
                    state.users.splice(index, 1);
                }
            }
        })
    },
    /* brands */
    admin_m_set_brands(state, payload) {
        state.brands = payload;
    },
    admin_m_clear_brands(state) {
        state.brands = [];
    },
    admin_m_add_brands(state, payload) {
        state.brands.push(payload);
    },
    admin_m_edit_brands(state, payload) {
        state.brands.find((brand, index) => {
            if (brand) {
                if (brand.ID == payload.ID) {
                    state.brands[index].ID = payload.ID;
                    state.brands[index].name = payload.name;
                    state.brands[index].image = payload.image;
                    state.brands[index].count = payload.count;
                    state.brands[index].active = payload.active
                }
            }
        })
    },
    admin_m_del_brands(state, payload) {
        state.brands.find((brand, index) => {
            if (brand) {
                if (brand.ID == payload) {
                    state.brands.splice(index, 1);
                }
            }
        })
    },
    /* Models */
    admin_m_set_models(state, payload) {
        state.models = payload;
    },
    admin_m_clear_models(state) {
        state.models = [];
    },
    admin_m_add_models(state, payload) {
        state.models.push(payload);
    },
    admin_m_edit_models(state, payload) {
        state.models.find((model, index) => {
            if (model) {
                if (model.ID == payload.ID) {
                    state.models[index].ID = payload.ID;
                    state.models[index].name = payload.name;
                    state.models[index].image = payload.image;
                    state.models[index].count = payload.count;
                    state.models[index].brandID = payload.brandID;
                    state.models[index].created = payload.created;
                    state.models[index].active = payload.active;
                }
            }
        })
    },
    admin_m_del_models(state, payload) {
        state.models.find((model, index) => {
            if (model) {
                if (model.ID == payload) {
                    state.models.splice(index, 1);
                }
            }
        })
    },
    /* parts */
    admin_m_set_parts(state, payload) {
        state.parts = payload
    },
    admin_m_clear_parts(state) {
        state.parts = [];
    },
    admin_m_add_parts(state, payload) {
        state.parts.push(payload);
    },
    admin_m_edit_parts(state, payload) {
        state.parts.find((part, index) => {
            if (part) {
                if (part.ID == payload.ID) {
                    state.parts[index].ID = payload.ID;
                    state.parts[index].name = payload.name;
                    state.parts[index].image = payload.image;
                    state.parts[index].classID = payload.classID;
                    state.parts[index].count = payload.count;
                    state.parts[index].active = payload.active;
                }
            }
        });
    },
    admin_m_del_parts(state, payload) {
        state.parts.find((part, index) => {
            if (part) {
                if (part.ID == payload) {
                    state.parts.splice(index, 1);
                }
            }
        });
    },
    /* Sub Parts */
    admin_m_set_subparts(state, payload) {
        state.subparts = payload;
    },
    admin_m_clear_subparts(state) {
        state.subparts = [];
    },
    admin_m_add_subparts(state, payload) {
        state.subparts.push(payload);
    },
    admin_m_edit_subparts: (state, payload) => {
        state.subparts.find((subpart, index) => {
            if (subpart) {
                if (subpart.ID == payload.ID) {
                    state.subparts[index].ID = payload.ID;
                    state.subparts[index].name = payload.name;
                    state.subparts[index].count = payload.count;
                    state.subparts[index].active = payload.active;
                }
            }
        });
    },
    admin_m_del_subparts: (state, payload) => {
        state.subparts.find((subpart, index) => {
            if (subpart) {
                if (subpart.ID == payload) {
                    state.subparts.splice(index, 1);
                }
            }
        });
    },
    /* Ask */
    admin_m_set_ask: (state, payload) => {
        state.allask = payload;
    }
}