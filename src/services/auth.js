import Cookies from 'js-cookie';


export const TOKEN_KEY   = "lamusic-Token";
export const TOKEN_PAPEL = "lamusic-Papel";
export const EMAIL_KEY   = "lamusic-email";
export const NAME_KEY    = "lamusic-name";

export const isAuthenticated =  () => {
  getToken()
  return Cookies.get(TOKEN_KEY) ? true : false;
}

export const getToken = () => Cookies.get(TOKEN_KEY);
export const getEmail = () => Cookies.get(EMAIL_KEY);
export const getName  = () => Cookies.get(NAME_KEY);

export const login = (token, email, nome) => {
  Cookies.set(TOKEN_KEY, token)
  Cookies.set(EMAIL_KEY, email)
  Cookies.set(NAME_KEY, nome)
};

export const logout = () => {
  Cookies.remove(TOKEN_KEY)
  Cookies.remove(TOKEN_PAPEL)
  Cookies.remove(EMAIL_KEY)
  Cookies.remove(NAME_KEY)
};
