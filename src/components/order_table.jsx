import React, { useState, useEffect } from "react";
import { Table, DatePicker } from "antd";
import OrderItemList from "./order_item_list";
import { formatTimeD } from "../utils/time";

const { RangePicker } = DatePicker;

export default function OrderTable({ orders }) {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  console.log(orders);
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange;
      const filtered = orders.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate >= startDate && orderDate <= endDate;
      });
      setFilteredOrders(filtered);
    } else {
      // 如果没有选择日期范围，可以选择显示所有订单或不显示
      setFilteredOrders(orders);
    }
  }, [orders, dateRange]); // 当orders或dateRange更改时重新过滤

  const columns = [
    {
      title: "收货人",
      dataIndex: "user",
      key: "user.name",
      render: (user) => user.name,
    },
    {
      title: "联系方式",
      dataIndex: "user",
      key: "user.phone",
      render: (user) => user.phone,
    },
    {
      title: "收货地址",
      dataIndex: "user",
      key: "user.address",
      render: (user) => user.address,
    },
    {
      title: "下单时间",
      dataIndex: "date",
      key: "date",
      render: (time) => formatTimeD(time),
    },
  ];

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  return (
    <>
      <>
        筛选订单日期 <RangePicker onChange={handleDateRangeChange} />
      </>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (order) => (
            <OrderItemList orderItems={order.orderItemList} />
          ),
        }}
        dataSource={filteredOrders.map((order) => ({
          ...order,
          key: order.id,
        }))}
      />
    </>
  );
}
