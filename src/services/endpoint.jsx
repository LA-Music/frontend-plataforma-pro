import api from './api'
import { LOGIN, REGISTER, PASSWORD_RESET, RESET_TOKEN } from './links'

export const Login = async (payload) => {
  try {
    return await api.post( LOGIN, {...payload } )
  } catch(error) { console.log(error) }
}

export const register = async (payload) => {
  try {
    return await api.post( REGISTER, {...payload } )
  } catch(error) { console.log(error) }
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
