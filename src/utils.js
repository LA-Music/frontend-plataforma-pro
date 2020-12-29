import { logout } from 'services/auth'

export const validToken = (res) => {
    if (res.data.message && (res.data.message === "Token is not valid" || res.data.message === 'Auth token is not supplied')) {
        logout()
        alert('Sessão expirada, efetue o login novamente')
        window.location.href = '/pro'
    }
    return true
    
}