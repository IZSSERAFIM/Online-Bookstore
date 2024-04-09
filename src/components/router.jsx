import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../page/home";
import LoginPage from "../page/login";
import RegisterPage from "../page/register";
import BookPage from "../page/book";
import CartPage from "../page/cart";
import OrderPage from "../page/order";
import RankPage from "../page/rank";
import Profile from "../page/profile";

export default function AppRouter() {
    // 返回一个 BrowserRouter 组件，用于包裹整个路由配置
    return (
        <BrowserRouter>
            <Routes>
                {/* 定义不同路径对应的页面组件 */}
                <Route index element={<HomePage />} /> {/* 当路径为 "/" 时，渲染 HomePage 组件 */}
                <Route path="/login" element={<LoginPage />} /> {/* 当路径为 "/login" 时，渲染 LoginPage 组件 */}
                <Route path="/register" element={<RegisterPage />} /> {/* 当路径为 "/register" 时，渲染 RegisterPage 组件 */}
                <Route path="/book/:id" element={<BookPage />} /> {/* 当路径为 "/book/:id" 时，渲染 BookPage 组件 */}
                <Route path="/cart" element={<CartPage />} /> {/* 当路径为 "/cart" 时，渲染 CartPage 组件 */}
                <Route path="/order" element={<OrderPage />} /> {/* 当路径为 "/order" 时，渲染 OrderPage 组件 */}
                <Route path="/rank" element={<RankPage />} /> {/* 当路径为 "/rank" 时，渲染 RankPage 组件 */}
                <Route path="/profile" element={<Profile />} /> {/* 当路径为 "/profile" 时，渲染 Profile 组件 */}
            </Routes>
        </BrowserRouter>
    );
}
