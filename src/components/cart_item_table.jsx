import React from "react";
import { useState } from "react";
import { Table, Button, InputNumber } from "antd";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import BookCard from "./book_card";
import { useAuth } from "../service/AuthProvider";
import { addOrder } from "../service/order";
import { formatTimeD } from "../utils/time";

export default function CartItemTable({ carts }) {
  const auth = useAuth();
  const date = formatTimeD(new Date());
  const [quantity, setQuantity] = useState(1);

  const saveBooknum = (value) => {
    console.log(value);
    setQuantity(value);
  };

  const columns = [
    {
      title: "书籍",
      dataIndex: "book",
      key: "book",
      width: 350,
      render: (book) => <BookCard book={book} />,
    },
    {
      title: "时间",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "数量",
      dataIndex: "quantity",
      key: "quantity",
      render: () => (
        <InputNumber
          size="large"
          min={1}
          max={99}
          defaultValue={1}
          changeOnWheel
          onChange={saveBooknum}
        />
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (carts) => {
        const orderBook = {
          date: date,
          name: auth.user,
          bookIdList: [carts.book.id],
          bookNumList: [quantity],
        };
        return (
          <>
            <Button
              type="primary"
              icon={<ShoppingOutlined />}
              onClick={() => addOrder(orderBook)}
            />
            <br />
            <br />
            <Button type="primary" icon={<DeleteOutlined />} />
          </>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={carts}
      rowKey={(record) => record.book.id}
    />
  );
}
