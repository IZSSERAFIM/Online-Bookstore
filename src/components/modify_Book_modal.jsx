import {React,useState} from "react";
import { Button, Form, Input, Modal, message, Upload } from "antd";
import { updateBook, deleteBook } from "../service/book";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function ModifyBookModal({ book, onOk, onCancel }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleSubmit = async (values) => {
    console.log(values.stock + " " + book.id);
    // 仅保留stock字段和id字段
    let updatedValues = {
      stock: values.stock, // 假设values对象中已经有了stock字段
      id: book.id, // 使用book.id作为书籍的唯一标识符
      title: values.title,
      author: values.author,
      price: values.price,
      // cover: values.cover,
      description: values.description,
    };
    console.log(updatedValues);
    const res = await updateBook(updatedValues);
    console.log(res);
    onOk();
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: "确认删除这本书吗？",
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        const res = await deleteBook(book.id);
      },
    });
  };

  return (
    <Modal
      title="修改书籍信息"
      open
      onOk={() => form.submit()}
      onCancel={onCancel}
      footer={[
        <Button key="delete" onClick={handleDelete} type="primary" danger>
          删除书籍
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          修改书籍信息
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          stock: book.stock,
          cover: book.cover, // 假设book对象有一个cover字段
          title: book.title,
          author: book.author,
          price: book.price,
          description: book.description,
        }}
      >
        <Form.Item name="cover" label="封面">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            withCredentials={true}
            action="http://localhost:8080/upload"
          >
            {book.cover ? (
              <img src={book.cover} alt="cover" style={{ width: "100%" }} />
            ) : (
              "上传封面"
            )}
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
          rules={[{ required: true, message: "请输入作者名称" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="描述"
          rules={[{ required: true, message: "请输入书籍描述" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="价格(分)"
          rules={[{ required: true, message: "请输入书籍价格" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="stock"
          label="库存"
          rules={[{ required: true, message: "请输入书籍库存数量" }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
