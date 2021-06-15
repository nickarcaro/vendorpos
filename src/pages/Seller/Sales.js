import React, { useState, useEffect } from "react";
const Sales = () => {
  const [suma, setSuma] = useState(0);

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    document.title = `You clicked ${suma} times`;
  });
  return (
    <div>
      <p>You clicked {suma} times</p>
      <button onClick={() => setSuma(suma + 1)}>Click me</button>
    </div>
  );
};

export default Sales;
