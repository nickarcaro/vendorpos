import React, { useState, useEffect, useContext } from "react";
import { List, Card } from 'antd';
import { getProducts } from '../../api/products';
import { CartContext } from '../../context/CartContext'

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

  const [cart, setCart] = useContext(CartContext)

  useEffect(() => {
    (async () => {
      const response = await getProducts();
      setProducts(response || []);
      setReloadProducts(false);
    })();
  }, [reloadProducts, setReloadProducts]);
  console.log(products)

  const addToCart = (product) => {
    console.log("antes: ", cart)
    const newProductList = cart.productList
    newProductList.push(product)
    setCart({...cart, productList: newProductList})
    console.log("despues: ", cart)
  }

  const clickProduct = (product) => {
    console.log(product.nombre, "!!")
    addToCart(product)
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
      renderItem={product => (
        <List.Item>
          <Card onClick={() => clickProduct(product)} title={product.nombre}>{product.precio_actual}</Card>
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
