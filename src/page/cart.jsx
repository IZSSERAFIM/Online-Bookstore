import { Card } from "antd";
import CartItemTable from "../components/cart_item_table";
import  PrivateLayout  from "../components/layout";
import carts from "../test/carts";

export default function CartPage() {console.log(carts)
  return (
    <PrivateLayout>
      <Card className="card-container">
        <CartItemTable carts={carts} />
      </Card>
    </PrivateLayout>
  );
}
