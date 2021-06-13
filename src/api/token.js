import { TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

//setear token em localstorage
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

//obtener token de usuario
export function getToken() {
  return localStorage.getItem(TOKEN);
}

//eliminar token
export function removeToken() {
  localStorage.removeItem(TOKEN);
}

//renovar token
export function hasExpiredToken(token) {
  const tokenDecode = jwtDecode(token);
  const expireDate = tokenDecode.exp * 1000;
  const currentDate = new Date().getTime();
  if (currentDate > expireDate) {
    return true;
  }
  return false;
}
