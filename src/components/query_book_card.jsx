import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Card, Spin, Alert } from "antd";
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

  return (
    <Link to={`/book/${book.id}`}>
      <Card
        hoverable
        cover={
          <img
            alt={book.title}
            src={book.cover}
            style={{ height: 200, objectFit: "cover" }}
          />
        }
      >
        <Card.Meta title={book.title} description={`${book.author}`} />
        <p style={{ marginTop: 10 }}>{book.description}</p>
        <p>{book.price / 100}￥</p>
      </Card>
    </Link>
  );
}

export default QueryBookCard;
