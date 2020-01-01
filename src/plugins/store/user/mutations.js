export default {
    user_m_set_user: (state, payload) => {
        state.user = payload;
    },
    user_m_clear_user: state => {
        state.user = null;
    }
};