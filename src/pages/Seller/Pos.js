import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import ListProducts from "../../components/ListProducts";
import SearchBar from "../../components/SearchBar";
import ListCart from "../../components/ListCart";
import { clearCart } from "../../components/ListCart/ListCart";
import { CartContext } from "../../context/CartContext";
import { RightCircleTwoTone } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import { getMeApi } from "../../api/user";
import { useHistory } from "react-router-dom";

const Pos = () => {
  const [cart, setCart] = useContext(CartContext);
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth, setUser, logout]);
  if (user === undefined) return null;
  if (!auth && !user) {
    history.replace("/");
    return null;
  }
  return (
    <>
      <Row gutter={16}>
        <Col span={16}>
          <ListProducts user={user}></ListProducts>
          {/* <div style={ {background: "#fff"}} >matriz de productos</div> */}
        </Col>
        {/* style={{background: "#fff"}} */}
        <Col span={8}>
          <Row gutter={[16, 16]}>
            {/* carrito */}
            <Col span={24} style={{}}>
              <Button onClick={() => clearCart(setCart)}>Clear Cart</Button>
              <ListCart></ListCart>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            {/* numpad y boton pago */}
            <Col span={24} style={{}}>
              <Button
                icon={<RightCircleTwoTone />}
                type="primary"
                shape="round"
                size="Large"
                style={{ float: "right" }}
                onClick={() => {
                  history.push("/pos/pago");
                }}
              >
                Pago
              </Button>
              
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Pos;
