import { useSelector } from "react-redux";
import Heading from "../../components/Heading/Heading";
import type { RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import type { IProduct } from "../../interfaces/product.interface";
import { PREFIX } from "../../helpers/API";
import axios from "axios";

export function Cart() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);

  const getItem = async (id: number) => {
    console.log(id);
    const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
    return data;
  };

  useEffect(() => {
    const loadAllItems = async () => {
      const res = await Promise.all(items.map((i) => getItem(i.id)));
      setCartProducts(res);
    };
    loadAllItems();
  }, [items]);

  return (
    <>
      <Heading>Корзина</Heading>
      {items.map((i) => {
        const product = cartProducts.find((p) => p.id === i.id);
        if (!product) {
          return;
        }
        return <CartItem count={i.count} {...product} />;
      })}
    </>
  );
}
