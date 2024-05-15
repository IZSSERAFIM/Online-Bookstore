import React from "react";
import { Table, Button, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import BookCard from "./book_card";

export default function CartItemTable({ carts }) {
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
      render: () => <InputNumber min={1} max={99} defaultValue={1} />,
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <>
          <Button type="primary">购买</Button>
          <br />
          <br />
          <Button type="primary" icon={<DeleteOutlined />} />
        </>
      ),
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
