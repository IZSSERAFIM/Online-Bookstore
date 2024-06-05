import { useEffect, useState } from "react";
import { Card, Space, Input } from "antd";
import { useSearchParams } from "react-router-dom";
import {PrivateLayout} from "../components/layout";
import BookList from "../components/book_list";
import Slideshow from "../components/slide_show";
import { searchBooks } from "../service/book";
import Notice from "../components/notice";

const { Search } = Input;
export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // 添加一个isLoading状态

  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 0;
  const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 10;

  const getBooks = async () => {
    setIsLoading(true); // 开始加载数据
    let pagedBooks = await searchBooks(keyword, pageIndex, pageSize);
    console.log(pagedBooks)
    let books = pagedBooks.items;
    console.log(books)
    let totalPage = pagedBooks.total;
    console.log(totalPage)
    setBooks(books);
    setTotalPage(totalPage);
    setIsLoading(false); // 数据加载完成
  };

  useEffect(() => {
    getBooks();
  }, [keyword, pageIndex, pageSize])

  const handleSearch = (keyword) => {
    setSearchParams({
      "keyword": keyword,
      "pageIndex": 0,
      "pageSize": 10
    });
  };

  const handlePageChange = (page) => {
    setSearchParams({ ...searchParams, pageIndex: page - 1 });
  }

  return <PrivateLayout>
    <Card className="card-container">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Notice />
        <Search placeholder="输入关键字" onSearch={handleSearch} enterButton size="large" />
        <Slideshow />
        <BookList books={books} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex + 1} onPageChange={handlePageChange} />
      </Space>
    </Card>
  </PrivateLayout>
}