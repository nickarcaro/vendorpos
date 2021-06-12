import "./less/App.less";
import PosLayout from "./layouts/PosLayout";
import Home from "./pages/Home/Home";
import Account from "./pages/Seller/Account";
import Pos from "./pages/Seller/Pos";
import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div>
      rutas
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/cuenta" component={Account} exact />
          <Route path="/pos" component={Pos} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
