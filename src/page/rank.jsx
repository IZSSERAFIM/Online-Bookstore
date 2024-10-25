import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Upload, Avatar, Spin, DatePicker } from "antd";
import { PrivateLayout } from "../components/layout";
import BookRankChart from "../components/book_rank_chart";
import { getBestSellingBooks } from "../service/book";
import { getUserTopBook } from "../service/book";
import { useAuth } from "../service/AuthProvider";
import { getAllOrders } from "../service/order";

export default function RankPage() {
  const { RangePicker } = DatePicker;
  const auth = useAuth();
  const [soldbooks, setsoldBooks] = useState([]);
  const boughtBooks = [];
  const [ordersData, setOrdersData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const getTopBooks = async () => {
    let response = await getBestSellingBooks();
    setsoldBooks(response.books);
  };

  const getOrdersData = async () => {
    let orders = await getAllOrders({ name: auth.user, password: auth.token });
    console.log({ orders });
    setOrdersData(orders);
    console.log(ordersData);
  };

  const bookCounts = {};

  useEffect(() => {
    getTopBooks();
    getOrdersData();
  }, []); // 空依赖数组，确保只在组件挂载时调用一次

  useEffect(() => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange;
      const filtered = ordersData.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate >= startDate && orderDate <= endDate;
      });
      setFilteredOrders(filtered);
    } else {
      // 如果没有选择日期范围，可以选择显示所有订单或不显示
      setFilteredOrders(ordersData);
    }
  }, [ordersData, dateRange]); // 当ordersData或dateRange更改时重新过滤

  // 确保ordersData和ordersData.orders存在
  if (filteredOrders) {
    filteredOrders.forEach((order) => {
      order.orderItemList.forEach((item) => {
        const { id, title, author, description, price } = item.book;
        if (bookCounts[id]) {
          bookCounts[id].bookNum += item.bookNum;
        } else {
          bookCounts[id] = {
            id,
            title,
            author,
            description,
            price,
            sales: item.bookNum,
            cover: item.book.cover,
          };
        }
      });
    });

    const sortedBooks = Object.values(bookCounts)
      .sort((a, b) => b.bookNum - a.bookNum)
      .slice(0, 5);
    
    console.log(sortedBooks);
    boughtBooks.push(...sortedBooks);
    boughtBooks.sort((a, b) => b.sales - a.sales);
  }

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  return (
    <PrivateLayout>
      <Card>
        筛选日期 <RangePicker onChange={handleDateRangeChange} />
      </Card>
      <h1 style={{ textAlign: "center" }}>Top 5 Best Selling Books</h1>
      <Card className="card-container">
        <BookRankChart books={soldbooks} />
      </Card>
      <h1 style={{ textAlign: "center" }}>Top 5 Books You Bought</h1>
      <Card className="card-container">
        <BookRankChart books={boughtBooks} />
      </Card>
    </PrivateLayout>
  );
}