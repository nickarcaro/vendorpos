import { Row, Col, Space } from 'antd';
import ListProducts from "../../components/ListProducts"
import SearchBar from "../../components/SearchBar"

const Pos = () => {
  return (
    <>
      <SearchBar></SearchBar>
      <Row gutter={16}>
      <Col  span={16}>
        <ListProducts></ListProducts>
          {/* <div style={ {background: "#fff"}} >matriz de productos</div> */}
      </Col>
      <Col  span={8} style={{background: "#fff"}}>
          <div style={ {background: "#fff", minHeight: 500}} >carrito, calculadora y pago</div>
      </Col>
      </Row>
    </>
  )
};

export default Pos;
