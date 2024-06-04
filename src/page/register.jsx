import React, { useState } from "react";
import { Button } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LoginFormPage, ProFormText } from "@ant-design/pro-components";
import { BasicLayout } from "../components/layout";
import backgroundImageUrl from "../imgs/background.jpg";
import logo from "../imgs/logo.png";
import { useAuth } from "../service/AuthProvider";

const RegisterPage = () => {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async () => {
    let res = await auth.registerAction(username, password, email);
    console.log(res);
  };

  return (
    <BasicLayout>
      <LoginFormPage
        submitter={{
          searchConfig: {
            submitText: "注册",
          },
        }}
        backgroundImageUrl={backgroundImageUrl}
        logo={logo}
        title="Book Store"
        subTitle="电子书城"
        onFinish={onSubmit}
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
        <ProFormText
          name="email"
          fieldProps={{
            size: "large",
            prefix: <MailOutlined className={"prefixIcon"} />,
          }}
          placeholder={"请输入邮箱"}
          value={email}
          onChange={handleEmailChange}
          rules={[
            {
              required: true,
              message: "请输入邮箱!",
            },
            {
              pattern: /\S+@\S+\.\S+/,
              message: "请输入有效的邮箱地址!",
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
        <p>
          已有账号？<Link to="/login">登录</Link>
        </p>
      </LoginFormPage>
    </BasicLayout>
  );
};

export default RegisterPage;
