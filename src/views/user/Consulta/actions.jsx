import api from 'services/api'
import { validToken, ErrorSystem } from 'utils'

import { notify as notifyComp } from 'components/Notify'

export const initial_state = {
    nome: "",
    email: "",
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

function checkArtista(state, nomeArtistico) {

  let nome_artistico = state.nome_artistico

  let filter =  state.nome_artistico.filter( name => name.indexOf(nomeArtistico) !== -1)

      filter.length === 0 && nome_artistico.push(nomeArtistico)

  return nome_artistico
}

function checkMusic(state, musicas) {

  let lista_musicas = state.lista_musicas

  let filter = state.lista_musicas.filter( name => name.indexOf(musicas) !== -1)

      filter.length === 0 && lista_musicas.push(musicas)

   return lista_musicas
}

function checkRedeSocial(state, sociais) {

  let redes_sociais = state.redes_sociais

  let filter = state.redes_sociais.filter( name => name.indexOf(sociais) !== -1)

      filter.length === 0 && redes_sociais.push(sociais)

   return redes_sociais
}

export async function handleSubmit (e, setNomeArtistico, state, nomeArtistico, musicas, sociais, association, setMusicas, setSociais, setState, notificationAlert, setModalSucess) {
    e.preventDefault();
    
    await setState({
      ...state,
      loading: true,
      nome_artistico: checkArtista(state, nomeArtistico),
      lista_musicas: checkMusic(state, musicas),
      redes_sociais: checkRedeSocial(state, sociais),
    })

    if (!state.nome) {
        notify("tc", "Preencha nome e e-mail para continuar", 3, notificationAlert)
        setState({...state, error: "Preencha nome para continuar!", loading: false });
    } else {

      try {
          await api.post("/credito-retido", {
              ...state
          })
          .then(async r => {
            
            if(!r) {
              ErrorSystem()
             
              return false
            }

            await validToken(r)

            if (r.data.message === 'OK'){

              await setModalSucess(true)

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