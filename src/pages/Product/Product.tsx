import { useLoaderData } from "react-router-dom";
import type { IProduct } from "../../interfaces/product.interface";

export function Product() {
  const data = useLoaderData() as IProduct;
  return <div>Product - {data.name}</div>;
}
