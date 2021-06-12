//pagina de home
import Home from "../pages/Home";
//pagina del vendedor ya logueado
import Account from "../pages/Seller/Account";
import Pos from "../pages/Seller/Pos";
import Sells from "../pages/Seller/Sells";
import Voucher from "../pages/Seller/Voucher";
import Payment from "../pages/Seller/Payment";
import PosLayout from "../layouts/PosLayout";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
    layout: "div",
  },
  {
    path: "/pos/cuenta",
    component: Account,
    exact: true,
    layout: PosLayout,
  },
  {
    path: "/pos/ventas",
    component: Sells,
    exact: true,
    layout: PosLayout,
  },
  {
    path: "/pos/pago",
    component: Payment,
    exact: true,
    layout: PosLayout,
  },
  {
    path: "/pos",
    component: Pos,
    exact: true,
    layout: PosLayout,
  },
  {
    path: "/pos/voucher",
    component: Voucher,
    exact: true,
    layout: PosLayout,
  },
  {
    layout: "div",
    component: Home,
  },
];

export default routes;
