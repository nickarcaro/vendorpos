import React, {useState, useContext, useEffect} from "react";
import { Row, Col, Divider} from 'antd';
import {CreditCardFilled } from "@ant-design/icons"
import {DollarCircleFilled } from "@ant-design/icons"
import {BankFilled} from "@ant-design/icons"
import { List, Avatar } from 'antd';
import { CartContext } from "../../context/CartContext";
const data = [
  {
    title: 'Queso',
    value: 2500,
    cantidad: 4,
  },
  {
    title: 'Jamon',
    value: 3000,
    cantidad: 2,
  },
  {
    title: 'Salmon',
    value: 4500,
    cantidad: 3,
  },
  {
    title: 'Cucarachas',
    value: 4000,
    cantidad: 5,
  },
];


const style = {padding: '8px 0' };



const Payment = () => {
  const [cart, setCart] = useContext(CartContext)
  useEffect(() => {
    const data = localStorage.getItem("POS-Almacenes-Cart")
    if (data) {
      setCart(JSON.parse(data))
    }
  }, [])
  return(
    <div>
      <>
      <Row gutter={16}>
      <Col className="gutter-row" span={10}>
      <Divider >Productos</Divider>
  <List 
    itemLayout="horizontal"
    
    dataSource={cart.productList}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          /*avatar={<Avatar src="/uploads/perro_729fefb8c4.png" />}*/
          title={item.productName}
          description={<div>{item.quantity} unidades a ${item.unitPrice}/unidad   </div>}
        />
         <div>{item.totalPrice}</div>
         {console.log(cart)}
      </List.Item>
    )}
  />,

      </Col>
      <Col className="gutter-row" span={7}>
        <div style={style}>
        <Divider >Medio de pago</Divider>
        <div style={style}><h3> <DollarCircleFilled /> Efectivo</h3></div>       
        <div style={style}><h3> <CreditCardFilled /> Credito </h3></div>
        <div style={style}><h3><BankFilled /> Debito </h3></div>
        </div>
      </Col>
      <Col className="gutter-row" span={5}>
        <div style={style}>col-6 
        
        </div>
      </Col>
    </Row>
      </>,
    </div>
  );
};

export default Payment;
