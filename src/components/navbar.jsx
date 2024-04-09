import { Col, Menu, Row, Dropdown, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  UserOutlined,
  AccountBookOutlined,
  FormOutlined,
} from "@ant-design/icons";
export default function NavBar() {
  const location = useLocation();
  const parts = location.pathname.split("/");
  const selectedKey = "/" + parts[parts.length - 1];
  const navItems = [
    { label: "首页", value: "/" },
    { label: "购物车", value: "/cart" },
    { label: "订单", value: "/order" },
    { label: "排行", value: "/rank" },
  ];
  const navMenuItems = navItems.map((item) => ({
    key: item.value,
    label: <Link to={item.value}>{item.label}</Link>,
  }));

  const dropMenuItems = [
    {
      key: "profile",
      label: "主页",
      icon: <UserOutlined />,
    },
    {
      key: "password",
      label: "修改密码",
      icon: <FormOutlined />,
    },
    {
      key: "balance",
      label: `余额：元`,
      icon: <AccountBookOutlined />,
    },
    { key: "logout", label: "登出", icon: <LogoutOutlined />, danger: true },
  ];

  const navigate = useNavigate();
  const handleMenuClick = (key) => {
    if (key === "profile") {
      navigate("/profile");
    } else if (key === "logout") {
      navigate("/login");
    }
  };

  return (
    <Row className="navbar" justify="start">
      <Col>
        <Link to="/">Book Store</Link>
      </Col>
      <Col flex="auto">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[selectedKey]}
          items={navMenuItems}
          selectedKeys={[selectedKey]}
        />
      </Col>
      {
        <Col>
          <Dropdown
            overlay={
              <Menu onClick={(e) => handleMenuClick(e.key)}>
                {dropMenuItems.map((item) => (
                  <Menu.Item key={item.key} danger={item.danger}>
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <Button shape="circle" icon={<UserOutlined />} />
          </Dropdown>
        </Col>
      }
    </Row>
  );
}
