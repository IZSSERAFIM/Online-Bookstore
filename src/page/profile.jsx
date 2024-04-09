import React, { useState } from "react";
import { Button, Card, Form, Input, Upload, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import  PrivateLayout  from "../components/layout";
import user from "../test/user";

const { TextArea } = Input;

const Profile = () => {
  const [userData, setUserData] = useState(user);

  const [fileList, setFileList] = useState([]);

  const handleFormSubmit = (values) => {
    const updatedUserData = { ...userData, ...values };
    setUserData(updatedUserData);
    console.log(updatedUserData);
  };

  return (
    <PrivateLayout>
      <Card title="个人信息" style={{ maxWidth: 600, margin: "auto" }}>
        <Form
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={userData}
        >
          <Form.Item label="头像">
            <Upload
              accept="image/*"
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList: newFileList }) => {
                setFileList(newFileList);
              }}
            >
              {fileList.length === 0 && (
                <Avatar
                  size={100}
                  icon={<UserOutlined />}
                  src={userData.avatar}
                  alt="avatar"
                />
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: "请输入邮箱" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: "请输入手机号" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="地址"
            name="address"
            rules={[{ required: true, message: "请输入地址" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="用户等级">
            <Input value={userData.level} disabled />
          </Form.Item>
          <Form.Item
            label="个性化自述"
            name="description"
            rules={[{ required: true, message: "请输入个性化自述" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PrivateLayout>
  );
};

export default Profile;
