import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../page/home";
import LoginPage from "../page/login";
import RegisterPage from "../page/register";
import BookPage from "../page/book";
import CartPage from "../page/cart";
import OrderPage from "../page/order";
import RankPage from "../page/rank";
import Profile from "../page/profile";
import AuthProvider from "../service/AuthProvider";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/rank" element={<RankPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
