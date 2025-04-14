import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OAuthSuccess from "./middlewares/OAuthSuccess";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./components/Products";
import CreateProduct from "./components/CreateProduct";
import Orders from "./components/Orders";
import Riders from "./components/Riders";
import CreateRIder from "./components/CreateRIder";
import Profile from "./components/Profile";
import Cart from "./UserComponents/Cart";
import ProductsUser from "./UserComponents/ProductsUser";
import OrdersUser from "./UserComponents/OrdersUser";
import ProductDetails from "./UserComponents/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/*" element={<AdminPage />}>
            <Route index element={<Navigate to="Products" replace />}></Route>
            <Route path="products" element={<Products />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="rider" element={<Riders />} />
            <Route path="rider-create" element={<CreateRIder />} />
            <Route path="profile" element={<Profile></Profile>} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user/*" element={<UserPage />} >

            <Route index element={<Navigate to="Products" replace />}></Route>
            <Route path="Products" element={<ProductsUser />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<OrdersUser/>} />
            <Route path="product/:id" element={<ProductDetails/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
