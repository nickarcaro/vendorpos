import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function getCategories(idAlmacen, logout) {
  try {
    const url = `${BASE_PATH}/categoria-simples?almacen=${idAlmacen}`;
    const result = await authFetch(url, null, logout);
    if (result.statusCode === 500) throw Error("Error del servidor");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
