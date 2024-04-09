import React, { useState } from "react";
import { Button, Table, Image, InputNumber } from "antd";

export default function CartItemTable({ carts }) {
  const [selectedItems, setSelectedItems] = useState(carts);
  

  // 计算总价
  const computeTotalPrice = (items) => {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.price * item.number;
    });
    return totalPrice / 100; // 将总价转换为元
  };
  const [totalPrice, setTotalPrice] = useState(computeTotalPrice(carts));
  // 删除商品
  const handleDeleteItem = (id) => {
    const newItems = selectedItems.filter((item) => item.id !== id);
    setSelectedItems(newItems);
    // 更新总价
    setTotalPrice(computeTotalPrice(newItems));
  };

  // 修改商品数量
  const handleNumberChange = (id, number) => {
    const newItems = selectedItems.map((item) => {
      if (item.id === id) {
        item.number = number;
      }
      return item;
    });
    setSelectedItems(newItems);
    // 更新总价
    setTotalPrice(computeTotalPrice(newItems));
  };

  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      render: (cover) => <Image src={cover} width={80} />,
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "数量",
      dataIndex: "number",
      key: "number",
      render: (text, record) => (
        <InputNumber
          min={1}
          defaultValue={text}
          onChange={(value) => handleNumberChange(record.id, value)}
        />
      ),
    },
    {
      title: "单价",
      dataIndex: "price",
      key: "price",
      render: (price) => `￥${price / 100}`,
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Button type="link" danger onClick={() => handleDeleteItem(record.id)}>
          删除
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={selectedItems} columns={columns} rowKey="id" />
      <p>总价：{totalPrice}元</p>
      <Button type="primary" disabled={selectedItems.length === 0}>
        立刻下单
      </Button>
    </>
  );
}
