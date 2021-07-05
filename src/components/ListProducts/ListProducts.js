import React, { useState, useEffect, useContext } from "react";
import { List, Card, Row, Col, Space } from "antd";
import { getProducts } from "../../api/products";
import { getCategories } from "../../api/categories";
import { CartContext } from "../../context/CartContext";
import useAuth from "../../hooks/useAuth";
import SearchBar from "../../components/SearchBar";

/**
 * Componente lista de productos
 * @param {Object} props
 * @param {JSON} props.user - JSON usuario obtenido del back-end
 * @param {JSON[]} props.promotions - Lista de promociones obtenidas desde el back-end
 * @returns Renderización de lista de productos
 */
const ListProducts = ({ user, promotions }) => {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [categories, setCategories] = useState();
  const [reloadProducts, setReloadProducts] = useState(false);
  const [filterText, setFilterText] = useState("")

  const [cart, setCart] = useContext(CartContext);

  /**
   * Objeto de producto guardado en la lista del carrito
   * @typedef {Object} ProductObject
   * @property {number} productId - Id de producto
   * @property {string} productName - Nombre de producto 
   * @property {number} quantity - Cantidad del producto en carrito
   * @property {number} unitPrice - precio unitario de producto
   * @property {number} totalPrice - precio total de producto en carrito (quantity*unitPrice)
   * @property {JSON} productData - JSON de producto recibido del back-end.
   */


  useEffect(() => {
    (async () => {
      const response = await getProducts(user.almacen, logout);
      const response2 = await getCategories(user.almacen, logout)
      setProducts(response || []);
      setProducts2(response || []);
      setCategories(response2 || []);
      setReloadProducts(false);
      console.log(categories);
    })();
  }, [reloadProducts, setReloadProducts, user.almacen, logout]);

  /**
   * Revisa si se pueden aplicar promociones al carro, si es posible las agrega
   * @param {JSON} product - JSON de producto recibido de la base de datos
   * @param {number[]} newIdsNotInPromotion - Lista de ids de productos en carrito que no pertenecen a promocion agregada, ver {@link Cart}
   * @param {number} total - Total en carrito
   */
  const checkPromotions = (product, newIdsNotInPromotion, total) => {
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
            for (let i = 0; i < promProd.cantidad; i++) {
              let index = newIdsNotInPromotion.indexOf(promProd.producto.id)
              console.log('index: ', index)
              newIdsNotInPromotion.splice(index, 1) //quita elemento de arreglo
            }
          }
          console.log("newIds: ", newIdsNotInPromotion)
          // se agrega promocion al carrito
          const newPromotionList = cart.promotionList
          newPromotionList.push(prom)
          setCart({...cart, idsNotInPromotion: newIdsNotInPromotion, promotionList: newPromotionList, total:total})
        }
      }
    }
  }

  /**
   * Agrega productos al carrito
   * @param {JSON} product JSON de producto obtenido del back-end
   */
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
      /**
       * @type {ProductObject}
       */
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
    checkPromotions(product, newIdsNotInPromotion, cartTotal )
    console.log("despues: ", cart);
  };

  const clickProduct = (product) => {
    addToCart(product);
  };

  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <>

          {/* <Row gutter={[16, 16]}>
            <Col span={8}><SearchBar setFilterText={setFilterText}></SearchBar>  <button  onClick={() => (setProducts(products2))} > Todos los productos</button> </Col>
            <Col span={16}>  
              <List
                grid={{
                  gutter: 16,
                }}
                dataSource={categories}
                
                renderItem={item => (
                
                  <List.Item> 
                    <button  onClick={() => (setProducts(item.productos))} >{item.nombre}</button>
                  </List.Item>
                )}  
              />
            </Col>    
          </Row> */}
          
          
            <SearchBar setFilterText={setFilterText}></SearchBar>
            <Space direction='horizontal' size='small'>
              <button  onClick={() => (setProducts(products2))} > Todos </button>
              <List
                  grid={{
                    gutter: 4,
                  }}
                  dataSource={categories}  
                  renderItem={item => ( 
                    <List.Item> 
                      <button  onClick={() => (setProducts(item.productos))} >{item.nombre}</button>
                    </List.Item>
                  )}  
                />
            </Space>
          

       
         

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
