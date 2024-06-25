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

import { getAllBookData, addBook } from "../service/book";

export default function AdminBook() {
  const [books, setBooks] = useState([]);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      let books = await getAllBookData();
      console.log(books);
      setBooks(books);
    };
    getBooks();
  }, []);

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
    const updatedBooks = await getAllBookData();
    setBooks(updatedBooks);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
            <BookTable books={books} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
