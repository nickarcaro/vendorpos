import React, { useState, useEffect, useContext } from "react";
import { List, Card, Button } from 'antd';
import { CartContext } from '../../context/CartContext'

export const clearCart = (setCart) => {
  console.log( "clearCart.. ")
  let cleanCart = {
    productList: [],
    promotionList: [],
    total: 0,
    discount: 0,
    payment: ""
  }
  setCart({...cleanCart})
}

const ListCart = () => {

  const [cart, setCart] = useContext(CartContext)


  return (
    <>
      <List
        style={{background: "#fff"}}
        footer={<div>Total: ${cart.total}</div>}
        bordered
        dataSource={cart.productList}
        renderItem={productObj => 
        <List.Item>
          <List.Item.Meta
            /*avatar={<Avatar src="/uploads/perro_729fefb8c4.png" />}*/
            title={productObj.productName}
            description={<div>{productObj.quantity} unidades a ${productObj.unitPrice}/unidad   </div>}
          />
            <div>${productObj.totalPrice}</div>
            {console.log(cart)}
        </List.Item>
        }
      />
      
    </>
  )
}

export default ListCart
