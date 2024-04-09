import React, { useState } from "react";
import { Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LoginFormPage, ProFormText } from "@ant-design/pro-components";
import BasicLayout from "../components/layout";
import backgroundImageUrl from "../imgs/background.jpg";
import logo from "../imgs/logo.png";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
  };

  return (
    <BasicLayout>
      <LoginFormPage
        backgroundImageUrl={backgroundImageUrl}
        logo={logo}
        title="Book Store"
        subTitle="电子书城"
        style={{ height: "80vh" }}
      >
        <div style={{ height: "1em" }}></div>
        <ProFormText
          name="username"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined className={"prefixIcon"} />,
          }}
          placeholder={"请输入用户名"}
          value={username}
          onChange={handleUsernameChange}
          rules={[
            {
              required: true,
              message: "请输入用户名!",
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined className={"prefixIcon"} />,
          }}
          placeholder={"密码"}
          value={password}
          onChange={handlePasswordChange}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <ProFormText.Password
          name="confirmPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined className={"prefixIcon"} />,
          }}
          placeholder={"确认密码"}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          rules={[
            {
              required: true,
              message: "请确认密码！",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不一致！"));
              },
            }),
          ]}
        />
        <Button type="primary" onClick={handleSubmit}>
          注册
        </Button>
        <p>
          已有账号？<Link to="/login">登录</Link>
        </p>
      </LoginFormPage>
    </BasicLayout>
  );
};

export default RegisterPage;
