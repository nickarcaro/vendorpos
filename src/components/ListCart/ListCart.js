import React, { useContext } from "react";
import { List, Divider, Row, Col } from "antd";
import { CartContext } from "../../context/CartContext";

export const clearCart = (setCart) => {
  console.log("clearCart.. ");
  let cleanCart = {
    productList: [],
    promotionList: [],
    idsNotInPromotion: [],
    total: 0,
    discount: 0,
    payment: "",
  };
  setCart({ ...cleanCart });
};

const getPromotionDiscount = (promotion) => {
  let totalOriginal = 0
  for (const prodProm of promotion.productos_promocion){
    totalOriginal += prodProm.producto.precio_actual * prodProm.cantidad
  }
  return totalOriginal - promotion.precio_promocion
}

const getTotal = (cart) => {
  let total = cart.total
  for (const prom of cart.promotionList) {
    total -= getPromotionDiscount(prom)
  }
  return total
}

const ListCart = () => {
  const [cart, setCart] = useContext(CartContext);

  return (
    <>
      <Row >
        <Col span={24} style={{}}>
          <List
            style={{ background: "#fff" }}
            // footer={<div>Sub-Total: ${cart.total}</div>}
            footer={
              <Row>
                <Col span={12}>
                  {
                    cart.promotionList.length > 0 ?
                    <h3>Sub-Total</h3> :
                    <h3>Total</h3>
                  }
                </Col>
                <Col span={12}>
                  <h3 style={{ float: "right" }}>${cart.total}</h3>
                </Col>
              </Row>
            }
            bordered
            dataSource={cart.productList}
            renderItem={(productObj) => (
              <List.Item>
                <List.Item.Meta
                  /*avatar={<Avatar src="/uploads/perro_729fefb8c4.png" />}*/
                  title={productObj.productName}
                  description={
                    <div>
                      {productObj.quantity} unidades a ${productObj.unitPrice}
                      /unidad{" "}
                    </div>
                  }
                />
                <div>${productObj.totalPrice}</div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      {/* <Divider orientation="center">Promociones</Divider> */}
      <Row >
        <Col span={24} style={{}}>
          { 
            cart.promotionList.length > 0 ? 
            <List
              style={{ background: "#fff" }}
              // footer={<div>Total: ${cart.total}</div>}
              footer={
                <Row>
                  <Col span={12}><h3>Total</h3></Col>
                  <Col span={12}>
                    <h3 style={{ float: "right" }}>${getTotal(cart)}</h3>
                  </Col>
                </Row>
              }
              bordered
              dataSource={cart.promotionList}
              renderItem={(promotion) => (
                <List.Item>
                  <List.Item.Meta
                    /*avatar={<Avatar src="/uploads/perro_729fefb8c4.png" />}*/
                    title={promotion.nombre}
                    description={
                      <div>
                        Valor: ${promotion.precio_promocion}
                      </div>
                    }
                  />
                  <div>Descuento: ${getPromotionDiscount(promotion)}</div>
                </List.Item>
              )}
            />
            : null
          }
        </Col>
      </Row>
    </>
  );
};

export default ListCart;
