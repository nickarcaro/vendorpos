import React, {useState, useContext, useEffect} from "react";
import { Row, Col, Divider} from 'antd';
import {CreditCardFilled } from "@ant-design/icons"
import {DollarCircleFilled } from "@ant-design/icons"
import {BankFilled} from "@ant-design/icons"
import { List, Avatar, Button, Checkbox  } from 'antd';
import { CartContext } from "../../context/CartContext";
import {LeftCircleTwoTone} from "@ant-design/icons"

/*style de padding solo afecta los gutterrow 2 y 3 */
const style = {padding: '31px 0'};
const style2 = {float: 'right'};

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
      <Row gutter={100}>
      <Col className="gutter-row" span={11}>
      <Button icon = {<LeftCircleTwoTone />} type="primary" shape="round" size = "Large" onClick={() => {window.location.replace("/pos")}} >Volver</Button>
      <Divider >Productos</Divider>
  <List 
    itemLayout="horizontal"
    footer={<Row>
      <Col span={12}>Total</Col>
      <Col span={12} ><div style = {style2}>{cart.total}</div></Col>
    </Row>}
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
  />

      </Col>
      
      <Col className="gutter-row" span={5}>
        <div style={style}>
        <Divider >Medio de pago</Divider>
        <div style={style}><h3> <DollarCircleFilled /> Efectivo</h3></div>       
        <div style={style}><h3> <CreditCardFilled /> Credito </h3></div>
        <div style={style}><h3><BankFilled /> Debito </h3></div>
        </div>
      </Col>
      <Col className="gutter-row" span={4}>
        <div style={style}>col-6 
        
        </div>
      </Col>
    </Row>
      </>
    </div>
  );
};

export default Payment;
