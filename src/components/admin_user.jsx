import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { gatAllUsers } from "../service/user";

export default function AdminUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    gatAllUsers().then((res) => {
      const filteredUsers = res.filter(user => user.name !== 'admin');
      setUsers(filteredUsers);
    });
  }, []);

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: avatar => <img src={avatar} alt="avatar" style={{ width: '50px', height: '50px' }} />,
    },
    {
      title: '昵称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button type="primary" danger onClick={() => handleBan(record.id)}>封禁</Button>
          <Button type="primary" onClick={() => handleUnban(record.id)}>解封</Button>
        </span>
      ),
    },
  ];

  const handleBan = (userId) => {
    // Implement ban functionality here
  };

  const handleUnban = (userId) => {
    // Implement unban functionality here
  };

  return (
    <div>
      <h1>AdminUser</h1>
      <Table columns={columns} dataSource={users} rowKey="id" />
    </div>
  );
}