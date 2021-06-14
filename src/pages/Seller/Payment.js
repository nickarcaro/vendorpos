import React from "react";
import { Row, Col, Divider} from 'antd';
import {CreditCardFilled } from "@ant-design/icons"
import {DollarCircleFilled } from "@ant-design/icons"
import {BankFilled} from "@ant-design/icons"
import { List, Avatar } from 'antd';

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
const style = { background: '#ffffff', padding: '8px 0' };



const Payment = () => {
  return(
    <div>
      <>
      <Row gutter={16}>
      <Col className="gutter-row" span={10}>
      <Divider >Productos</Divider>
  <List 
    itemLayout="horizontal"
    
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={item.title}
          description=<div>{item.cantidad} unidades a ${item.cantidad}/unidad   </div>
        />
         <div>{item.value}</div>
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
