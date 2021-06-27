import React, { useState, useEffect, useContext } from "react";
import { List, Card } from "antd";
import { getProducts } from "../../api/products";
import { CartContext } from "../../context/CartContext";
import useAuth from "../../hooks/useAuth";
import SearchBar from "../../components/SearchBar";

const ListProducts = ({ user, promotions }) => {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [reloadProducts, setReloadProducts] = useState(false);
  const [filterText, setFilterText] = useState("")

  const [cart, setCart] = useContext(CartContext);

  useEffect(() => {
    (async () => {
      const response = await getProducts(user.almacen, logout);
      setProducts(response || []);
      setReloadProducts(false);
    })();
  }, [reloadProducts, setReloadProducts, user.almacen, logout]);

  const checkPromotions = (product, newIdsNotInPromotion) => {
    for (const prom of promotions) {
      if (prom.productos_promocion.some(item => item.producto.id === product.id)) { //si el producto agregado es parte de la promocion
        let ok = true
        for (const promProd of prom.productos_promocion) { //revisando si estan todos los productos que componen la promocion
          const targetAmount = promProd.cantidad
          let counter = 0
          for (const productId of newIdsNotInPromotion) {
            if (promProd.producto.id === productId) counter += 1
          }
          if (counter < targetAmount) ok = false
        }
        if (ok) { //existen suficientes productos en el carro para agregar la promocion
          for (const promProd of prom.productos_promocion) { // se sacan de idsNotInPromotion las ids de estos productos
            for (let i = 0; i<promProd.cantidad; i++) {
              let index = newIdsNotInPromotion.indexOf(promProd.producto.id)
              console.log('index: ', index)
              newIdsNotInPromotion.splice(index,1) //quita elemento de arreglo
            }
          }
          console.log("newIds: ", newIdsNotInPromotion)
          // se agrega promocion al carrito
          const newPromotionList = cart.promotionList
          newPromotionList.push(prom)
          setCart({...cart, idsNotInPromotion: newIdsNotInPromotion, promotionList: newPromotionList})
        }
      }
      // for (const prodProm of prom.productos_promocion) {
      //   if (product.id == prodProm.producto.id) {
      //     const promotionObject = {

      //     }
      //   }
      // }
    }
  }

  const addToCart = (product) => {
    console.log("addToCart.. ");
    const newIdsNotInPromotion = cart.idsNotInPromotion;
    newIdsNotInPromotion.push(product.id)

    const newProductList = cart.productList;

    let isInCart = false;

    for (const prod of newProductList) {
      if (prod.productId === product.id) {
        isInCart = true;
        prod.quantity += 1;
        prod.totalPrice += prod.unitPrice;
        break;
      }
    }
    if (isInCart === false) {
      const productObject = {
        productId: product.id,
        productName: product.nombre,
        quantity: 1,
        unitPrice: product.precio_actual,
        totalPrice: product.precio_actual,
        productData: product,
      };
      newProductList.push(productObject);
    }
    const cartTotal = cart.total + product.precio_actual;
    setCart({ ...cart, productList: newProductList, idsNotInPromotion: newIdsNotInPromotion , total: cartTotal });
    checkPromotions(product, newIdsNotInPromotion)
    console.log("despues: ", cart);
  };

  const clickProduct = (product) => {
    console.log(product.nombre, "!!");
    addToCart(product);
  };

  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <>
      <SearchBar setFilterText={setFilterText}></SearchBar>
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
        dataSource={filteredProducts}
        renderItem={(product) => (
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
