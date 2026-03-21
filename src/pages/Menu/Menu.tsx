import { useEffect, useState, type ChangeEvent } from "react";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import type { IProduct } from "../../interfaces/product.interface";
import styles from "./Menu.module.css";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

export default function Menu() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>("");

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${PREFIX}/products`, {
        params: { name },
      });
      setIsLoading(false);
      return data;
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        setIsLoading(false);
        setError(e.message);
      }
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const productsData = await getMenu(filter);
      setProducts(productsData); // setState вызывается ПОСЛЕ завершения асинхронной операции
    };
    loadData();
  }, [filter]);

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className={styles.head}>
        <Heading>Меню</Heading>
        <Search
          placeholder="Введите блюдо или состав"
          onChange={updateFilter}
        />
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && products.length > 0 && <MenuList products={products} />}
        {isLoading && <>Загружаем продукты...</>}
        {!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
      </div>
    </>
  );
}
