import React from 'react'
import { Row, Col, Space } from 'antd';
import ListProducts from "../../components/ListProducts"
import SearchBar from "../../components/SearchBar"
import ListCart from "../../components/ListCart"

import { CartProvider } from "../../context/CartContext"


const Pos = () => {

  return (
    <>
      <CartProvider>
        <SearchBar></SearchBar>
        <Row gutter={16}>
        <Col  span={16}>
          <ListProducts></ListProducts>
            {/* <div style={ {background: "#fff"}} >matriz de productos</div> */}
        </Col>
        <Col  span={8} style={{background: "#fff"}}>
            <div style={ {background: "#fff"}} >carrito, calculadora y pago</div>
            <ListCart></ListCart>
        </Col>
        </Row>
      </CartProvider>
    </>
  )
};

export default Pos;
