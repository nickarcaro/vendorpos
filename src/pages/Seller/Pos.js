import React from 'react'
import { Row, Col, Space, Button } from 'antd';
import ListProducts from "../../components/ListProducts"
import SearchBar from "../../components/SearchBar"
import ListCart from "../../components/ListCart"

import { CartProvider } from "../../context/CartContext"


const Pos = () => {

  return (
    <>
      
        <SearchBar></SearchBar>
        <Row gutter={16}>
        <Col  span={16}>
          <ListProducts></ListProducts>
            {/* <div style={ {background: "#fff"}} >matriz de productos</div> */}
        </Col>
        {/* style={{background: "#fff"}} */}
        <Col  span={8} >
            <Row gutter={[16,16]}>
              {/* carrito */}
              <Col span={24} style={{}}>
                <ListCart></ListCart>
              </Col>
            </Row>
            <Row gutter={[16,16]}>
              {/* numpad y boton pago */}
              <Col span={24} style={{}}>
                numpad
                <Button onClick={() => {window.location.replace("/pos/pago")}}>Pago</Button>
              </Col>
            </Row>
        </Col>
        </Row>
     
    </>
  )
};

export default Pos;
