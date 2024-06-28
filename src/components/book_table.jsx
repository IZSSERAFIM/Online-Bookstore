import { React, useEffect, useState } from "react";
import { Table, Button, Pagination, Space } from "antd";
import ModifyBookModal from "./modify_Book_modal";

export default function BookTable({
  initbooks,
  pageSize,
  current,
  total,
  onPageChange,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      render: (cover) => (
        <img src={cover} alt="cover" style={{ width: "100px" }} />
      ),
    },
    {
      title: "书名",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      render: (price) => `¥${(price / 100).toFixed(2)}`, // 将价格除以100并保留两位小数
    },
    {
      title: "库存",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setCurrentBook(record);
            setIsModalVisible(true);
          }}
        >
          编辑
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={initbooks}
        rowKey="id"
        pagination={false}
      />
      <Pagination
        current={current}
        pageSize={pageSize}
        onChange={onPageChange}
        total={total}
      />
      {isModalVisible && (
        <ModifyBookModal
          book={currentBook}
          onOk={async () => {
            console.log("update book");
            setIsModalVisible(false); // 关闭模态框
          }}
          onCancel={() => setIsModalVisible(false)}
        />
      )}
    </>
  );
}
