import React, {useState, useEffect, useContext} from 'react'
import {CartContext }from '../../context/CartContext'
import { clearCart } from '../ListCart'
import { postSale, postSaleDetail} from '../../api/sales'
import { Button } from 'antd';

const createSale = async (cart, setCart, setResponse) => {
  const sale = {
    almacen: 1,
    total: cart.total
  }
  console.log(cart.productList)
  const createdSale = await postSale(sale)
  let response = createdSale
  setResponse(response)
  for (const prodObj of cart.productList) {
    const saleDetail = {
      producto: prodObj.productId,
      venta: createdSale.id,
      cantidad: prodObj.quantity,
      precio_unitario: prodObj.unitPrice,
      precio_total: prodObj.totalPrice
    }
    response = await postSaleDetail(saleDetail) // ver como postear el arreglo de una
  }
  setResponse(response)

}

const ConfirmSale = () => {

  const [cart, setCart] = useContext(CartContext)
  const [response, setResponse] = useState([])

  return (
    <>
      <Button onClick={() => createSale(cart, setCart, setResponse)}>createSale</Button>
      <Button onClick={() => {console.log(response)}}>logResponse</Button>
    </>
  )

}

export default ConfirmSale
