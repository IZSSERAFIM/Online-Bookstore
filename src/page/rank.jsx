import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Upload, Avatar, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {PrivateLayout} from "../components/layout";
import { getProfile } from "../service/user";
import { useAuth } from "../components/AuthProvider";

export default function RankPage() {
  return (
    <PrivateLayout>
      <Spin fullscreen />
    </PrivateLayout>
  );
}
