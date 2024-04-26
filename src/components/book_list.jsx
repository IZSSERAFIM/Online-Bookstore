import { List, Pagination, Space } from "antd";
import BookCard from "./book_card";

export default function BookList({ books }) {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <List
        grid={{
          gutter: 16,
          column: 5,
        }}
        dataSource={books.map((books) => ({
          ...books,
          key: books.id,
        }))}
        renderItem={(book) => (
          <List.Item>
            <BookCard book={book} />
          </List.Item>
        )}
      />
      <Pagination />
    </Space>
  );
}
