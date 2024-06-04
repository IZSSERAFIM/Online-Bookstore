import { BASEURL, post } from "./common";
export const register = async (username, password, email) => {
  const url = `${BASEURL}/register?username=${username}&password=${password}&email=${email}`;
  let result;
  try {
    result = await post(url, {
      name: username,
      password: password,
      email: email,
    });
  } catch (e) {
    console.log(e);
    result = false;
  }
  return result;
};
