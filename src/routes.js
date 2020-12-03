import Credito from "views/user/Credito"
import Contato from "views/user/Contato"
import ColetaFonomecanico from "views/user/ColetaFonomecanico"
import DireitoAutoral from "views/user/DireitoAutoral"
import TaxaAdministracao from "views/user/TaxaAdministracao"

var routes = [
  {
    path: "/credito-retido",
    name: "Crédito Retido",
    icon: "nc-icon nc-chart-bar-32",
    component: Credito,
    layout: "/"
  },
  {
    path: "/contato",
    name: "Contato",
    icon: "nc-icon nc-chart-bar-32",
    component: Contato,
    layout: "/"
  },
  {
    path: "/coleta-fenomecanico",
    name: "Fonomecânico",
    icon: "nc-icon nc-chart-bar-32",
    component: ColetaFonomecanico,
    layout: "/"
  },
  {
    path: "/direito-autoral",
    name: "Direito autoral",
    icon: "nc-icon nc-chart-bar-32",
    component: DireitoAutoral,
    layout: "/"
  },
  {
    path: "/taxa-administracao",
    name: "Taxa de administração",
    icon: "nc-icon nc-chart-bar-32",
    component: TaxaAdministracao,
    layout: "/"
  },

]
export default routes;
// export const routesUser = routes_user;

