/* eslint-disable */

import axios from "axios";
import jwt from "jsonwebtoken";

// Salt Token
const dctr = "Cpvz13A1otc";

export default {
  user_a_signin: ({ commit }, payload) => {
    commit("ui_m_loading", true);
    commit("ui_m_error", false);
    let URL = "/login?format=json";
    let userdata = {
      email: payload.email,
      pass: payload.pass
    };
    axios
      .post(URL, userdata)
      .then((response) => {
        // Token sin alterar
        let rawtoken = response.data.data.token;
        // Guardadmos como variable de session el token 
        sessionStorage.setItem("token", rawtoken);
        // Desencriptamos el token para guardarlo en memoria de session del browser
        let tokentmp = jwt.verify(rawtoken, dctr);
        // Seleccionamos solo los datos del usuario para la sesion
        let userOnToken = tokentmp.data;
        // Guardamos la sesion del usuario en el sistema
        commit("user_m_set_user", userOnToken);
        commit("ui_m_success", "Bienvenido!");
      })
      .catch(function (error) {
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
  user_a_signup: ({ commit }, payload) => {
    commit("ui_m_loading", true);
    commit("ui_m_error", false);
    let userdata = {
      email: payload.email,
      pass: payload.pass,
      doc: payload.doc,
      doctype: payload.doctype,
      nac: payload.nac,
      name: payload.name,
      last: payload.last,
      level: payload.level,
      phone: payload.phone,
      birth: payload.birth,
      image: payload.image,
      seller: {
        name: payload.seller.name,
        image: payload.seller.image,
        rif: payload.seller.rif,
        nac: payload.seller.nac,
        phone: payload.seller.phone,
        city: payload.seller.city,
        address: payload.seller.address
      },
      //created: payload.created,
      //active: payload.active,
      //verified: "0",
      profile: payload.profile
    };
    axios
      .post("/user/new?format=json", userdata)
      .then(function (response) {
        // const token = response.data.data.token;
        commit("ui_m_success", "Usuario Registrado");
      })
      .catch(function (error) {
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
  user_a_signout: ({ commit }) => {
    commit("ui_m_loading", true);
    commit("ui_m_error", false);
    const Token = sessionStorage.getItem("token");
    const options = { headers: { "Authorization": Token } };
    const URL = '/logout';
    if (Token) {
      axios.post(URL, null, options)
        .then(response => {
          sessionStorage.removeItem("token");
          commit("user_m_clear_user");
          commit("ui_m_clearalldata");
        })
        .catch(error => {
          commit("user_m_clear_user");
          sessionStorage.removeItem("token");
        })
        .then(() => {
          commit("ui_m_loading", false);
        })
    } else {

    }
  },
  user_a_autosignin: ({ commit }) => {
    const Token = sessionStorage.getItem("token");
    const options = { headers: { "Authorization": Token } };
    if (Token) {
      commit("ui_m_loading", true);
      commit("ui_m_error", false);
      axios
        .post('/autoload?format=json', null, options)
        .then(response => {
          let user = response.data.data.autocargado
          if (user) {
            // Desencriptamos el token para guardarlo en memoria de session del browser
            let tokentmp = jwt.verify(Token, dctr);
            if (tokentmp) {
              let user = tokentmp.data;
              commit("user_m_set_user", user);
            }
          } else {
            sessionStorage.removeItem('token');
          }
        })
        .catch(error => {
          sessionStorage.removeItem('token');
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
        })
    }
  },
  user_a_setprofile: ({ commit }, payload) => {

    alert(payload);
    /*
    const Token = sessionStorage.getItem("token");
    const options = { headers: { "Authorization": Token } };
    const URL = '/autoload?format=json';
    if (Token) {
      commit('ui_m_loading', true);
      axios
        .post(URL, payload, options)
        .then(response => {
          let profile = response.data.data.profile
          if (profile) {
            // Mutacion ara actualizar el perfil en vivo
          }

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
        })
    }
*/
  }
};
