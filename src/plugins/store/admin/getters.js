/* eslint-disable */

export default {
    admin_g_users: state => {
        return state.users;
    },
    admin_g_user: state => {
        return ((userID) => {
            return state.users.find((user) => {
                return user.ID === userID;
            });
        });
    },
    admin_g_masterid: state => {
        return state.masterID;
    },
    admin_g_levels: state => {
        return state.levels;
    },
    admin_g_docs: state => {
        return state.docs;
    },
    admin_g_nacs: state => {
        return state.nacs;
    },
    admin_g_brands: state => {
        return state.brands;
    },
    admin_g_brand: state => {
        return ((brandID) => {
            return state.brands.find((brand) => {
                return brand.ID === brandID;
            });
        });
    },
    admin_g_models: state => {
        return state.models;
    },
    admin_g_model: state => {
        return ((modelID) => {
            return state.models.find((model) => {
                return model.ID === modelID;
            });
        });
    },
    admin_g_parts: state => {
        return state.parts;
    },
    admin_g_part: state => {
        return ((partID) => {
            return state.parts.find((part) => {
                return part.ID === partID;
            });
        });
    },
    admin_g_subparts: state => {
        return state.subparts;
    },
    admin_g_subpart: state => {
        return ((subpartID) => {
            return state.subparts.find((subpart) => {
                return subpart.ID === subpartID;
            });
        });
    },
    admin_g_allask: state => {
        return state.allask;
    }
};