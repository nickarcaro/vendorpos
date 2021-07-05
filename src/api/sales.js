import { BASE_PATH } from "../utils/constants";
//import { authFetch } from "../utils/fetch";

/**
 * Conexion entre front end y back end para agregar una nueva venta
 * @param {Objeto} data Objeto de venta
 * 
 */

export async function postSale(data) {
  try {
    const url = `${BASE_PATH}/ventas`;
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

/**
 * Conexion entre front end y back end para agregar un nuevo detalle de venta
 * @param {Objeto} data Objeto de detalle de venta 
 *
 */

export async function postSaleDetail(data) {
  try {
    const url = `${BASE_PATH}/detalle-ventas`;
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
