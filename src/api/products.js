import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
/*
export async function getProducts() {
  try {
    const url = `${BASE_PATH}/productos`;
    const result = await fetch(url);
    return result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
*/

/**
 * Conexion entre front end y back end para obtener productos
 * @param {String} idAlmacen ID del almacen
 * @param {Function} logout Funcion para cerrar sesion 
 * @returns Lista de productos
 */

export async function getProducts(idAlmacen, logout) {
  try {
    const url = `${BASE_PATH}/productos?almacen=${idAlmacen}`;
    const result = await authFetch(url, null, logout);
    if (result.statusCode === 500) throw Error("Error del servidor");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * Conexion entre front end y back end para actualizar Stock
 * @param {String} id ID del producto
 * @param {Array} data Reduccion del stock
 *
 */

export async function putProduct(id, data) {
  try {
    const url = `${BASE_PATH}/productos/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * Conexion entre front end y back end para reducir Stock
 * @param {Object} data Objeto salida de stock
 *  
 */

export async function postStockOut(data) {
  try {
    const url = `${BASE_PATH}/salida-stocks`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
