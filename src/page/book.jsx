import { useParams } from "react-router-dom";
import BookDetails from "../components/book_details";
import  {PrivateLayout}  from "../components/layout";
import { getBookById } from "../service/book";
import { useEffect, useState } from "react";
import { Card, Space, Divider } from "antd";
import {useAuth} from "../components/AuthProvider";


export default function BookPage() {
  const { id } = useParams(); // 使用 useParams 获取 URL 中的参数 id
  const auth = useAuth();
  const [book, setBook] = useState(null);

  const getBookData = async () =>{
    let bookData = await getBookById(id);
    setBook(bookData)
}

  useEffect(() => {
    // 根据 id 查找对应的书籍
    getBookData();
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
