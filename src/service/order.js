import { message } from "antd";
import {BASEURL, post, getPrivateJson} from "./common";
import { createWebSocket } from "../utils/websocket";

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
    let userId = order.name
    let socket = createWebSocket(userId)

    socket.onopen = function(event){
        console.log("WebSocket connection opened:", event)
    }

    socket.onmessage = function(event){
        console.log("Received message:", event.data)
        message.success(event.data)
    }

    try{
        res = await post(url, order) // 添加await
        if (res === true) { // 如果res为true，表示下单成功
            message.success("下单成功")
        } else { // 否则，表示下单失败
            message.error("库存不足，下单失败")
        }
    }catch(e){
        console.log(e)
        res = {
            ok: false,
            message: "Add Order Failed."
        }
    }
    return res;
}

export async function AdminGetAllOrder(){
    let url = `${BASEURL}/admin_order`
    let order
    try{
        order = getPrivateJson(url)
    }catch (e){
        console.log(e)
        order = []
    }
    return order
}