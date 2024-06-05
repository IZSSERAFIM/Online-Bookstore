import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Upload, Avatar, Spin } from "antd";
import { PrivateLayout } from "./layout";
import BookRankChart from "./book_rank_chart";
import CustomerRankChart from "./customer_rank_chart";
import { getBestSellingBooks } from "../service/book";
import { gatAllUsers} from "../service/user";

export default function AdminRank() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  const getTopBooks = async () => {
    let response = await getBestSellingBooks();
    setBooks(response.books);
  };

  useEffect(() => {
    getTopBooks();
    gatAllUsers().then((res) => {
      const filteredUsers = res.filter((user) => user.name !== "admin");
      setUsers(filteredUsers);
    });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Hot Selling</h1>
      <Card className="card-container">
        <BookRankChart books={books} />
      </Card>
      <h1 style={{ textAlign: "center" }}>Consumer Rankings</h1>
      <Card className="card-container">
        <CustomerRankChart customers={users} />
      </Card>
    </div>
  );
}
