import classes from './CartButton.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { showCartActions } from '../../store/ShowCartReducer';


const CartButton = (props) => {
  const dispatch = useDispatch()

  const toggleShowCartHandler = () => {
    dispatch(showCartActions.showCart())
  }
  const cart = useSelector(state => state.cart.cartItems)
  const cartLength = cart.length;

  return (
    <button onClick={toggleShowCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartLength}</span>
    </button>
  );
};

export default CartButton;
