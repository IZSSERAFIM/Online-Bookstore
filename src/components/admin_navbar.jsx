import { useState } from "react";
import { Col, Menu, Row, Dropdown, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { logout } from "../service/logout";

export default function AdminNavBar({ currentComponent, setCurrentComponent }) {
  const navItems = [
    { value: "AdminUser", label: "用户管理" },
    { value: "AdminOrder", label: "订单管理" },
    { value: "AdminRank", label: "统计" },
    { value: "AdminBook", label: "书籍管理" },
  ];

const navMenuItems = navItems.map((item) => ({
  key: item.value,
  label: (
    <div onClick={() => setCurrentComponent(item.value)}>
      {item.label}
    </div>
  ),
}));

  const dropMenuItems = [
    {
      key: "logout",
      label: "登出",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const navigate = useNavigate();
  const handleMenuClick = (key) => {
    if (key === "logout") {
      navigate("/login");
      logout();
    }
  };

  return (
    <Row className="navbar" justify="start">
      <Col>
        <Link to="/admin">Online Bookstore</Link>
      </Col>
      <Col flex="auto">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[currentComponent]}
          items={navMenuItems}
          selectedKeys={[currentComponent]}
        />
      </Col>
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
    </Row>
  );
}