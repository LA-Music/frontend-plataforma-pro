import Credito from "views/user/Credito"
import Contato from "views/user/Contato"
import ColetaFonomecanico from "views/user/ColetaFonomecanico"
import DireitoAutoral from "views/user/DireitoAutoral"
import TaxaAdministracao from "views/user/TaxaAdministracao"
import Perfil from "views/user/Perfil"

var routes = [
  {
    path: "/credito-retido",
    name: "Crédito Retido",
    icon: "fa fa-money",
    component: Credito,
    layout: "/"
  },
  {
    path: "/coleta-fenomecanico",
    name: "Fonomecânico",
    icon: "fa fa-bullhorn",
    component: ColetaFonomecanico,
    layout: "/"
  },
  {
    path: "/direito-autoral",
    name: "Consultoria",
    icon: "fa fa-graduation-cap",
    component: DireitoAutoral,
    layout: "/"
  },
  {
    path: "/taxa-administracao",
    name: "Administração autoral",
    icon: "fa fa-microphone",
    component: TaxaAdministracao,
    layout: "/"
  },
  {
    path: "/perfil",
    name: "Perfil",
    icon: "nc-icon nc-chart-bar-32",
    component: Perfil,
    layout: "/",
    hiddeSideNav: true
  },
  {
    path: "/contato",
    name: "Contato",
    icon: "fa fa-envelope-o",
    component: Contato,
    layout: "/"
  }

]
export default routes;
// export const routesUser = routes_user;

