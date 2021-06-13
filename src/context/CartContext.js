import React, { useState, createContext} from 'react'

export const CartContext = createContext();

export const CartProvider = (props) => {

  const [cart, setCart] = useState(
    {
      productList: [],
      promotionList: [],
      discount: 0,
      payment: ""
    }
  )

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  )
}

