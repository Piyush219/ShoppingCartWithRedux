import classes from './CartItem.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { cartActions } from '../../store/CartReducer';

const CartItem = (props) => {
  // const { title, quantity, total, price } = props.item;
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems)


  return (
    <>
    {cartItems.map((items)=> {
      return (
        <li className={classes.item}>
      <header>
        <h3>{items.title}</h3>
        <div className={classes.price}>
          ${items.total}{' '}
          <span className={classes.itemprice}>(${items.price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{items.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={()=> dispatch(cartActions.decreaseQuantity())}>-</button>
          <button onClick={()=> dispatch(cartActions.increaseQuantity())}>+</button>
        </div>
      </div>
    </li>
      )
      
    })
      }
    </>
  );
};

export default CartItem;
