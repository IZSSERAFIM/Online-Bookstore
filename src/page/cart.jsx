import { useEffect, useState } from "react";
import { Card } from "antd";
import CartItemTable from "../components/cart_item_table";
import {PrivateLayout} from "../components/layout";
import {useAuth} from "../service/AuthProvider";
import { getAllCartBooks } from "../service/cart";

export default function CartPage() {

  const [cartData, setCartData] = useState([])
    const auth = useAuth()

    const getCartData = async () =>{
        let cartData = await getAllCartBooks({name: auth.user, password: auth.token})
        setCartData(cartData)
        console.log({cartData})
    }

    useEffect(() => {
        getCartData();
    }, [])

    return (
        <PrivateLayout>
            <Card className="card-container">
                <CartItemTable carts={cartData}/>
            </Card>
        </PrivateLayout>
    )
}
