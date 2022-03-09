
import { Routes, Route } from "react-router-dom";
import {
  Home,

  Register,
  LoginTest,
  Profiles,
  ShopNow,
  Productt,
  ProductList,
} from './imports/index'
import Cart from './pages/Cart'
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
    <ToastContainer position="top-center" />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/logintest" element={<LoginTest />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profiles />} />
      <Route path="/shopnow" element={<ShopNow />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product" element={<Productt />} />
      <Route path="/productlist" element={<ProductList />} />
      </Routes>
      </>
  )
}

export default App;
