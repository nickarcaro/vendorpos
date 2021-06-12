import { useContext } from "react";
import ExampleContext from "../context/ExampleContext";

const useExample = () => useContext(ExampleContext);

export default useExample;

//cracion de hook que utiliza el contexto global del usuario
