import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { login } from "./login";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (username, password) => {
    try {
      const res = await login(username, password);
      const result = res.result;

      if (result === "SUCCESS") {
        setUser(username);
        setToken(password);
        localStorage.setItem("user", username);
        localStorage.setItem("site", password);
        message.success("登录成功");
        navigate(username === 'admin' ? "/admin" : "/home");
        return;
      } else if (result === "WRONG_CREDENTIALS") {
        throw new Error("用户名或密码错误");
      } else if (result === "BANNED") {
        throw new Error("用户被封禁");
      }
    } catch (err) {
      console.error(err);
      message.error(err.message);
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
