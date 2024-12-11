import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Spin, Alert, Card, Row, Col } from "antd";
import { Link } from "react-router-dom";

const GET_BOOK_BY_TITLE = gql`
  query getBookByTitle($title: String!) {
    getBookByTitle(title: $title) {
      id
      title
      author
      price
      description
      cover
    }
  }
`;

function QueryBookCard({ title }) {
  const { loading, error, data } = useQuery(GET_BOOK_BY_TITLE, {
    variables: { title },
  });

  if (loading) return <Spin tip="Loading..." />;
  if (error)
    return (
      <Alert
        message="Error"
        description={error.message}
        type="error"
        showIcon
      />
    );

  const book = data.getBookByTitle;

  if (!book) {
    return (
      <Alert
        message="No Book Found"
        description="No book found with the given title."
        type="warning"
        showIcon
      />
    );
  }

  return (
    <Link to={`/book/${book.id}`}>
      <Card title={book.title}>
        <Row gutter={16}>
          <Col span={8}>
            <img alt={book.title} src={book.cover} style={{ width: "100%" }} />
          </Col>
          <Col span={16}>
            <p>
              <strong>作者:</strong> {book.author}
            </p>
            <p>
              <strong>价格:</strong> {book.price / 100}￥
            </p>
            <p>
              <strong>简介:</strong> {book.description}
            </p>
          </Col>
        </Row>
      </Card>
    </Link>
  );
}

export default QueryBookCard;
