import { useEffect, useState } from "react";
import { Card, Space, Input, Row, Col } from "antd";
import { useSearchParams } from "react-router-dom";
import { PrivateLayout } from "../components/layout";
import BookList from "../components/book_list";
import Slideshow from "../components/slide_show";
import BookTags from "../components/book_tags";
import { searchBooks, searchAuthorByBook } from "../service/book";
import Notice from "../components/notice";
import QueryBookCard from "../components/query_book_card";

const { Search } = Input;
export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // 添加一个isLoading状态
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const pageIndex =
    searchParams.get("pageIndex") != null
      ? Number.parseInt(searchParams.get("pageIndex"))
      : 0;
  const pageSize =
    searchParams.get("pageSize") != null
      ? Number.parseInt(searchParams.get("pageSize"))
      : 10;

  const getBooks = async () => {
    setIsLoading(true); // 开始加载数据
    let pagedBooks = await searchBooks(keyword, pageIndex, pageSize);
    console.log(pagedBooks);
    let books = pagedBooks.items;
    console.log(books);
    let totalPage = pagedBooks.total;
    console.log(totalPage);
    setBooks(books);
    setTotalPage(totalPage);
    setIsLoading(false); // 数据加载完成
  };

  useEffect(() => {
    getBooks();
  }, [keyword, pageIndex, pageSize]);

  const handleSearch = (keyword) => {
    setSearchParams({
      keyword: keyword,
      pageIndex: 0,
      pageSize: 10,
    });
  };

  const handlePageChange = (page) => {
    setSearchParams({ ...searchParams, pageIndex: page - 1 });
  };

  const handleSearchAuthorByBook = async (keyword) => {
    try {
      let result = await searchAuthorByBook(keyword);
      setAuthor(result);
    } catch (error) {
      console.error("Error fetching author:", error);
      setAuthor("未找到作者");
    }
  };

  const handleTitleSearch = (value) => {
    setTitle(value); // 更新 title 状态
  };

  return (
    <PrivateLayout>
      <Card className="card-container">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Notice />
          <Search
            placeholder="输入关键字查找书籍"
            onSearch={handleSearch}
            enterButton
            size="large"
          />
          <Row gutter={16}>
            <Col span={12}>
              <Search
                placeholder="查找书籍对应作者"
                onSearch={handleSearchAuthorByBook}
                enterButton
                size="large"
              />
            </Col>
            <Col span={12}>
              <div
                style={{
                  padding: "8px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "4px",
                }}
              >
                {author || "作者姓名"}
              </div>
            </Col>
            <Col span={24}>
              <BookTags setBooks={setBooks} setTotalPage={setTotalPage} />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Search
                placeholder="输入书名查找书籍"
                onSearch={handleTitleSearch}
                enterButton
                size="large"
              />
            </Col>
          </Row>
          {title && <QueryBookCard title={title} />}
          <Slideshow />
          <BookList
            books={books}
            pageSize={pageSize}
            total={totalPage * pageSize}
            current={pageIndex + 1}
            onPageChange={handlePageChange}
          />
        </Space>
      </Card>
    </PrivateLayout>
  );
}
