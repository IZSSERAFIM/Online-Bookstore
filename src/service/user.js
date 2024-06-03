import { message } from "antd";
import { BASEURL, getPrivateJson, getJson, post } from "./common";

export async function getProfile(auth) {
  let url = `${BASEURL}/user`;
  let res;
  try {
    res = getPrivateJson(url, auth);
  } catch (e) {
    console.log(e);
    res = [];
  }
  return res;
}

export async function gatAllUsers() {
  let url = `${BASEURL}/admin_user`;
  let res;
  try {
    res = getJson(url);
  } catch (e) {
    console.log(e);
    res = [];
  }
  return res;
}

export async function banUser(userId) {
  const url = `${BASEURL}/ban_user`;
  let res;
  try {
    res = post(url, { id: userId });
    message.success("封禁成功");
  } catch (e) {
    console.log(e);
    res = {
      ok: false,
      message: "Ban User Failed.",
    };
  }
  return res;
}

export async function unbanUser(userId) {
  const url = `${BASEURL}/unban_user`;
  let res;
  try {
    res = post(url, { id: userId }); // Wrap userId in an object
    message.success("解禁成功");
  } catch (e) {
    console.log(e);
    res = {
      ok: false,
      message: "Unban User Failed.",
    };
  }
  return res;
}
