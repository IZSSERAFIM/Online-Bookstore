import React from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Image, Row, Space, Divider, Typography } from "antd";
import { addOrder } from "../service/order";
import { addCartBook } from "../service/cart";
import { useAuth } from "../components/AuthProvider";
import { formatTimeD } from "../utils/time";

const { Title, Paragraph } = Typography;

export default function BookDetails({ book, onAddCartItem }) {
  const blockStyle = {
    backgroundColor: "#F0EDE4",
    padding: "20px",
    width: "100%",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  };
  const imgStyle = {
    height: 500,
    width: "auto",
  };
  const moneyStyle = { color: "#dd3735", fontSize: "30px" };

  let { id } = useParams();
  const auth = useAuth();
  const date = formatTimeD(new Date());
  const cartBook = { date: date, name: auth.user, bookId: id };
  const orderBook = {
    date: date,
    name: auth.user,
    bookIdList: [id],
    bookNumList: [1],
  };

  return (
    <Row>
      <Col span={9}>
        <Image src={book.cover} style={imgStyle} alt={book.title} />
      </Col>
      <Col span={15}>
        <Typography>
          <Title>{book.title}</Title>
          <Divider>基本信息</Divider>
          <Space>
            <Paragraph style={blockStyle}>
              {`作者：${book.author}`}
              <Divider type="vertical" />
              {`销量：${book.sales}`}
              <Divider type="vertical" />
              {`库存：${book.stock}`}
            </Paragraph>
          </Space>
          <Divider>作品简介</Divider>
          <Paragraph style={blockStyle}>{book.description}</Paragraph>
          <Divider>售价</Divider>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={blockStyle}>
              <div>
                <Space>
                  <div style={moneyStyle}>¥ {book.price / 100}</div>
                </Space>
              </div>
            </div>
            <Space>
              <Button size="large" onClick={() => addCartBook(cartBook)}>
                加入购物车
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={() => addOrder(orderBook)}
              >
                立即购买
              </Button>
            </Space>
          </Space>
        </Typography>
      </Col>
    </Row>
  );
}
