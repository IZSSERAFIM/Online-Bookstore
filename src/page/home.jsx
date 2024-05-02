import { useEffect, useState } from "react";
import { Card, Space, Input } from "antd";
import PrivateLayout from "../components/layout";
import BookList from "../components/book_list";
import Slideshow from "../components/slide_show";
import { getBooks } from "../service/book";
const { Search } = Input;

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 添加一个isLoading状态
  const initBooks = async () => {
    setIsLoading(true); // 开始加载数据
    let books = await getBooks();
    setBooks(books);
    setIsLoading(false); // 数据加载完成
  };
  useEffect(() => {
    initBooks();
  }, []);
  return (
    <PrivateLayout>
      <Card className="card-container">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Search
            placeholder="输入关键字"
            // onSearch={}
            enterButton
            size="large"
          />
          <Slideshow />
          <BookList books={books} />
        </Space>
      </Card>
    </PrivateLayout>
  );
}
