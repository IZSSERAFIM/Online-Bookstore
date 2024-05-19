import { React, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginFormPage, ProFormText } from "@ant-design/pro-components";
import { Link } from "react-router-dom";
import {BasicLayout} from "../components/layout";
import backgroundImageUrl from "../imgs/background.jpg";
import logo from "../imgs/logo.png";
import { useAuth } from "../service/AuthProvider";

const LoginPage = () => {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    let res = await auth.loginAction(username, password);
    console.log(res);
  };

  return (
    <BasicLayout>
      <LoginFormPage
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
            value: username,
            onChange: e => setUsername(e.target.value)
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
            value: password,
            onChange: e => setPassword(e.target.value)
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
