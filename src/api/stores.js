import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

/**
 * Conexion entre front end y back end para agregar un nuevo detalle de venta
 * @param {String} userId ID del usuario
 * @param {Function} logout Funcion para cerrar sesion 
 * @returns Lista de tiendas 
 */

export async function getStores(userId, logout) {
  try {
    const url = `${BASE_PATH}/almacenes?user=${userId}`;
    const result = await authFetch(url, null, logout);
    if (result.statusCode === 500) throw Error("Error del servidor");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}



export async function putUserStore(idUser, data, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}