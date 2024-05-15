import { BASEURL, post } from "./common";
export const login = async (username, password) => {
  const url = `${BASEURL}/login?username=${username}&password=${password}`;
    let result;
    try {
        result = await post(url, { name: username, password: password });
    } catch (e) {
        console.log(e);
        result = false;
    }
    return result;
};