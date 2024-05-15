import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import {login} from "../service/login";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user") || null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const loginAction = async (username, password) => {
        try {
            const res = await login(username, password);
            if (res === true) {
                setUser(username);
                setToken(password);
                localStorage.setItem("user", username);
                localStorage.setItem("site", password);
                message.success("登录成功");
                navigate("/home");
                return;
            }
            throw new Error(res.message);
        } catch (err) {
            console.error(err);
            message.error("登录失败");
        }
    };

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};