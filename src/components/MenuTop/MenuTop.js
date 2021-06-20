import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Menu } from "antd";
const MenuTop = () => {
  const { logout } = useAuth();
  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="/">
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
      <Menu.Item key="/pos/cuenta">
        <Link to={"/pos/cuenta"}>Mi Cuenta</Link>
      </Menu.Item>

      <Menu.Item key="/pos/ventas">
        <Link to={"/pos/ventas"}>Ventas</Link>
      </Menu.Item>

      <Menu.Item key="logout" onClick={logout}>
        salir
      </Menu.Item>
    </Menu>
  );
};

export default MenuTop;
