import { createContext } from "react";

const ExampleContext = createContext({
  nombre: "undefined", // valor del usuario ya logueado (token)
});

export default ExampleContext;
