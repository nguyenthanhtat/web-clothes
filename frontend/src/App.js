
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  Home,

  Register,
  Login,
  Profiles,
  ShopNow,
  Products,
  ProductDetail,
  ProductList,
  TheLayout
} from './imports/index'
import Cart from './pages/Cart'
import { ToastContainer } from "react-toastify";
import VerifyAccount from "./pages/Authentication/VerifyAccount";
import { useSelector } from "react-redux";
import './scss/style.scss';
import AdminHome from "./components/admin/AdminHome";
function App() {
  const auth = useSelector((state) => state.auth.userActive);
  console.log('auth', auth)
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TheLayout />} />
          {/* <Route path="/" element={<TheLayout />} />  */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          {/* <Route path="/profile" element={<Profiles />} /> */}
          {/* <Route path="/home" element={<ShopNow />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/productlist/:category" element={<ProductList />} /> */}

        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App;
