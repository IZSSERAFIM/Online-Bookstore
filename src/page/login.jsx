import { React, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginFormPage, ProFormText } from "@ant-design/pro-components";
import { Link, useNavigate } from "react-router-dom";
import BasicLayout from "../components/layout";
import backgroundImageUrl from "../imgs/background.jpg";
import logo from "../imgs/logo.png";
import login  from "../service/login";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password } = values;
    const success = await login(username, password); // 调用登录函数

    if (success) {
      navigate("/home"); // 假设登录成功后跳转到/home，根据实际情况调整
    } else {
      setErrorMessage("用户名或密码错误！");
    }
  };

  return (
    <BasicLayout>
      <LoginFormPage
        backgroundImageUrl={backgroundImageUrl}
        logo={logo}
        title="Book Store"
        subTitle="电子书城"
        onFinish={handleSubmit}
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
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </LoginFormPage>
    </BasicLayout>
  );
};

export default LoginPage;
