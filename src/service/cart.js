import { message } from "antd";
import { BASEURL, getPrivateJson, post } from "./common";

export async function getAllCartBooks(auth) {
  const url = `${BASEURL}/cart`;
  let cartBooks;
  try {
    cartBooks = getPrivateJson(url, auth);
    console.log(auth);
  } catch (e) {
    console.log(e);
    cartBooks = [];
  }
  return cartBooks;
}

export async function addCartBook(cartBook) {
  const url = `${BASEURL}/cart/add`;
  let res;
  try {
    res = post(url, cartBook);
    message.success("购物车添加成功");
  } catch (e) {
    console.log(e);
    res = {
      ok: false,
      message: "Add Cart Failed.",
    };
  }
  return res;
}

export async function deleteCart(cartId){
  console.log(cartId)
  let url = `${BASEURL}/cart/delete`
  let res
  try{
      res = await post(url, cartId)
      if (res === true) {
          message.success("购物车成功清空")
      } else {
          message.error("购物车清空失败")
      }
  }catch(e){
      console.log(e)
      res = {
          ok: false,
          message: "Delete Order Failed."
      }
  }
  return res;
}