import api from './api'
import { PERFIL, LOGIN, REGISTER, PASSWORD_RESET, RESET_TOKEN, CONTRATAR, CREDITO_RETIDO, CONTATO } from './links'

export const Login = async (payload) => {
  return await api.post( LOGIN, {...payload } )
}

export const register = async (payload) => {
  return await api.post( REGISTER, {...payload } )
}

export const reset_password = async (payload) => {
  try {
    return await api.post( PASSWORD_RESET, { ...payload } )
  } catch (error) {console.error(error)}
}

export const reset_token = async (payload) => {
  if (payload.senha) {
    try {
      return await api.post( RESET_TOKEN.replace(':token', payload.token), {...payload } )
    } catch (error) { console.error(error) }

  } else {
    try {
      return await api.get( RESET_TOKEN.replace(':token', payload.token) )
    } catch (error) { console.error(error) }
  }
}

export const contratar = {
  register: async function (payload) {
    try {
      return await api.post(CONTRATAR, { ...payload })
    } catch (error) {
      console.error(error)
    }
  }
}

export const credito_retido = {
  find: async function () {
    try {
      return await api.get(CREDITO_RETIDO)
    } catch (error) {
      console.error(error)
    }
  }
}

export const perfil = {
  find: async function () {
    try {
      return await api.get(PERFIL)
    } catch (error) {
      console.error(error)
    }
  },

  update: async function (payload) {
    console.log(payload)
    try {
      return await api.post(PERFIL, {...payload})
      
    } catch (error) {
      console.error(error)
    }
  }
}

export const contato = {
  register: async function (payload) {
    try {
      return await api.post(CONTATO, {...payload})
    } catch (error) {
      console.error(error)
      return error
    }
  }
}