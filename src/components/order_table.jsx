import { Table } from "antd";
import OrderItemList from "./order_item_list";
import { formatTimeD } from "../utils/time";

export default function OrderTable({ orders }) {
    const columns = [
        { 
            title: '收货人', 
            dataIndex: 'user', 
            key: 'user.name', 
            render: user => user.name,
        },
        { 
            title: '联系方式', 
            dataIndex: 'user', 
            key: 'user.phone', 
            render: user => user.phone,
        },
        { 
            title: '收货地址', 
            dataIndex: 'user', 
            key: 'user.address', 
            render: user => user.address,
        },
        {
            title: '下单时间', 
            dataIndex: 'date', 
            key: 'date',
            render: (time) => formatTimeD(time)
        },
    ];

    return <Table
        columns={columns}
        expandable={{
            expandedRowRender: (order) => (
                <OrderItemList orderItems={order.orderItemList} />
            ),
        }}
        dataSource={orders.map(order => ({
            ...order,
            key: order.id
        }))}
    />
}