import { BASEURL, post } from "./common";
import AuthProvider from "./AuthProvider";

export const logout = async (username, password) => {
  // const auth = AuthProvider();
  // auth.logoutAction();
  localStorage.removeItem("site");
  localStorage.removeItem("user");
  const url = `${BASEURL}/logout?username=${username}&password=${password}`;
  let result;
  try {
    result = await post(url, { name: username, password: password });
    console.log("LOGOUT" + result);
  } catch (e) {
    console.log(e);
    result = false;
  }
  return result;
};
