import React, { useEffect, useState } from "react";
import {
  Upload,
  Modal,
  Form,
  Input,
  Button,
  InputNumber,
  Card,
  Row,
  Col,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BookTable from "../components/book_table";
import { useSearchParams } from "react-router-dom";
import { getAllBookData, addBook } from "../service/book";
import { searchBooks } from "../service/book";

export default function AdminBook() {
  const [books, setBooks] = useState([]);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const { Search } = Input;
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const keyword = searchParams.get("keyword") || "";
  const pageIndex =
    searchParams.get("pageIndex") != null
      ? Number.parseInt(searchParams.get("pageIndex"))
      : 0;
  const pageSize =
    searchParams.get("pageSize") != null
      ? Number.parseInt(searchParams.get("pageSize"))
      : 3;

  const getBooks = async () => {
    setIsLoading(true); // 开始加载数据
    let pagedBooks = await searchBooks(keyword, pageIndex, pageSize);
    let books = pagedBooks.items;
    let totalPage = pagedBooks.total;
    setBooks(books);
    setTotalPage(totalPage);
    setIsLoading(false); // 数据加载完成
  };

  useEffect(() => {
    getBooks();
  }, [keyword, pageIndex, pageSize]); // 仅在 keyword, pageIndex 或 pageSize 变化时调用

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async (values) => {
    console.log("Received values of form: ", values);
    const book = {
      title: values.title,
      author: values.author,
      description: values.description,
      price: values.price,
    };
    await addBook(book); // 确保等待这个异步操作完成
    form.resetFields();
    setFileList([]);
    await getBooks(); // 提交后重新获取书籍数据
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSearch = (keyword) => {
    setSearchParams({
      keyword: keyword,
      pageIndex: 0,
      pageSize: 3,
    });
  };

  const handlePageChange = (page) => {
    setSearchParams({ ...searchParams, pageIndex: page - 1 });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>AdminBook</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="上传书籍" bordered={false} style={{ width: 400 }}>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item name="cover" label="封面">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  withCredentials={true}
                  action="http://localhost:8080/upload"
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item
                name="title"
                label="标题"
                rules={[{ required: true, message: "请输入书籍标题" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="author"
                label="作者"
                rules={[{ required: true, message: "请输入作者名字" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="描述"
                rules={[{ required: true, message: "请输入书籍描述" }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name="price"
                label="价格（￥）"
                rules={[{ required: true, message: "请输入书籍价格" }]}
              >
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="书籍列表" bordered={false} style={{ width: 1280 }}>
            <Search
              placeholder="输入关键字"
              onSearch={handleSearch}
              enterButton
              size="large"
            />
            <BookTable
              initbooks={books}
              pageSize={pageSize}
              total={totalPage * pageSize}
              current={pageIndex + 1}
              onPageChange={handlePageChange}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}