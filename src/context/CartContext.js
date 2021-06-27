import React, { useState, createContext, useEffect} from 'react'

export const CartContext = createContext();

export const CartProvider = (props) => {

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

