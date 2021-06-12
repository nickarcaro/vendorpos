import React, { useState, useEffect } from "react";
import useExample from "../../hooks/useHook";
const Sells = () => {
  const [suma, setSuma] = useState(0);
  const { nombre } = useExample();

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    document.title = `You clicked ${suma} times ${nombre}`;
  });
  return (
    <div>
      <p>You clicked {suma} times</p>
      <button onClick={() => setSuma(suma + 1)}>Click me</button>
    </div>
  );
};

export default Sells;
