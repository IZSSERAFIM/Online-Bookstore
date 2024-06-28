import React from "react";
import { useState, useEffect } from "react";
import { Table, Button, InputNumber, DatePicker } from "antd";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import BookCard from "./book_card";
import { useAuth } from "../service/AuthProvider";
import { addOrder } from "../service/order";
import { deleteCart } from "../service/cart";
import { formatTimeD } from "../utils/time";

const { RangePicker } = DatePicker;

export default function CartItemTable({ carts }) {
  const auth = useAuth();
  const date = formatTimeD(new Date());
  const [quantity, setQuantity] = useState(1);
  const [filteredCarts, setFilteredCarts] = useState(carts);
  const [dateRange, setDateRange] = useState([null, null]);

  const saveBooknum = (value) => {
    console.log(value);
    setQuantity(value);
  };

  useEffect(() => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange;
      const filtered = carts.filter((cart) => {
        const cartDate = new Date(cart.date);
        return cartDate >= startDate && cartDate <= endDate;
      });
      setFilteredCarts(filtered);
    } else {
      // 如果没有选择日期范围，可以选择显示所有订单或不显示
      setFilteredCarts(carts);
    }
  }, [carts, dateRange]); // 当orders或dateRange更改时重新过滤

  const columns = [
    {
      title: "书籍",
      dataIndex: "book",
      key: "book",
      width: 350,
      render: (book) => <BookCard book={book} />,
    },
    {
      title: "时间",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "数量",
      dataIndex: "quantity",
      key: "quantity",
      render: () => (
        <InputNumber
          size="large"
          min={1}
          max={99}
          defaultValue={1}
          changeOnWheel
          onChange={saveBooknum}
        />
      ),
    },
    {
      title: "总价",
      dataIndex: "book",
      key: "price",
      render: (book) => `${quantity*book.price/100}￥`,
    },
    {
      title: "操作",
      key: "action",
      render: (carts) => {
        const orderBook = {
          date: date,
          name: auth.user,
          bookIdList: [carts.book.id],
          bookNumList: [quantity],
        };
        return (
          <>
            <Button
              type="primary"
              icon={<ShoppingOutlined />}
              onClick={async () => {
                // 将函数改为异步
                const result = await addOrder(orderBook); // 等待addOrder的结果
                if (result === true) {
                  // 如果addOrder成功
                  deleteCart(carts.id); // 然后删除购物车项
                }
              }}
            />
            <br />
            <br />
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              danger={true}
              onClick={() => deleteCart(carts.id)} // 使用carts.id
            />
          </>
        );
      },
    },
  ];

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  return (
    <>
      <>
        筛选购物车日期 <RangePicker onChange={handleDateRangeChange} />
      </>
      <Table
        columns={columns}
        dataSource={filteredCarts}
        rowKey={(record) => record.book.id}
        size="small"
      />
    </>
  );
}
