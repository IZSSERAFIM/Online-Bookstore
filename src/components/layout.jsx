import { useEffect, useState } from "react";
import { Layout, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import NavBar from "./navbar";
import AdminNavBar from "./admin_navbar";
import { Link } from "react-router-dom";
import { getProfile } from "../service/user";
import { useAuth } from "../service/AuthProvider";

export function PrivateLayout({ children }) {
  const auth = useAuth();
  const [profile, setProfile] = useState();

  const getProfileData = async () => {
    let profile = await getProfile({ name: auth.user, password: auth.token });
    setProfile(profile);
    console.log({ profile: profile });
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const user = profile ? profile : { name: auth.user };

  return (
    <Layout className="basic-layout">
      <Header className="header">
        <NavBar user={user} />
      </Header>
      <Content>{children}</Content>
      <Footer className="footer">
        <Space direction="vertical">
          <Link
            to="https://github.com/IZSSERAFIM/Online-Bookstore"
            target="_blank"
          >
            <div>Online Bookstore ©{new Date().getFullYear()}</div>
          </Link>
        </Space>
      </Footer>
    </Layout>
  );
}

export function BasicLayout({ children }) {
  return (
    <Layout className="basic-layout">
      <Header className="header">
        <NavBar user={null} />
      </Header>
      <Content>{children}</Content>
      <Footer className="footer">
        <Space direction="vertical">
          <Link
            to="https://github.com/IZSSERAFIM/Online-Bookstore"
            target="_blank"
          >
            <div>Online Bookstore ©{new Date().getFullYear()}</div>
          </Link>
        </Space>
      </Footer>
    </Layout>
  );
}

export function AdminLayout({ children, header }) {
  return (
    <Layout className="basic-layout">
      <Header className="header">{header}</Header>
      <Content>{children}</Content>
      <Footer className="footer">
        <Space direction="vertical">
          <Link
            to="https://github.com/IZSSERAFIM/Online-Bookstore"
            target="_blank"
          >
            <div>Online Bookstore ©{new Date().getFullYear()}</div>
          </Link>
        </Space>
      </Footer>
    </Layout>
  );
}
