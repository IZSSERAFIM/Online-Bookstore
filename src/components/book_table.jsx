import { React, useEffect, useState } from "react";
import { Table, Button } from "antd";
import ModifyBookModal from "./modify_Book_modal";
import { getAllBookData } from "../service/book";

export default function BookTable({ initbooks }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [books, setBooks] = useState(initbooks);

  useEffect(() => {
    const fetchBooks = async () => {
      const initialBooks = await getAllBookData(); // 假设这是获取书籍数据的函数
      setBooks(initialBooks); // 使用获取到的数据设置books状态
    };

    fetchBooks(); // 调用函数获取数据
  }, []); // 空依赖数组意味着这个effect只在组件加载时运行一次

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
        dataSource={books}
        rowKey="id"
        pagination={{ pageSize: 3 }}
      />
      {isModalVisible && (
        <ModifyBookModal
          book={currentBook}
          onOk={async () => {
            console.log("onOk");
            const updatedBooks = await getAllBookData(); // 调用 getAllBooks 获取最新的书籍数据
            setBooks(updatedBooks); // 使用新数据更新 books 状态
            setIsModalVisible(false); // 关闭模态框
          }}
          onCancel={() => setIsModalVisible(false)}
        />
      )}
    </>
  );
}
