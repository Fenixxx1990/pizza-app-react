import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slise";
import type { ICartItemProps } from "./CartItem.props";

export default function CartItem(props: ICartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    dispatch(cartActions.add(props.id));
  };

  const descrease = () => {
    dispatch(cartActions.remove(props.id));
  };

  const remove = () => {
    dispatch(cartActions.delete(props.id));
  };

  return (
    <div className={styles.item}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${props.image})` }}
      ></div>

      <div className={styles.description}>
        <div className={styles.name}>{props.name}</div>
        <span className={styles.price}>{props.price}&nbsp;₽</span>
      </div>

      <div className={styles.actions}>
        <button className={styles.minus} onClick={descrease}>
          <img src="/minus.svg" alt="Удалить из корзину" />
        </button>

        <div className={styles.number}>{props.count}</div>

        <button className={styles.plus} onClick={increase}>
          <img src="/plus.svg" alt="Добавить в корзину" />
        </button>

        <button className={styles.remove} onClick={remove}>
          <img src="/delete.svg" alt="Удалить все" />
        </button>
      </div>
    </div>
  );
}
