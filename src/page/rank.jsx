import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Upload, Avatar, Spin } from "antd";
import { PrivateLayout } from "../components/layout";
import BookRankChart from "../components/book_rank_chart";
import { getBestSellingBooks } from "../service/book";

export default function RankPage() {
  const [books, setBooks] = useState([]);

  const getTopBooks = async () => {
    let response = await getBestSellingBooks();
    setBooks(response.books);
  };

  useEffect(() => {
    getTopBooks();
  }, []);

  return (
    <PrivateLayout>
      <h1 style={{ textAlign: "center" }}>Top 5 Best Selling Books</h1>
      <Card className="card-container">
        <BookRankChart books={books} />
      </Card>
    </PrivateLayout>
  );
}
