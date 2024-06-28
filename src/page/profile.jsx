import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Upload, Avatar, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { PrivateLayout } from "../components/layout";
import { getProfile, updateProfile } from "../service/user";
import { useAuth } from "../service/AuthProvider";

export default function Profile() {
  const auth = useAuth();
  const [profile, setProfile] = useState();
  const [fileList, setFileList] = useState([]);

  const getProfileData = async () => {
    let profile = await getProfile({ name: auth.user, password: auth.token });
    setProfile(profile);
    console.log({ profile: profile });
  };

  const handleFinish = async (values) => {
    await updateProfile(auth, values);
    getProfileData();
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return profile ? (
    <PrivateLayout>
      <Card title="个人信息" style={{ maxWidth: 600, margin: "auto" }}>
        <Form layout="vertical" onFinish={handleFinish} initialValues={profile}>
          <Form.Item label="头像">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              withCredentials={true}
              action="http://localhost:8080/upload"
            >
              <Avatar
                size={100}
                icon={<UserOutlined />}
                src={profile.avatar}
                alt="avatar"
              />
            </Upload>
          </Form.Item>
          <Form.Item
            label="用户名"
            name="name"
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
            <Input value={profile.level} disabled />
          </Form.Item>
          <Form.Item
            label="个性化自述"
            name="description"
            rules={[{ required: true, message: "请输入个性化自述" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PrivateLayout>
  ) : (
    <Spin fullscreen />
  );
}
