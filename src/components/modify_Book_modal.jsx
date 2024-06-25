import React from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { updateBook, deleteBook } from "../service/book";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function ModifyBookModal({ book, onOk, onCancel }) {
  const [form] = Form.useForm();

const handleSubmit = async (values) => {
  console.log(values.stock+" "+book.id);
  // 仅保留stock字段和id字段
  let updatedValues = {
    stock: values.stock, // 假设values对象中已经有了stock字段
    id: book.id, // 使用book.id作为书籍的唯一标识符
  };
  console.log(updatedValues);
  const res = await updateBook(updatedValues);
  console.log(res);
  onOk();
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
          修改库存信息
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ stock: book.stock }}
      >
        <Form.Item
          name="stock"
          label={`《${book.title}》库存`}
          rules={[{ required: true, message: "请输入书籍库存数量" }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
