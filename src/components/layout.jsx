import { Layout, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import NavBar from "./navbar";
import { Link } from "react-router-dom";

export default function PrivateLayout({ children }) {
  return (
    <Layout className="basic-layout">
      <Header className="header">
        <NavBar user={null} />
      </Header>
      <Content>{children}</Content>
      <Footer className="footer">
        <Space direction="vertical">
          <div>
            Online Bookstore ©{new Date().getFullYear()} Created by{" "}
            {
              <Link to="https://github.com/IZSSERAFIM" target="_blank">
                LRB
              </Link>
            }
          </div>
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
          <div>
            Online Bookstore ©{new Date().getFullYear()} Created by{" "}
            {
              <Link to="https://github.com/IZSSERAFIM" target="_blank">
                LRB
              </Link>
            }
          </div>
        </Space>
      </Footer>
    </Layout>
  );
}
