// import { message } from "antd";
// export async function getCartItems() {
//   return await fetch("http://localhost:8080/carts").then((res) => res.json());
// }

// // 这是一个异步函数，名为addCartItem，接收一个参数bookId
// export async function addCartItem(bookId) {
//   // 使用fetch API发送一个POST请求到"http://localhost:8080/carts"
//   const response = await fetch("http://localhost:8080/carts", {
//     method: "POST", // 指定请求方法为POST
//     headers: {
//       "Content-Type": "application/json", // 设置请求头，指定内容类型为JSON
//     },
//     body: JSON.stringify({ bookId }), // 将请求体设置为一个包含bookId的JSON字符串
//   });

//   // 检查响应的状态码是否表示成功（200-299）
//   if (!response.ok) {
//     // 如果状态码表示请求失败，抛出一个错误
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   // 使用response.text()获取服务器返回的文本消息
//   const data = await response.text();
//   // 使用window.alert()在浏览器前台弹出服务器返回的消息
//   message.success(data); // 弹出"订单确认"
// }

// export async function addCartItems(items, receiver, address, tel, createdAt) {
//   const payload = {
//     receiver,
//     address,
//     tel,
//     createdAt,
//     items: JSON.stringify(items), // 将items数组转换为字符串
//   };

//   const response = await fetch("http://localhost:8080/orders", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const data = await response.text();
//   message.success(data);
// }
import { message } from "antd";
import {BASEURL, getPrivateJson, post} from "./common";

export async function getAllCartBooks(auth){
    const url = `${BASEURL}/cart`
    let cartBooks
    try{
        cartBooks = getPrivateJson(url, auth)
    }catch (e){
        console.log(e)
        cartBooks = []
    }
    return cartBooks
}

export async function addCartBook(cartBook){
    const url = `${BASEURL}/cart/add`
    let res
    try{
        res = post(url, cartBook)
        message.success("购物车添加成功")
    }catch(e){
        console.log(e)
        res = {
            ok: false,
            message: "Add Cart Failed."
        }
    }
    return res
}