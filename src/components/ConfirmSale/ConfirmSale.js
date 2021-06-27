import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { postSale, postSaleDetail } from "../../api/sales";
import { Button } from "antd";
import { RightCircleTwoTone } from "@ant-design/icons";
import { postStockOut, putProduct } from "../../api/products";
import { useHistory } from "react-router-dom";
import { getTotal, getPromotionDiscount } from "../ListCart/ListCart";

export const createSale = async (cart, setCart, user, history) => {
  console.log("creando venta.. carrito: \n", cart);
  if (cart.payment === "" || cart.payment === null) {
    console.log("no se asigno medio de pago");
    return;
  }
  const sale = {
    almacen: user.almacen,
    total: getTotal(cart),
    promocions: cart.promotionList,
    medio_pago: cart.payment,
    fecha: Date(),
  };
  console.log("cart.productlist: ", cart.productList);
  console.log("sale: ", sale);
  const createdSale = await postSale(sale);
  if (createdSale == null) {
    console.log("error al crear venta");
    return;
  }
  // let response = createdSale
  // setResponse(response)
  for (const prodObj of cart.productList) {
    const saleDetail = {
      producto: prodObj.productId,
      venta: createdSale.id,
      cantidad: prodObj.quantity,
      precio_unitario: prodObj.unitPrice,
      precio_total: prodObj.totalPrice,
    };
    await postSaleDetail(saleDetail); // ver como postear el arreglo de una

    let product = prodObj.productData;
    let newStock = product.stock_actual - prodObj.quantity;
    let overStock = false;
    if (newStock < 0) {
      overStock = true;
      newStock = 0;
    }
    product.stock_actual = newStock;
    await putProduct(product.id, product);

    if (!overStock) {
      const stockOut = {
        cantidad: prodObj.quantity,
        producto: prodObj.productId,
        motivo: "Mediante Punto de Venta.",
        valor_unitario: prodObj.unitPrice,
        valor_total: prodObj.totalPrice,
        venta: createdSale.id,
        tipo: "Venta",
        fecha: Date(),
      };
      await postStockOut(stockOut);
    }
  }
  // setResponse(response)
  history.push("/pos/voucher");
};

const ConfirmSale = ({ meansOfPay, user }) => {
  const [cart, setCart] = useContext(CartContext);
  const history = useHistory()
  // const [response, setResponse] = useState([]);

  return (
    <>
      <Button
        icon={<RightCircleTwoTone />}
        type="primary"
        shape="round"
        size="Large"
        style={{ float: "right" }}
        onClick={() => {
          if (meansOfPay.e || meansOfPay.c || meansOfPay.d) {
            createSale(cart, setCart, user, history);
          } else {
            console.log("No se ha elegido medio de pago"); // eventualmente hacer un popup "Eliga medio de pago"
          }
        }}
      >
        Confirmar
      </Button>
      {/* <Button onClick={() => {console.log(response)}}>logResponse</Button> */}
    </>
  );
};

export default ConfirmSale;
