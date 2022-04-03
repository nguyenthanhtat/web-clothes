
import { Routes, Route } from "react-router-dom";
import {
  Home,

  Register,
  LoginTest,
  Profiles,
  ShopNow,
  Products,
  ProductDetail,
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
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/products" element={<ProductList/>} />
      <Route path="/productlist/:category" element={<ProductList />} />
      </Routes>
      </>
  )
}

export default App;
