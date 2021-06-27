import React, {useState, useEffect, useContext} from 'react'
import {CartContext }from '../../context/CartContext'
import { postSale, postSaleDetail} from '../../api/sales'
import { Button, Row, Col } from 'antd';
import { LeftCircleTwoTone } from "@ant-design/icons"
import { clearCart } from "../../components/ListCart/ListCart"
import ListCart from '../../components/ListCart';
import { useHistory } from "react-router-dom";

const newSale = async (setCart, history) => {
  await clearCart(setCart)
  history.push("/pos")
}

const Voucher = () => {
  const [cart, setCart] = useContext(CartContext)
  const history = useHistory()

  return (
    <>
    <Row gutter={[16,16]}>
      <Col span={24} style={{}}>
        <Button icon={< LeftCircleTwoTone />} type="primary" shape="round" size="Large" style = {{float:"left"}} 
          onClick={()=>newSale(setCart, history)}
        >
          Nueva Venta
        </Button>
      </Col>
    </Row>
    <Row gutter={[16,16]}>
      <Col span={10} style={{}}>
        <ListCart></ListCart>
      </Col>
    </Row>
</>
  );
};

export default Voucher;
