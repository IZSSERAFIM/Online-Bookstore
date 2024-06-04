import { Column } from "@ant-design/plots";
import { useNavigate } from "react-router-dom"; // 引入useNavigate
import BookCard from './book_card'; // 引入BookCard组件

export default function BookRankChart({ books }) {
  const navigate = useNavigate(); // 获取navigate函数

  console.log(books);
  const data = books.map((book) => ({
    sales: book.sales,
    title: book.title,
  }));
  const config = {
    data,
    xField: "title",
    yField: "sales",
    label: {
      position: "inside",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
    meta: {
      title: {
        alias: "书名",
      },
      sales: {
        alias: "销量",
      },
    },
  };
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Column {...config} />
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {books.slice(0, 5).map((book) => <BookCard style={{ flex: 1 }} book={book} />)}
      </div>
    </div>
  );
}