import Cookies from 'js-cookie';

const TokenKey = 'admin_token';

export const getToken = () => Cookies.get(TokenKey);

export const setToken = (token: string) => Cookies.set(TokenKey, `Bearer ${token}`,{expires:1});

export const removeToken = () => Cookies.remove(TokenKey);
