import React from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { addBookStock, deleteBook } from "../service/book";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function ModifyBookModal({ book, onOk, onCancel }) {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const res = await addBookStock({ ...values, id: book.id });
    if (res.success) {
      message.success("书籍库存修改成功");
      onOk();
    } else {
      message.error("修改失败，请重试");
    }
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: "确认删除这本书吗？",
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        const res = await deleteBook(book.id);
        if (res.success) {
          message.success("删除成功");
          onOk();
        } else {
          message.error("删除失败，请重试");
        }
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
