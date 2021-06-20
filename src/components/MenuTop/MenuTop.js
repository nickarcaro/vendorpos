import { Menu } from "antd";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
const MenuTop = () => {
  const { logout } = useAuth();
  return (
    <Menu theme="dark" mode="horizontal" SelectedKeys={["2"]}>
      <Menu.Item key="1">
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
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3" onClick={logout}>
        salir
      </Menu.Item>
    </Menu>
  );
};

export default MenuTop;
