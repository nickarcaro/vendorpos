import React, {useState, useEffect, useContext} from 'react'
import {CartContext }from '../../context/CartContext'
import { postSale, postSaleDetail} from '../../api/sales'
import { Button } from 'antd';
import { RightCircleTwoTone } from "@ant-design/icons"

export const createSale = async (cart, setCart) => {
  const sale = {
    almacen: 1,
    total: cart.total
  }
  console.log(cart.productList)
  const createdSale = await postSale(sale)
  // let response = createdSale
  // setResponse(response)
  for (const prodObj of cart.productList) {
    const saleDetail = {
      producto: prodObj.productId,
      venta: createdSale.id,
      cantidad: prodObj.quantity,
      precio_unitario: prodObj.unitPrice,
      precio_total: prodObj.totalPrice
    }
    await postSaleDetail(saleDetail) // ver como postear el arreglo de una
  }
  // setResponse(response)
  window.location.replace("/pos/voucher") 
}

const ConfirmSale = () => {

  const [cart, setCart] = useContext(CartContext)
  const [response, setResponse] = useState([])

  return (
    <>
      <Button icon={< RightCircleTwoTone />} type="primary" shape="round" size="Large" style = {{float:"right"}} 
        onClick={()=>createSale(cart, setCart)}
      >
        Confirmar
      </Button>
      {/* <Button onClick={() => {console.log(response)}}>logResponse</Button> */}
    </>
  )

}

export default ConfirmSale
