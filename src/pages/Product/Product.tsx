import { Await, useLoaderData } from "react-router-dom";
import type { IProduct } from "../../interfaces/product.interface";
import { Suspense } from "react";

export default function Product() {
  const data = useLoaderData() as IProduct;

  return (
    <>
      <Suspense fallback={"Загружаю..."}>
        <Await resolve={data}>
          {(resolvedData: IProduct) => (
            <div>Product Name: {resolvedData.name}</div>
          )}
        </Await>
      </Suspense>
    </>
  );
}
