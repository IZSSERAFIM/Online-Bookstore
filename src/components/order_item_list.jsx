import { List, Avatar } from "antd";
import { Link } from "react-router-dom";

export default function OrderItemList({ orderItems }) {
  return (
    <List
      dataSource={orderItems}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Link to={`/book/${item.book.id}`}>
                <Avatar shape="square" size={80} src={item.book.cover} />
              </Link>
            }
            title={item.book.title}
            description={`数量：${item.bookNum} | 总价：${
              (item.book.price * item.bookNum) / 100
            }元`}
          />
        </List.Item>
      )}
    />
  );
}
