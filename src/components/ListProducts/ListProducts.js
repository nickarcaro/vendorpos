import React, { useState, useEffect } from "react";
import { List, Card } from 'antd';
import { getProducts } from '../../api/products';

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
  {
    title: 'Title 7',
  },
  {
    title: 'Title 8',
  },
  {
    title: 'Title 9',
  },
];


const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [reloadProducts, setReloadProducts] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getProducts();
      setProducts(response || []);
      setReloadProducts(false);
    })();
  }, [reloadProducts, setReloadProducts]);
  console.log(products)

  const clickProduct = (nombre) => {
    console.log(nombre)
  }

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 6,
      }} // cantidad de calumnas por tamaño de pantalla
      dataSource={products}
      renderItem={item => (
        <List.Item>
          <Card onClick={() => clickProduct(item.nombre)} title={item.nombre}>{item.precio_actual}</Card>
        </List.Item>
      )}
    />

    // <Card title="Default size card" style={{ width: 300 }}>
    //   <p>Card content</p>
    //   <p>Card content</p>
    //   <p>Card content</p>
    // </Card>
  );
};

export default ListProducts;
