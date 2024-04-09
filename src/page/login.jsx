import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginFormPage, ProFormText } from "@ant-design/pro-components";
import { Link } from "react-router-dom";
import BasicLayout from "../components/layout";
import backgroundImageUrl from "../imgs/background.jpg";
import logo from "../imgs/logo.png";

const LoginPage = () => {
  return (
    <BasicLayout>
      <LoginFormPage
        backgroundImageUrl={backgroundImageUrl}
        logo={logo}
        title="Book Store"
        subTitle="电子书城"
        style={{ height: "80vh" }}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined className={"prefixIcon"} />,
          }}
          placeholder={"请输入用户名"}
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
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <div style={{ marginBlockEnd: 24 }}>
          <Link to="/register">新账号？前往注册</Link>
        </div>
      </LoginFormPage>
    </BasicLayout>
  );
};

export default LoginPage;
