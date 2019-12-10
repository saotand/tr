import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";



export default {
  state: {
    basedir: "http://192.168.1.100/",
    menu: [
      [
        { icon: "fa-home", link: "/", title: "Inicio" },
        { icon: "fa-user", link: "/system", title: "USER" }
      ],
      [
        { icon: "fa-home", link: "/", title: "Inicio" },
        { icon: "account_box", link: "/signin", title: "Ingresa" },
        { icon: "assignment_turned_in", link: "/signup", title: "Registrate" }
      ]
    ],
    menulogin: [
      [ /* Usuario  */
        {
          title: "Resumen",
          icon: "fa-dashboard",
          link: { name: "resumen" }
        },
        {
          title: "Mis Preguntas",
          icon: "fa-comment",
          link: { name: "asked" }
        },
        {
          title: "Respuestas",
          icon: "question_answer",
          link: { name: "response" }
        },
        {
          title: "Perfil",
          icon: "face",
          link: { name: "profile" }
        },
        {
          title: "Directorio",
          icon: "fa-book",
          link: { name: "address" }
        }
      ],
      [ /* Vendedor */
        {
          title: "Resumen",
          icon: "fa-dashboard",
          link: { name: "resumen" }
        },
        {
          title: "Mis Preguntas",
          icon: "fa-comment",
          link: { name: "asked" }
        },
        {
          title: "Solicitudes",
          icon: "question_answer",
          link: { name: "response" }
        },
        {
          title: "Perfil",
          icon: "face",
          link: { name: "profile" }
        },
        {
          title: "Directorio",
          icon: "fa-book",
          link: { name: "address" }
        }

      ],
      [ /* Mayorista  */
        {
          title: "Resumen",
          icon: "fa-dashboard",
          link: { name: "resumen" }
        }
      ],
      [ /* Agente */
        {
          title: "Resumen",
          icon: "fa-dashboard",
          link: { name: "resumen" }
        }
      ],
      [ /* Supervisor  */
        {
          title: "Resumen",
          icon: "fa-dashboard",
          link: { name: "resumen" }
        }
      ],
      [ /* Administrador  */

        {
          title: "Resumen",
          icon: "fa-dashboard",
          link: { name: "resumen" }
        },

        {
          title: "Usuarios",
          icon: "fa-users",
          link: { name: "users" }
        },
        {
          title: "Mis Preguntas",
          icon: "fa-comment",
          link: { name: "asked" }
        },
        {
          title: "Preguntas",
          icon: "fa-comments",
          link: { name: "askedall" }
        },
        {
          title: "Marcas",
          icon: "fa-certificate",
          link: { name: "brands" }
        },
        {
          title: "Modelos",
          icon: "fa-car",
          link: { name: "models" }
        },

        {
          title: "Partes",
          icon: "extension",
          link: { name: "parts" }
        },
        {
          title: "Localizacion",
          icon: "fa-map",
          link: { name: "localz" }
        },
        { divider: true }
      ],
      [
        {
          title: "Cargando...",
          icon: "fa-clock-o",
          link: { name: "resumen" }
        }
      ]
    ],
    socialSites: [
      {
        link: "http://facebook.com/",
        icon: "fa-facebook-square",
        text: "Visitanos en Facebook",
        color: "blue darken-3"
      },
      {
        link: "http://twitter.com/",
        icon: "fa-twitter-square",
        text: "Visitanos en Twitter",
        color: "cyan darken-1"
      },
      {
        link: "http://instagram.com/",
        icon: "fa-instagram",
        text: "Visitanos en Instagram",
        color: "pink darken-1"
      }
    ],
    locationlist: [],
    dark: true,
    loading: false,
    ecolor: "error",
    error: false
  },
  mutations,
  actions,
  getters
};
