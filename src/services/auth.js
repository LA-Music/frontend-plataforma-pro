import Cookies from 'js-cookie';

export const TOKEN_KEY = "lamusic-Token";
export const EMAIL_KEY = "lamusic-email";

export const isAuthenticated = () => Cookies.get(TOKEN_KEY) !== null;

export const getToken = () => Cookies.get(TOKEN_KEY);
export const getEmail = () => Cookies.get(EMAIL_KEY);

export const login = (token, email) => {
  Cookies.set(TOKEN_KEY, token)
  Cookies.set(EMAIL_KEY, email)
};

export const logout = () => {
  Cookies.remove(TOKEN_KEY)
  Cookies.remove(EMAIL_KEY)
};
