import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { Menu, Row, Col, Avatar } from "antd";
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons"; //iconos
import { getMeApi } from "../../api/user"; //obtengo mis datos como usuario

const MenuTop = () => {
  //captar la url
  const [user, setUser] = useState(undefined);

  const { logout, auth, store, logoutStore } = useAuth();
  //obtengo mis datos
  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth, setUser, logout]);

  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item>
        <Link to="/">
          <div
            style={{
              width: "120px",
              height: "31px",

              align: "center",
            }}
          >
            <h3 style={{ color: "#fff" }}> Punto de Venta</h3>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={"/pos/cuenta"}>Mi Cuenta</Link>
      </Menu.Item>

      <Menu.Item>
        <Link to={"/pos/ventas"}>Ventas</Link>
      </Menu.Item>

      <Menu.Item onClick={logout}>salir</Menu.Item>
    </Menu>
  );
};

export default MenuTop;
