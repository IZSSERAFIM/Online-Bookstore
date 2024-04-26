import user from "../test/user";

const login = async (username, password) => {
  // 模拟异步操作，实际开发中可能是向服务器发送请求
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === user.username && password === user.password) {
        resolve(true); // 登录成功
      } else {
        resolve(false); // 登录失败
      }
    }, 1000); // 延迟1秒模拟网络延迟
  });
};
export default login;