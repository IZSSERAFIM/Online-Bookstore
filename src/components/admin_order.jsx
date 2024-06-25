import { useEffect, useState } from "react";
import { Card } from "antd";
import { AdminGetAllOrder } from "../service/order";
import OrderTable from "../components/order_table";

export default function AdminOrder() {
  const [ordersData, setOrdersData] = useState([]);
  const getOrdersData = async () => {
    let orders = await AdminGetAllOrder();
    setOrdersData(orders);
    console.log({ orders });
  };

  useEffect(() => {
    getOrdersData();
  }, []);

  console.log({ordersData})

    ordersData.map((order) => {
        order.key = order.id
        return order
    })

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>AdminOrder</h1>
      <Card className="card-container">
            <OrderTable orders={ordersData} />
        </Card>
    </div>
  );
}
