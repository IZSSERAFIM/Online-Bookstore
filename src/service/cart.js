import { message } from "antd";
import { BASEURL, getPrivateJson, post } from "./common";

export async function getAllCartBooks(auth) {
  const url = `${BASEURL}/cart`;
  let cartBooks;
  try {
    cartBooks = getPrivateJson(url, auth);
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
