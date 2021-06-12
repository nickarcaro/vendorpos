import { createContext } from "react";

const AuthContext = createContext({
  auth: undefined, // valor del usuario ya logueado (token)
  login: () => null, //funcion de login
  logout: () => null, //funcion de logout
  setReloadUser: () => null, //funcion de recarga de usuario logueado
});

export default AuthContext;

//contexto global del usuario que se autentica en el sistema
