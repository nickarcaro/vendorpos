import { BASE_PATH } from "../utils/constants";

export async function getProducts() {
  try {
    const url = `${BASE_PATH}/productos`;
    const result = await fetch(url)
    return result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}