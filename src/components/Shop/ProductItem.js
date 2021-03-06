import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import {useDispatch, useSelector} from 'react-redux'
import { cartActions } from '../../store/CartReducer';


const ProductItem = (props) => {
  const dispatch = useDispatch();
  const quantity = useSelector(state => state.cart.quantity)
  const { title, price, description } = props;
  
  const total = props.price * quantity;
  console.log('tot', total,quantity)

  const newProduct = {
    title: props.title,
    price: props.price,
    quantity: quantity,
    total: total
  }
  // console.log(props)
  
  const addingProductHandler = () => {
    dispatch(cartActions.cartItems(newProduct))
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addingProductHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
