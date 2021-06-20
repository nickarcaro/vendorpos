import React, { useState, useEffect, useContext } from "react";
import { List, Card, Button } from 'antd';
import { getProducts } from '../../api/products';
import { CartContext } from '../../context/CartContext'


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

  // useEffect(() => {
  //   const data = localStorage.getItem("POS-Almacenes-Cart")
  //   if (data) {
  //     setCart(JSON.parse(data))
  //   }
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem("POS-Almacenes-Cart", JSON.stringify(cart))
  // },[cart]);

  const addToCart = (product) => {
    console.log("addToCart.. ")

    const newProductList = cart.productList

    let isInCart = false

    for (const prod of newProductList) {
      if (prod.productId === product.id) {
        isInCart = true
        prod.quantity += 1
        prod.totalPrice += prod.unitPrice
        break
      }
    }
    if (isInCart === false) {
      const productObject = {
        productId : product.id,
        productName : product.nombre,
        quantity : 1,
        unitPrice : product.precio_actual,
        totalPrice : product.precio_actual,
        productData : product
      }
      newProductList.push(productObject)
    }
    const cartTotal = cart.total + product.precio_actual;
    setCart({...cart, productList: newProductList, total: cartTotal})
    console.log("despues: ", cart)
  }


  const clickProduct = (product) => {
    console.log(product.nombre, "!!")
    addToCart(product)
  }

  return (
    <>
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
            <Card onClick={() => clickProduct(product)} title={product.nombre}>
              ${product.precio_actual}, {product.stock_actual} unidades en stock
            </Card>
          </List.Item>
        )}
      />
    </>
    // <Card title="Default size card" style={{ width: 300 }}>
    //   <p>Card content</p>
    //   <p>Card content</p>
    //   <p>Card content</p>
    // </Card>
  );
};

export default ListProducts;
