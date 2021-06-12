import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;

//cracion de hook que utiliza el contexto global del usuario
