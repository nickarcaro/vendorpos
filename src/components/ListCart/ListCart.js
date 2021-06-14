import React, { useState, useEffect, useContext } from "react";
import { List, Card, Button } from 'antd';
import { CartContext } from '../../context/CartContext'

const ListCart = () => {

  const [cart, setCart] = useContext(CartContext)

  const clearCart = () => {
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

  return (
    <>
      <Button onClick={()=> clearCart()}>Clear Cart</Button>
      <List
        size="large"
        footer={<div>Total: </div>}
        bordered
        dataSource={cart.productList}
        renderItem={productObj => <List.Item>{productObj.productName} {productObj.quantity} {productObj.totalPrice}</List.Item>}
      />
      
    </>
  )
}

export default ListCart
