import { BASEURL, getPrivateJson, getJson } from "./common";

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
