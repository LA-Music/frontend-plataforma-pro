import api from 'services/api'
import { getEmail } from 'services/auth'

import { notify as notifyComp } from 'components/Notify'

export const initial_state = {
    nome: "",
    email: getEmail(),
    cpf:"",
    telefone:"",
    nome_artistico:[],
    associacao:"",
    error: "",
    lista_musicas: [],
    redes_sociais: [],
    termos: false,
    newsletter: false,
    acept_contact: false,
    loading: false,
}

export const initial_musica = ''
export const initial_sociais = ''
export const initial_nome_artistico = ''

export function removeMusic(e, state, setState){
    console.log(state)
    let index = state.lista_musicas.indexOf(`${e}`);
        index !== -1 && state.lista_musicas.splice(index,1);
        setState({...state, lista_musicas: state.lista_musicas})
}
      
export function removeSociais(e, state, setState){
    console.log(state)
    let index = state.redes_sociais.indexOf(`${e}`);
    index !== -1 && state.redes_sociais.splice(index,1);
    setState({...state, redes_sociais: state.redes_sociais})
}

export function removeArtista(e, state, setState){
    let index = state.nome_artistico.indexOf(`${e}`);
    index !== -1 && state.nome_artistico.splice(index,1);
    setState({...state, nome_artistico: state.nome_artistico})
}

export function notify (place, message, color, notificationAlert) {
    notificationAlert.current.notificationAlert(notifyComp(place, message, color));
}

export async function handleSubmit (e, state, setMusicas, setSociais, setState, notificationAlert) {
    e.preventDefault();
   
    setState({...state, loading: true})

    if (!state.nome) {
        notify("tc", "Preencha nome e e-mail para continuar", 3, notificationAlert)
        setState({...state, error: "Preencha nome para continuar!", loading: false });
    } else {
      try {
          await api.post("/credito-retido", {
              ...state
          }).then(r => {
            if (r.data.msg === 'ok'){
              notify("tc", `Consulta realizada com sucesso`, 2, notificationAlert)

              setState(initial_state);
              setMusicas(initial_musica)
              setSociais(initial_sociais)
            }})
          .catch((error) => {
            if(error.response && error.response.status === 400) {
              notify("tc", error.response.data.creditomessage || error, 3, notificationAlert)
            }else {
              notify("tc", error.response.data.message || error, 3, notificationAlert)
            }
            setState({...state, loading: false})
          })
      } catch (err) {
        notify("tc", "Houve um problema com o envio, verifique os campos.", 3, notificationAlert)
        setState({...state, loading: false})
      }
    }
}

export function enableSubmit(e) {
    return e.termos && e.acept_contact ? false : true
}