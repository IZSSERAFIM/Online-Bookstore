import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../page/home";
import LoginPage from "../page/login";
import RegisterPage from "../page/register";
import BookPage from "../page/book";
import CartPage from "../page/cart";
import OrderPage from "../page/order";
import RankPage from "../page/rank";
import Profile from "../page/profile";
import AdminPage from "../page/admin";
import AuthProvider from "../service/AuthProvider";
import PrivateRoute from "../components/PrivateRoute"; // 导入PrivateRoute组件

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/book/:id" element={<PrivateRoute element={<BookPage />} />} />
          <Route path="/cart" element={<PrivateRoute element={<CartPage />} />} />
          <Route path="/order" element={<PrivateRoute element={<OrderPage />} />} />
          <Route path="/rank" element={<PrivateRoute element={<RankPage />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/admin" element={<PrivateRoute element={<AdminPage />} />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
