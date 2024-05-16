import { useEffect, useState } from "react";
import { Card } from "antd";
import { PrivateLayout } from "../components/layout";
import OrderTable from "../components/order_table";
import {getAllOrders} from "../service/order";
import {useAuth} from "../components/AuthProvider";

export default function OrderPage() {
    const [ordersData, setOrdersData] = useState([])
    const auth = useAuth()

    const getOrdersData = async () =>{
        let orders = await getAllOrders({name: auth.user, password: auth.token})
        setOrdersData(orders)
        console.log({orders})
    }

    useEffect(() => {
        getOrdersData();
    }, [])

    console.log({ordersData})

    ordersData.map((order) => {
        order.key = order.id
        return order
    })

    return <PrivateLayout>
        <Card className="card-container">
            <OrderTable orders={ordersData} />
        </Card>
    </PrivateLayout>
}