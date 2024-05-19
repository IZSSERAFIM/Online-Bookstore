import { Space, Input, Row, Col, Button } from "antd";
import { useState } from "react";
import { postComment } from "../service/comments";

const { TextArea } = Input;

export default function CommentInput({ bookid, username, autoFocus }) {
  const handleSubmit = () => {
    const comment = { bookId: bookid, text: input, username: username };
    postComment(comment);
  };

  const [input, setInput] = useState("");

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <TextArea
        autoFocus={autoFocus}
        placeholder="请输入评论"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Row justify="end">
        <Col>
          <Button type="primary" onClick={handleSubmit}>
            发布
          </Button>
        </Col>
      </Row>
    </Space>
  );
}
