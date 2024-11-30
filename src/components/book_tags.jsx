import React from "react";
import { Radio, Col, Card, Button, Row } from "antd";
import { getBooksByTag } from "../service/book";

const BookTags = ({ setBooks, setTotalPage }) => {
  const bookTags = [
    { label: "科技与物理", value: "科技与物理" },
    { label: "心理学与行为学", value: "心理学与行为学" },
    { label: "文化与人文", value: "文化与人文" },
    { label: "宇宙与生命", value: "宇宙与生命" },
    { label: "哲学与思考", value: "哲学与思考" },
    { label: "女性主义与性别研究", value: "女性主义与性别研究" },
    { label: "历史与社会", value: "历史与社会" },
  ];

  const handleTagChange = async (e) => {
    const selectedTag = e.target.value;
    try {
      const tagbooks = await getBooksByTag(selectedTag);
      setBooks(tagbooks.books); // 更新书籍列表
      setTotalPage(1); // 更新总页数
    } catch (error) {
      console.error("Error fetching books by tag:", error);
    }
  };

  const handleReset = () => {
    window.location.reload(); // 重新加载页面
  };

  return (
    <Card>
      <h3>分类</h3>
      <Row>
        <Col span={20}>
          <Radio.Group
            block
            options={bookTags}
            optionType="button"
            buttonStyle="solid"
            onChange={handleTagChange}
          />
        </Col>
        <Col span={4} style={{ textAlign: "right" }}>
          <Button onClick={handleReset} danger={true}>
            重置
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default BookTags;
