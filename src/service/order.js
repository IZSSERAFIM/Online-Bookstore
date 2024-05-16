import { message } from "antd";
import {BASEURL, post, getPrivateJson} from "./common";

export async function getAllOrders(auth){
    let url = `${BASEURL}/order`
    let order
    try{
        order = getPrivateJson(url, auth)
    }catch (e){
        console.log(e)
        order = []
    }
    return order
}

export async function addOrder(order){
    let url = `${BASEURL}/order/add`
    let res
    try{
        res = post(url, order)
        message.success("下单成功")
    }catch(e){
        console.log(e)
        res = {
            ok: false,
            message: "Add Order Failed."
        }
    }
    return res;
}