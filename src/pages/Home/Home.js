import LoginForm from "../../components/LoginForm";

import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { Layout, Row, Col } from "antd";
const Home = () => {
  const { auth } = useAuth();
  const history = useHistory();
  const { Content } = Layout;

  if (auth) {
    history.push("/pos");
    return null;
  }
  return (
    <Content>
      <Row
        justify="center"
        align="middle"
        style={{ marginTop: 150, textAlign: "center" }}
      >
        <Col lg={24}>
          <h1>Iniciar sesión vendedores</h1>
        </Col>

        <LoginForm />
      </Row>
    </Content>
  );
};

export default Home;
