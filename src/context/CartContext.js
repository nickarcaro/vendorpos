import React, { useState, createContext, useEffect} from 'react'

export const CartContext = createContext();

export const CartProvider = (props) => {

  /**
   * Objeto del carrito
   * @typedef {Object} Cart
   * @property {ProductObject[]} productList - Lista de productos en carrito
   * @property {JSON[]} promotionList - Lista de promociones recibidas del back-end
   * @property {number[]} idsNotInPromotion - Lista de ids de productos que no forman parte de una promocion asignada. Entradas con repeticion (si hay 3 del mismo producto, su id estara 3 veces en el arreglo)
   * @property {number} total - Monto total en carrito
   * @property {number} discount - Valor de descuento
   * @property {string} payment - Medio de pago seleccionado
   */

  const [cart, setCart] = useState(
    {
      productList: [],
      promotionList: [],
      idsNotInPromotion: [],
      total: 0,
      discount: 0,
      payment: ""
    }
  )
  useEffect(() => {
    const data = localStorage.getItem("POS-Almacenes-Cart")
    if (data) {
      setCart(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("POS-Almacenes-Cart", JSON.stringify(cart))
  },[cart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  )
}

