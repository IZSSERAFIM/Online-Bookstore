import { useEffect, useState } from "react";
import { Card } from "antd";
import { PrivateLayout, BasicLayout } from "../components/layout";
import OrderTable from "../components/order_table";
import { getOrders } from "../service/order";

export default function OrderPage() {
    const [orders, setOrders] = useState([]);

    const initOrders = async () => {
        let orders = await getOrders();
        setOrders(orders);
    }

    useEffect(() => {
        initOrders();
    }, []);

    return <BasicLayout>
        <Card className="card-container">
            <OrderTable orders={orders} />
        </Card>
    </BasicLayout>
}