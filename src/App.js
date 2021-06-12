import "./less/App.less";
import { Button, DatePicker } from "antd";
import PosLayout from "./layouts/PosLayout";
import Home from "./pages/Home";
import ListProduct from "./components/ListProduct";
function App() {
  return (
    <div>
      <div>app</div>
      <PosLayout />
      <Home />
      <ListProduct />
    </div>
  );
}

export default App;
