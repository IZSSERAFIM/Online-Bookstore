import { BASEURL, post } from "./common";
import { message } from "antd";

export const logout = async (username, password) => {
  localStorage.removeItem("site");
  localStorage.removeItem("user");
  const url = `${BASEURL}/logout?username=${username}&password=${password}`;
  let result;
  try {
    let response = await post(url, { name: username, password: password });
    console.log("服务器响应:", response);

    // 假设服务器返回的响应是JSON格式
    let timeElapsed = response.timeElapsed; // 根据实际返回的JSON结构进行调整
    console.log("LOGOUT");
    message.success("登出成功, 在线时间: " + timeElapsed + "ms");
    result = true;
  } catch (e) {
    console.log("错误信息:", e);
    result = false;
  }
  return result;
};