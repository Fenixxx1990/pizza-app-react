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

  const descrease = () => {};

  const remove = () => {};

  return (
    <div className={styles.item}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${props.image})` }}
      ></div>

      <div className={styles.description}>
        <div className={styles.name}>{props.name}</div>
        <span className={styles.currency}>{props.price}&nbsp;₽</span>
      </div>

      <div className={styles.actions}>
        <button className={styles.button} onClick={descrease}>
          <img src="/cart-button-icon.svg" alt="Удалить из корзину" />
        </button>

        <div>{props.count}</div>

        <button className={styles.button} onClick={increase}>
          <img src="/cart-button-icon.svg" alt="Добавить в корзину" />
        </button>

        <button className={styles.remove} onClick={remove}>
          <img src="/cart-button-icon.svg" alt="Удалить все" />
        </button>
      </div>
    </div>
  );
}
