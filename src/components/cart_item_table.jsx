import React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  Button,
  InputNumber,
  DatePicker,
  FloatButton,
  message,
} from "antd";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import BookCard from "./book_card";
import { useAuth } from "../service/AuthProvider";
import {
  addOrder,
  addOrderAllSelected,
  calculateTotalPrice,
} from "../service/order";
import { deleteCart } from "../service/cart";
import { formatTimeD } from "../utils/time";

const { RangePicker } = DatePicker;

export default function CartItemTable({ carts, onMutate }) {
  const auth = useAuth();
  const date = formatTimeD(new Date());
  const [quantities, setQuantities] = useState({});
  const [filteredCarts, setFilteredCarts] = useState(carts);
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [totalPrices, setTotalPrices] = useState({});

  const saveBooknum = (bookId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [bookId]: value,
    }));
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
    carts.forEach(async (cart) => {
      const quantity = quantities[cart.book.id] || 1;
      const totalPrice =
        (await calculateTotalPrice(cart.book.price, quantity)) / 100;
      setTotalPrices((prevPrices) => ({
        ...prevPrices,
        [cart.book.id]: totalPrice,
      }));
    });
  }, [carts, dateRange, quantities]); // 当orders或dateRange更改时重新过滤

  const handleSelectChange = (cartId, isSelected) => {
    setSelectedBooks((prevSelectedBooks) => {
      if (isSelected) {
        return [...prevSelectedBooks, cartId];
      } else {
        return prevSelectedBooks.filter((id) => id !== cartId);
      }
    });
  };

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
      render: (text, record) => (
        <InputNumber
          size="large"
          min={1}
          max={99}
          defaultValue={quantities[record.book.id] || 1}
          changeOnWheel
          onChange={(value) => saveBooknum(record.book.id, value)}
        />
      ),
    },
    {
      title: "总价",
      dataIndex: "book",
      key: "price",
      // render: (book) => `${((quantities[book.id] || 1) * book.price) / 100}￥`,
      render: (book) => `${totalPrices[book.id] || 0}￥`,
    },
    {
      title: "操作",
      key: "action",
      render: (carts) => {
        const orderBook = {
          date: date,
          name: auth.user,
          bookIdList: [carts.book.id],
          bookNumList: [quantities[carts.book.id] || 1],
        };
        return (
          <>
            <Button
              type="primary"
              icon={<ShoppingOutlined />}
              onClick={async () => {
                try {
                  const result = await addOrder(orderBook); // 等待addOrder的结果
                  if (result === true) {
                    // 如果addOrder成功
                    await deleteCart(carts.id); // 等待删除购物车项
                    onMutate(); // 更新购物车
                    message.success("订单提交成功！");
                  }
                } catch (error) {
                  message.error("订单提交失败！");
                  console.error("Error submitting order:", error);
                }
              }}
            />
            <br />
            <br />
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              danger={true}
              onClick={async () => {
                try {
                  await deleteCart(carts.id); // 等待删除操作完成
                  onMutate(); // 删除后重新获取购物车数据
                  message.success("删除成功！");
                } catch (error) {
                  message.error("删除失败！");
                  console.error("Error deleting cart:", error);
                }
              }}
            />
          </>
        );
      },
    },
    {
      title: "选择",
      key: "select",
      render: (carts) => (
        <input
          type="checkbox"
          onChange={(e) => handleSelectChange(carts.id, e.target.checked)}
        />
      ),
    },
  ];

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleOrderAllSelected = async () => {
    const selectedCarts = filteredCarts.filter((cart) =>
      selectedBooks.includes(cart.id)
    );
    const orderBook = {
      date: date,
      name: auth.user,
      bookIdList: selectedCarts.map((cart) => cart.book.id),
      bookNumList: selectedCarts.map((cart) => quantities[cart.book.id] || 1),
    };

    try {
      const result = await addOrderAllSelected(orderBook);
      if (result === true) {
        // 如果addOrderAllSelected成功，删除所有选中的购物车项
        for (const cart of selectedCarts) {
          await deleteCart(cart.id); // 等待每个删除操作完成
        }
        onMutate(); // 更新购物车
        message.success("订单提交成功！");
      } else {
        message.error("订单提交失败！");
      }
    } catch (e) {
      console.log(e);
      message.error("订单提交过程中发生错误！");
    }
  };

  const getTooltipContent = () => {
    const selectedCarts = filteredCarts.filter((cart) =>
      selectedBooks.includes(cart.id)
    );
    const totalPrice = selectedCarts.reduce((sum, cart) => {
      return sum + (quantities[cart.book.id] || 1) * cart.book.price;
    }, 0);

    return (
      <div>
        <div>选中的书籍：</div>
        {selectedCarts.map((cart) => (
          <div key={cart.id}>
            {cart.book.title} - {quantities[cart.book.id] || 1} 本
          </div>
        ))}
        <div>总价：{totalPrice / 100}￥</div>
      </div>
    );
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
      <FloatButton
        shape="square"
        type="primary"
        style={{
          insetInlineEnd: 24,
        }}
        description="立刻下单"
        size="large"
        icon={<ShoppingOutlined />}
        tooltip={getTooltipContent()}
        onClick={handleOrderAllSelected}
      />
    </>
  );
}
