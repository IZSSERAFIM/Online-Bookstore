import axios from "axios";

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
      console.log("401");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

interceptor.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 如果有token，就添加到请求头
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  }
);

export default interceptor;
