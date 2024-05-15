import {BASEURL, getPrivateJson} from "./common";

export async function getProfile(auth){
    let url = `${BASEURL}/user`
    let res
    try{
        res = getPrivateJson(url, auth)
    }catch (e){
        console.log(e)
        res = []
    }
    return res
}