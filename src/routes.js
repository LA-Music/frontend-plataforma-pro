import Credito from "views/user/Credito"
import Contato from "views/user/Contato"

var routes = [
  // {
  //   path: "/gestao-repositorio",
  //   name: "Gestão do Repositório",
  //   icon: "nc-icon nc-chart-bar-32",
  //   component: GestaoRepo,
  //   layout: "/pro"
  // },
  {
    path: "/credito-retido",
    name: "Crédito Retido",
    icon: "nc-icon nc-chart-bar-32",
    component: Credito,
    layout: "/"
  },
  // {
  //   path: "/marca",
  //   name: "Marcas",
  //   icon: "nc-icon nc-chart-bar-32",
  //   component: MarcaForm,
  //   layout: "/user"
  // },
  // {
  //   path: "/musica",
  //   name: "Musicas",
  //   icon: "nc-icon nc-chart-bar-32",
  //   component: MusicaForm,
  //   layout: "/user"
  // },
  {
    path: "/contato",
    name: "Contato",
    icon: "nc-icon nc-chart-bar-32",
    component: Contato,
    layout: "/"
  }
]
export default routes;
// export const routesUser = routes_user;

