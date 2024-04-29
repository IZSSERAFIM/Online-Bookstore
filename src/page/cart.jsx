import { useEffect, useState } from "react";
import { Card } from "antd";
import CartItemTable from "../components/cart_item_table";
import PrivateLayout from "../components/layout";
import { getCartItems } from "../service/cart";

export default function CartPage() {
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 添加一个isLoading状态

  const initCarts = async () => {
    setIsLoading(true); // 开始加载数据
    let carts = await getCartItems();
    setCarts(carts);
    setIsLoading(false); // 数据加载完成
  }

  useEffect(() => {
    initCarts();
  }, []);

  // 如果数据正在加载，可以展示加载中的提示
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PrivateLayout>
      <Card className="card-container">
        <CartItemTable carts={carts} onMutate={initCarts}/>
      </Card>
    </PrivateLayout>
  );
}
