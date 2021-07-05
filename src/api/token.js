import { TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

/**
 * Conexion entre front end y back end para setear token en localstorage
 *
 */
//setear token em localstorage
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}


/**
 * Conexion entre front end y back end para obtener token de usuario
 *
 */

//obtener token de usuario
export function getToken() {
  return localStorage.getItem(TOKEN);
}

/**
 * Conexion entre front end y back end para eliminar token
 *
 */

//eliminar token
export function removeToken() {
  localStorage.removeItem(TOKEN);
}

/**
 * Conexion entre front end y back end para renovar token
 *
 */

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
