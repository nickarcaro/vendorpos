import { Layout } from "antd";
import MenuTop from "../components/MenuTop";

//para crear cfunciones flecha (componentes), escribir rafce
const PosLayout = ({ children }) => {
  const { Header, Footer, Content } = Layout;

  return (
    <Layout>
      <Header>
        <MenuTop />
      </Header>
      <Content style={{ padding: "0 20px", marginTop: 40, minHeight: 280 }}>
        {children}
      </Content>
      <Footer />
    </Layout>
  );
};

export default PosLayout;

/* 
Layout antd: 

Layout {
Header ,
Content,
Footer

}

Layout.Header 
Layout.Content



*/
