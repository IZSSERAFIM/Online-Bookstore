import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { login } from "./login";
// import {logout} from "./logout";
import { register } from "./register";

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
        throw new Error("您的账号已经被禁⽤");
      }
    } catch (err) {
      console.error(err);
      message.error(err.message);
    }
  };

  const logoutAction = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
    console.log("has cleared user and token");
    // logout();
    // navigate("/login");
  };

  const registerAction = async (username, password, email) => {
    try {
      const res = await register(username, password, email);
      if (res) {
        message.success("注册成功");
        navigate("/login");
      } else {
        throw new Error("注册失败");
      }
    } catch (err) {
      console.error(err);
      message.error(err.message);
    }
  }

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logoutAction, registerAction }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
