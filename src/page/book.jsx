import { useParams } from "react-router-dom";
import BookDetails from "../components/book_details";
import  PrivateLayout  from "../components/layout";
import books from "../test/books";
import { useEffect, useState } from "react";
import { Card, Space, Divider } from "antd";

export default function BookPage() {
  const { id } = useParams(); // 使用 useParams 获取 URL 中的参数 id
  const [book, setBook] = useState(null);

  useEffect(() => {
    // 根据 id 查找对应的书籍
    const foundBook = books.find((book) => book.id === parseInt(id));
    setBook(foundBook);
  }, [id]); // 当 id 发生变化时，重新查找书籍

  return (
    <PrivateLayout>
      <Card className="card-container">
        <Space direction="vertical" style={{ width: "100%" }}>
          {book ? <BookDetails book={book} /> : <p>未找到该书籍</p>}
          <div style={{ margin: 20 }}>
            <Divider>书籍评论</Divider>
          </div>
        </Space>
      </Card>
    </PrivateLayout>
  );
}
