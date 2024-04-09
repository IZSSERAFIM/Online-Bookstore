import { Card, Space } from "antd";
import  PrivateLayout  from "../components/layout";
import BookList from "../components/book_list";
import Slideshow from "../components/slide_show";
import { Input } from "antd";
import books from "../test/books";
const { Search } = Input;

export default function HomePage() {
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
          <BookList
            books={books}
          />
        </Space>
      </Card>
    </PrivateLayout>
  );
}
