import axios from "axios";
import { useHistory } from "react-router-dom";

// 创建axios实例
const interceptor = axios.create({
  baseURL: "http://localhost:8080", // 你的API地址
});

// 添加响应拦截器
interceptor.interceptors.response.use(
  (response) => {
    // 如果响应返回的状态码是200，那么就返回数据
    return response.data;
  },
  (error) => {
    // 如果响应返回的状态码是401，那么就重定向到登录页面
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default interceptor;
